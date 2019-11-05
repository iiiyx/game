import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';

import { changeOwner, kick, moveBallByPlayer } from '../actions/ball';
import { movePlayer, stopPlayer } from '../actions/players';
import { PlayerType } from '../models/player';
import { StateType } from '../models/state';
import { BallType } from '../models/ball';
import { DirectionMatrixType } from '../models/direction-matrix';
import { KeyCodesEnum } from '../models/key-codes-enum';
import {
  checkOwnerShip,
  getBallPositionByPlayer,
  getDtWithDirection,
  isMoving,
} from '../utils/movements';
import { getFieldSize } from '../utils/field';
import { PositionType } from '../models/position';

import '../styles/Player.scss';
import '../styles/kunio.scss';
import { PLAYER_SPEED } from '../constants';

interface OwnPropsType {
  playerName: PlayerType['id'];
}

type PropsType = OwnPropsType & ConnectedStateType & ConnectedPropsType;

class PlayerComponent extends Component<PropsType> {
  private directionMatrix: DirectionMatrixType = {
    [KeyCodesEnum.ARROW_UP]: false,
    [KeyCodesEnum.ARROW_DOWN]: false,
    [KeyCodesEnum.ARROW_LEFT]: false,
    [KeyCodesEnum.ARROW_RIGHT]: false,
  };
  private lastTime: number | undefined;
  private xMax = 0;
  private yMax = 0;
  private playerRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.setSizes();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    // this.props.changeOwner(this.props.playerName);
    this.checkMove();
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  componentDidUpdate(prevProps: Readonly<PropsType>): void {
    if (
      prevProps.player.left !== this.props.player.left ||
      prevProps.player.top !== this.props.player.top
    ) {
      if (checkOwnerShip(this.props.player, this.props.ball)) {
        this.props.changeOwner(this.props.playerName);
      }
    }
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      return;
    }

    if (e.code === 'Space') {
      this.startKick();
      return;
    }

    if (this.directionMatrix[e.code as KeyCodesEnum] === undefined) {
      return;
    }

    this.directionMatrix[e.code as KeyCodesEnum] = true;
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      this.endKick();
      return;
    }

    if (this.directionMatrix[e.code as KeyCodesEnum] === undefined) {
      return;
    }

    this.directionMatrix[e.code as KeyCodesEnum] = false;

    if (!isMoving(this.directionMatrix)) {
      this.stop();
    }
  };

  private stop = (): void => {
    this.lastTime = undefined;
    this.props.stopPlayer(this.props.playerName);
  };

  private checkMove = (): void => {
    if (!isMoving(this.directionMatrix)) {
      requestAnimationFrame(this.checkMove);
      return;
    }

    if (!this.lastTime) {
      this.lastTime = performance.now();
    }

    const now = performance.now();
    const dur = now - this.lastTime;

    const player = this.props.player;

    const { dt, isMirrored } = getDtWithDirection({
      currentPosition: player,
      isCurrentlyMirrored: player.isMirrored,
      duration: dur,
      speed: PLAYER_SPEED,
      directionMatrix: this.directionMatrix,
      xMax: this.xMax,
      yMax: this.yMax,
    });

    this.props.movePlayer(this.props.playerName, dt, isMirrored);
    if (this.props.playerName === this.props.ball.owner) {
      const ballPosition = getBallPositionByPlayer(this.props.player);
      this.props.moveBallByPlayer(ballPosition, isMirrored);
    }
    this.lastTime = now;
    requestAnimationFrame(this.checkMove);
  };

  private setSizes = (): void => {
    const { xMax, yMax } = getFieldSize();
    this.xMax = xMax;
    this.yMax = yMax;
  };

  private startKick(): void {
    // accumulatePower
  }

  private endKick(): void {
    this.props.kick(/* accumulated power */);
  }

  render(): ReactNode {
    const classes = ['Player'];
    if (isMoving(this.directionMatrix)) {
      classes.push('moving');
    }

    if (this.props.player.isMirrored) {
      classes.push('mirrored');
    }

    return (
      <div
        ref={this.playerRef}
        className={classes.join(' ')}
        id={this.props.playerName}
        style={{
          left: this.props.player.left,
          top: this.props.player.top,
        }}
      />
    );
  }
}

interface ConnectedStateType {
  player: PlayerType;
  ball: BallType;
}

function mapStateToProps(
  state: StateType,
  ownProps: OwnPropsType,
): ConnectedStateType {
  return {
    player: state.players[ownProps.playerName],
    ball: state.ball,
  };
}

interface ConnectedPropsType {
  stopPlayer: (id: PlayerType['id']) => void;
  changeOwner: (id: PlayerType['id']) => void;
  kick: () => void;
  moveBallByPlayer: (newPosition: PositionType, isMirrored: boolean) => void;
  movePlayer: (
    playerName: OwnPropsType['playerName'],
    dt: PositionType,
    isMirrored: boolean,
  ) => void;
}

const mapDispatchToProps = {
  movePlayer,
  stopPlayer,
  changeOwner,
  kick,
  moveBallByPlayer,
};

export const Player = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerComponent);

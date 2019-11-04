import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { changeOwner, movePlayer, stopPlayer } from '../actions';

import '../styles/Player.css';
import '../styles/kunio.css';
import { PlayerType } from '../types/player';
import { StateType } from '../types/state';
import { PositionType } from '../types/position';
import { BallType } from '../types/ball';

enum keyCodes {
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
}

const gap = 1.8 * 16;

interface OwnPropsType {
  playerName: PlayerType['id'];
}

interface ConnectedPropsType {
  player: PlayerType;
  stopPlayer: (id: PlayerType['id']) => void;
  changeOwner: (id: PlayerType['id']) => void;
  movePlayer: (
    playerName: OwnPropsType['playerName'],
    dt: PositionType,
    isMirrored: boolean,
  ) => void;
}

type PropsType = OwnPropsType & ConnectedPropsType;

class Player extends Component<PropsType> {
  private pressed: {
    [key: string]: boolean;
  } = {
    [keyCodes.ARROW_UP]: false,
    [keyCodes.ARROW_DOWN]: false,
    [keyCodes.ARROW_LEFT]: false,
    [keyCodes.ARROW_RIGHT]: false,
  };
  private lastTime: number | undefined;
  private maxX = 0;
  private maxY = 0;

  componentDidMount(): void {
    this.setSizes();
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.props.changeOwner(this.props.playerName);
    this.checkMove();
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      return;
    }

    if (e.code === 'ArrowLeft') {
      // kick
    }

    if (this.pressed[e.code] === undefined) {
      return;
    }

    this.pressed[e.code] = true;
  };

  private isMoving = (): boolean =>
    this.pressed[keyCodes.ARROW_LEFT] ||
    this.pressed[keyCodes.ARROW_UP] ||
    this.pressed[keyCodes.ARROW_RIGHT] ||
    this.pressed[keyCodes.ARROW_DOWN];

  private onKeyUp = (e: KeyboardEvent): void => {
    if (this.pressed[e.code] === undefined) {
      return;
    }

    this.pressed[e.code] = false;

    if (!this.isMoving()) {
      this.stop();
    }
  };

  private stop = (): void => {
    this.lastTime = undefined;
    this.props.stopPlayer(this.props.playerName);
  };

  private checkMove = (): void => {
    if (!this.isMoving()) {
      requestAnimationFrame(this.checkMove);
      return;
    }

    if (!this.lastTime) {
      this.lastTime = performance.now();
    }

    const now = performance.now();
    const dur = now - this.lastTime;
    const dist = (133 * dur) / 1000;

    const player = this.props.player;

    const dt = {
      top: 0,
      left: 0,
    };

    let isMirrored = player.isMirrored;

    if (this.pressed[keyCodes.ARROW_UP]) {
      const next = player.top - dist;
      if (next >= 0 - gap * 2) {
        dt.top = -dist;
      }
    }
    if (this.pressed[keyCodes.ARROW_DOWN]) {
      const next = player.top + dist;
      if (next <= this.maxY) {
        dt.top = dist;
      }
    }
    if (this.pressed[keyCodes.ARROW_RIGHT]) {
      isMirrored = false;
      const next = player.left + dist;
      if (next <= this.maxX) {
        dt.left = dist;
      }
    }
    if (this.pressed[keyCodes.ARROW_LEFT]) {
      isMirrored = true;
      const next = player.left - dist;
      if (next >= 0 - gap / 2) {
        dt.left = -dist;
      }
    }

    this.props.movePlayer(this.props.playerName, dt, isMirrored);
    this.lastTime = now;
    requestAnimationFrame(this.checkMove);
  };

  private setSizes = (): void => {
    const field = document.getElementById('field');
    if (field) {
      this.maxX = field.clientWidth - gap / 2;
      this.maxY = field.clientHeight - gap * 2;
    }
  };

  render(): ReactNode {
    const classes = ['Player'];
    if (this.isMoving()) {
      classes.push('moving');
    }

    if (this.props.player.isMirrored) {
      classes.push('mirrored');
    }

    return (
      <div
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

const mapDispatchToProps = {
  movePlayer,
  stopPlayer,
  changeOwner,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);

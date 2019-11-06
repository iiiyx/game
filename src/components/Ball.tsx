import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';

import { initBall } from '../actions/ball-actions';
import { BALL_SIZE } from '../constants';
import { StateType } from '../models/state-type';
import { PlayerType } from '../models/player-type';
import { PositionType } from '../models/position-type';
import { getFieldSize } from '../utils/field-utils';

import '../styles/Ball.scss';

type PropsType = ConnectedStateType & ConnectedPropsType;

class BallComponent extends Component<PropsType> {
  private xMax = 0;
  private yMax = 0;

  componentDidMount(): void {
    this.setSizes();
    const ballHalf = BALL_SIZE / 2;
    this.props.initBall({
      left: this.xMax / 2 - ballHalf,
      top: this.yMax / 2 - ballHalf,
    });
  }

  private setSizes = (): void => {
    const { xMax, yMax } = getFieldSize();
    this.xMax = xMax;
    this.yMax = yMax;
  };

  private isMoving(): boolean {
    return (
      (this.props.owner && this.props.owner.isMoving) ||
      this.props.ball.isKicked
    );
  }

  render(): ReactNode {
    const classes = ['Ball'];
    if (this.isMoving()) {
      classes.push('moving');
    }

    if (this.props.ball.isMirrored) {
      classes.push('mirrored');
    }

    const { left, top } = this.props.ball;

    return <div className={classes.join(' ')} style={{ left, top }} />;
  }
}

interface ConnectedStateType {
  ball: StateType['ball'];
  owner?: PlayerType;
}

function mapStateToProps(state: StateType): ConnectedStateType {
  return {
    ball: state.ball,
    // TODO: use Reselect lib
    owner: state.ball.owner ? state.players[state.ball.owner] : undefined,
  };
}

interface ConnectedPropsType {
  initBall: (position: PositionType) => void;
}

const mapDispatchToProps = {
  initBall,
};

export const Ball = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BallComponent);

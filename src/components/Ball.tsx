import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';

import { StateType } from '../types/state';
import { PlayerType } from '../types/player';
import { PositionType } from '../types/position';

import '../styles/Ball.css';

const BALL_DX = 16,
  BALL_DY = 42;

class Ball extends Component<ConnectedStateType> {
  private isMoving(): boolean {
    return (
      (this.props.owner && this.props.owner.isMoving) ||
      this.props.ball.isKicked
    );
  }

  private getPosition(): PositionType {
    let left = 0;
    let top = 0;

    if (this.props.owner) {
      const sign = this.props.owner.isMirrored ? -1 : 1;
      left = this.props.owner.left + sign * BALL_DX;
      top = this.props.owner.top + BALL_DY;
    }
    return {
      left,
      top,
    };
  }

  render(): ReactNode {
    const classes = ['Ball'];
    if (this.isMoving()) {
      classes.push('moving');
    }

    if (this.props.owner && this.props.owner.isMirrored) {
      classes.push('mirrored');
    }

    const position = this.getPosition();

    return <div className={classes.join(' ')} style={position} />;
  }
}

interface ConnectedStateType {
  ball: StateType['ball'];
  owner?: PlayerType;
}

function mapStateToProps(state: StateType): ConnectedStateType {
  return {
    ball: state.ball,
    owner: state.ball.owner ? state.players[state.ball.owner] : undefined,
  };
}

export default connect(mapStateToProps)(Ball);

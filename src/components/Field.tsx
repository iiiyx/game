import React from 'react';

import Player from './Player';
// import Ghost from './Ghost';
import Ball from './Ball';

import '../styles/Field.css';

export const Field: React.FC = () => {
  return (
    <div className="Field" id="field">
      <div className="markup">
        <div className="center-line" />
        <div className="center-circle" />
        <div className="center-dot" />
        <div className="left-square" />
        <div className="right-square" />
      </div>
      <div className="left-goal" />
      <div className="right-goal" />
      <Ball />
      <Player playerName="kunio" />
      {/* <Ghost {...this.props} /> */}
    </div>
  );
};

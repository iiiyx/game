import { DirectionMatrixType } from '../models/direction-matrix';
import { KeyCodesEnum } from '../models/key-codes-enum';
import { PlayerType } from '../models/player';
import { BallType } from '../models/ball';
import { PositionType } from '../models/position';
import {
  BALL_SIZE,
  FIELD_BOTTOM_GAP,
  FIELD_LEFT_GAP,
  FIELD_RIGHT_GAP,
  FIELD_TOP_GAP,
  OWNER_MICRO_GAP,
  PLAYER_SIZE,
} from '../constants';

export function isMoving(pressed: DirectionMatrixType): boolean {
  return (
    pressed[KeyCodesEnum.ARROW_LEFT] ||
    pressed[KeyCodesEnum.ARROW_UP] ||
    pressed[KeyCodesEnum.ARROW_RIGHT] ||
    pressed[KeyCodesEnum.ARROW_DOWN]
  );
}

interface GetDtWithDirectionArgType {
  currentPosition: PositionType;
  isCurrentlyMirrored: boolean;
  duration: number;
  speed: number;
  directionMatrix: DirectionMatrixType;
  xMax: number;
  yMax: number;
}

interface GetDtWithDirectionReturnTypeType {
  dt: PositionType;
  isMirrored: boolean;
}

export function getDtWithDirection({
  currentPosition,
  isCurrentlyMirrored,
  duration,
  speed,
  directionMatrix,
  xMax,
  yMax,
}: GetDtWithDirectionArgType): GetDtWithDirectionReturnTypeType {
  const distance = (speed * duration) / 1000;

  const dt = {
    top: 0,
    left: 0,
  };

  let isMirrored = isCurrentlyMirrored;

  if (directionMatrix[KeyCodesEnum.ARROW_UP]) {
    const next = currentPosition.top - distance;
    if (next >= 0 - FIELD_TOP_GAP) {
      dt.top = -distance;
    }
  }
  if (directionMatrix[KeyCodesEnum.ARROW_DOWN]) {
    const next = currentPosition.top + distance;
    if (next <= yMax - FIELD_BOTTOM_GAP) {
      dt.top = distance;
    }
  }
  if (directionMatrix[KeyCodesEnum.ARROW_RIGHT]) {
    isMirrored = false;
    const next = currentPosition.left + distance;
    if (next <= xMax - FIELD_RIGHT_GAP) {
      dt.left = distance;
    }
  }
  if (directionMatrix[KeyCodesEnum.ARROW_LEFT]) {
    isMirrored = true;
    const next = currentPosition.left - distance;
    if (next >= 0 - FIELD_LEFT_GAP) {
      dt.left = -distance;
    }
  }
  return { dt, isMirrored };
}

export function checkOwnerShip(player: PlayerType, ball: BallType): boolean {
  const ballHalf = BALL_SIZE / 2;
  const playerXPoint = player.left + PLAYER_SIZE / 2;
  const playerYPoint = player.top + PLAYER_SIZE - ballHalf / 2;
  const ballXPoint = ball.left + ballHalf;
  const ballYPoint = ball.top + ballHalf;
  return (
    Math.abs(playerXPoint - ballXPoint) <= BALL_SIZE &&
    Math.abs(playerYPoint - ballYPoint) <= ballHalf
  );
}

export function getBallPositionByPlayer(player: PlayerType): PositionType {
  const ballHalf = BALL_SIZE / 2;
  const left = player.left + (player.isMirrored ? 0 : PLAYER_SIZE) - ballHalf;
  const top = player.top + PLAYER_SIZE - BALL_SIZE + OWNER_MICRO_GAP;
  return {
    left,
    top,
  };
}

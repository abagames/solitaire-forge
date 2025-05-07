export const __esModule = true; // ES Moduleとしてマーク

export const input = {
  isJustPressed: false,
  pos: { x: 0, y: 0 },
};

export const CardView = jest.fn().mockImplementation(() => ({
  containsPoint: jest.fn().mockReturnValue(false),
  startFlipAnimation: jest.fn(),
  startMoveAnimation: jest.fn(),
  draw: jest.fn(),
  pos: { x: 0, y: 0, set: jest.fn() },
  rank: 0,
  suit: "spade",
  isFaceUp: false,
  isMoving: false,
  isFlipping: false,
  isSelected: false,
  isHighlighted: false,
}));

export const SpeechBubbleView = jest.fn().mockImplementation(() => ({
  setText: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  pos: { x: 0, y: 0, set: jest.fn() },
  setTail: jest.fn(),
  size: { x: 0, y: 0 },
  draw: jest.fn(),
}));

export const play = jest.fn();
export const vec = jest.fn((x = 0, y = 0) => ({ x, y, set: jest.fn() }));
export const color = jest.fn();
export const char = jest.fn();
export const text = jest.fn();
export const clamp = jest.fn((val, min, max) =>
  Math.min(Math.max(val, min), max)
);

export const init = jest.fn();

// test/manual-mocks/crisp-game-lib-stub.ts
// This file will stub out the entire crisp-game-lib for Jest tests
// using moduleNameMapper.
console.log("DEBUG: test/manual-mocks/crisp-game-lib-stub.ts LOADED");
import { jest } from "@jest/globals"; // Import jest globals

// Define the mock functions/objects first
const MOCK_INIT_FN = jest.fn(() => {
  /* console.log("STUBBED global init CALLED"); */
});
const MOCK_PLAY_FN = jest.fn();

// Simplified vector properties and methods
const createVectorMock = (x = 0, y = 0) => ({
  x,
  y,
  set: jest.fn(function (this: any, newX_or_vec: number | any, newY?: number) {
    if (typeof newX_or_vec === "number" && typeof newY === "number") {
      this.x = newX_or_vec;
      this.y = newY;
    } else if (typeof newX_or_vec === "object" && newX_or_vec !== null) {
      this.x = newX_or_vec.x;
      this.y = newX_or_vec.y;
    }
    return this;
  }),
  isInRect: jest.fn().mockReturnValue(false),
  distanceTo: jest.fn((otherVec: { x: number; y: number }) => {
    // const dx = x - otherVec.x; // Need to capture x from the closure for this to work reliably
    // const dy = y - otherVec.y;
    return 0; // Simple mock, just needs to return a number
  }),
  add: jest.fn(function (this: any, otherVec: { x: number; y: number }) {
    return createVectorMock(this.x + otherVec.x, this.y + otherVec.y);
  }),
  sub: jest.fn(function (this: any, otherVec: { x: number; y: number }) {
    return createVectorMock(this.x - otherVec.x, this.y - otherVec.y);
  }),
  mag: jest.fn().mockReturnValue(0),
  // Add other methods like normalize, mult, div if game uses them
});

const MOCK_INPUT_OBJ = {
  isJustPressed: false,
  pos: createVectorMock(0, 0),
};

const MOCK_VEC_FN = jest.fn(createVectorMock);

const MOCK_CARD_VIEW_CLASS = jest.fn().mockImplementation(() => ({
  containsPoint: jest.fn().mockReturnValue(false),
  startFlipAnimation: jest.fn(),
  startMoveAnimation: jest.fn(),
  draw: jest.fn(),
  pos: MOCK_VEC_FN(0, 0), // Use the MOCK_VEC_FN to create pos
  rank: 0,
  suit: "spade",
  isFaceUp: false,
  isMoving: false,
  isFlipping: false,
  isSelected: false,
  isHighlighted: false,
}));
const MOCK_SPEECH_BUBBLE_VIEW_CLASS = jest.fn().mockImplementation(() => ({
  setText: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  pos: MOCK_VEC_FN(0, 0), // Use the MOCK_VEC_FN to create pos
  setTail: jest.fn(),
  size: { x: 0, y: 0 },
  draw: jest.fn(),
}));
const MOCK_COLOR_FN = jest.fn();
const MOCK_CHAR_FN = jest.fn();
const MOCK_TEXT_FN = jest.fn();
const MOCK_RECT_FN = jest.fn();
const MOCK_LINE_FN = jest.fn();
const MOCK_BAR_FN = jest.fn();
const MOCK_BOX_FN = jest.fn();
const MOCK_ARC_FN = jest.fn();
const MOCK_CLAMP_FN = jest.fn((val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max)
);
const MOCK_TITLE_FN = jest.fn();
const MOCK_END_FN = jest.fn();
const MOCK_ADD_WITH_CHAR_CODE_FN = jest.fn((char: string, offset: number) => {
  return String.fromCharCode(char.charCodeAt(0) + offset);
});
const MOCK_RND_FN = jest.fn().mockReturnValue(0.5);
const MOCK_RANGE_FN = jest.fn((count: number) =>
  Array.from({ length: count }, (_, i) => i)
);

// Globals that crisp-game-lib sets up
const g = {
  init: MOCK_INIT_FN,
  play: MOCK_PLAY_FN,
  input: MOCK_INPUT_OBJ,
  CardView: MOCK_CARD_VIEW_CLASS,
  SpeechBubbleView: MOCK_SPEECH_BUBBLE_VIEW_CLASS,
  vec: MOCK_VEC_FN,
  color: MOCK_COLOR_FN,
  char: MOCK_CHAR_FN,
  text: MOCK_TEXT_FN,
  rect: MOCK_RECT_FN,
  line: MOCK_LINE_FN,
  bar: MOCK_BAR_FN,
  box: MOCK_BOX_FN,
  arc: MOCK_ARC_FN,
  clamp: MOCK_CLAMP_FN,
  title: MOCK_TITLE_FN,
  end: MOCK_END_FN,
  addWithCharCode: MOCK_ADD_WITH_CHAR_CODE_FN,
  rnd: MOCK_RND_FN,
  range: MOCK_RANGE_FN,
  PI: Math.PI,
  ceil: Math.ceil,
};

// Attempt to set them on the global scope
// This happens when this stub module is imported due to moduleNameMapper
if (typeof window !== "undefined") {
  (window as any).init = MOCK_INIT_FN;
  (window as any).play = MOCK_PLAY_FN;
  (window as any).input = MOCK_INPUT_OBJ;
  (window as any).CardView = MOCK_CARD_VIEW_CLASS;
  (window as any).SpeechBubbleView = MOCK_SPEECH_BUBBLE_VIEW_CLASS;
  (window as any).vec = MOCK_VEC_FN;
  (window as any).color = MOCK_COLOR_FN;
  (window as any).char = MOCK_CHAR_FN;
  (window as any).text = MOCK_TEXT_FN;
  (window as any).clamp = MOCK_CLAMP_FN;
  (window as any).rect = MOCK_RECT_FN;
  (window as any).line = MOCK_LINE_FN;
  (window as any).bar = MOCK_BAR_FN;
  (window as any).box = MOCK_BOX_FN;
  (window as any).arc = MOCK_ARC_FN;
  (window as any).addWithCharCode = MOCK_ADD_WITH_CHAR_CODE_FN;
  (window as any).rnd = MOCK_RND_FN;
  (window as any).range = MOCK_RANGE_FN;
  (window as any).PI = MOCK_TITLE_FN;
  (window as any).ceil = MOCK_END_FN;
} else if (typeof globalThis !== "undefined") {
  // Fallback for other global contexts
  (globalThis as any).init = MOCK_INIT_FN;
  (globalThis as any).play = MOCK_PLAY_FN;
  (globalThis as any).input = MOCK_INPUT_OBJ;
  (globalThis as any).CardView = MOCK_CARD_VIEW_CLASS;
  (globalThis as any).SpeechBubbleView = MOCK_SPEECH_BUBBLE_VIEW_CLASS;
  (globalThis as any).vec = MOCK_VEC_FN;
  (globalThis as any).color = MOCK_COLOR_FN;
  (globalThis as any).char = MOCK_CHAR_FN;
  (globalThis as any).text = MOCK_TEXT_FN;
  (globalThis as any).clamp = MOCK_CLAMP_FN;
  (globalThis as any).rect = MOCK_RECT_FN;
  (globalThis as any).line = MOCK_LINE_FN;
  (globalThis as any).bar = MOCK_BAR_FN;
  (globalThis as any).box = MOCK_BOX_FN;
  (globalThis as any).arc = MOCK_ARC_FN;
  (globalThis as any).addWithCharCode = MOCK_ADD_WITH_CHAR_CODE_FN;
  (globalThis as any).rnd = MOCK_RND_FN;
  (globalThis as any).range = MOCK_RANGE_FN;
  (globalThis as any).PI = MOCK_TITLE_FN;
  (globalThis as any).ceil = MOCK_END_FN;
}

// Also export them for direct import in tests if needed (e.g. for assertions)
export const init = MOCK_INIT_FN;
export const play = MOCK_PLAY_FN;
export const input = MOCK_INPUT_OBJ;
export const CardView = MOCK_CARD_VIEW_CLASS;
export const SpeechBubbleView = MOCK_SPEECH_BUBBLE_VIEW_CLASS;
export const vec = MOCK_VEC_FN;
export const color = MOCK_COLOR_FN;
export const char = MOCK_CHAR_FN;
export const text = MOCK_TEXT_FN;
export const clamp = MOCK_CLAMP_FN;
export const rect = MOCK_RECT_FN;
export const line = MOCK_LINE_FN;
export const bar = MOCK_BAR_FN;
export const box = MOCK_BOX_FN;
export const arc = MOCK_ARC_FN;
export const addWithCharCode = MOCK_ADD_WITH_CHAR_CODE_FN;
export const rnd = MOCK_RND_FN;
export const range = MOCK_RANGE_FN;
export const title = MOCK_TITLE_FN;
export const end = MOCK_END_FN;
export const PI = Math.PI;
export const ceil = Math.ceil;

export const __esModule = true; // Mark as ES Module if original is, or for interop

// Add any other functions/objects that main.ts (or other tested files)
// might expect to be exported from "crisp-game-lib"

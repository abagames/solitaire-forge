console.log("DEBUG: test/manual-mocks/utils-view-stub.ts LOADED"); // For debugging moduleNameMapper

// test/manual-mocks/utils-view-stub.ts
import { jest } from "@jest/globals";

// This is the mock instance that CardView constructor will return
export const MOCK_CARD_VIEW_INSTANCE_FROM_UTIL_STUB = {
  containsPoint: jest.fn().mockReturnValue(false),
  update: jest.fn(),
  draw: jest.fn(),
  pos: { x: 0, y: 0, set: jest.fn() },
  rank: 0,
  suit: "spade" as const,
  isFaceUp: true,
  isSelected: false,
  size: { x: 9, y: 16, set: jest.fn() },
  isHighlighted: false,
  isFlipping: false,
  flipProgress: 0,
  targetIsFaceUp: null as boolean | null,
  flipSpeed: 0.1,
  isMoving: false,
  moveStartPos: { x: 0, y: 0, set: jest.fn() },
  moveTargetPos: { x: 0, y: 0, set: jest.fn() },
  moveProgress: 0,
  moveSpeed: 0.07,
  getRankDisplayString: jest.fn().mockReturnValue(""),
  startFlipAnimation: jest.fn(),
  updateFlipAnimation: jest.fn(),
  startMoveAnimation: jest.fn(),
  updateMovement: jest.fn(),
};

// This is the mock constructor for CardView
export const CardView = jest.fn(() => MOCK_CARD_VIEW_INSTANCE_FROM_UTIL_STUB);

// Mock instance for SpeechBubbleView
export const MOCK_SPEECH_BUBBLE_VIEW_INSTANCE_FROM_UTIL_STUB = {
  setText: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  pos: { x: 0, y: 0, set: jest.fn() }, // Assuming pos is a vector-like object
  setTail: jest.fn(),
  size: { x: 0, y: 0 }, // Assuming size is a vector-like object
  draw: jest.fn(),
  // Add any other methods or properties that SpeechBubbleView instances are expected to have
};

// Mock constructor for SpeechBubbleView
export const SpeechBubbleView = jest.fn(
  () => MOCK_SPEECH_BUBBLE_VIEW_INSTANCE_FROM_UTIL_STUB
);

// Mock for characters array
export const characters: string[] = [];

export const __esModule = true; // If view.ts is an ES module

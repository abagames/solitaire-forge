# Crisp Game Lib Game Testing Guide (from Jest and Cartographer's Expedition Implementation Examples)

This document explains test strategies and specific test case creation methods for browser-based card games (or games with similar interactions) developed using `crisp-game-lib`. It is primarily based on insights gained from the test implementation of "Cartographer's Expedition" (`test/games/cartographers-expedition/main.test.ts`).

## 1. Introduction

### 1.1. Importance of Testing

Testing is indispensable in software development. Especially in game development, where diverse interactions and state transitions exist, comprehensive quality assurance is difficult with manual testing alone. Introducing automated tests provides the following benefits:

- **Early Bug Detection:** Quickly detect if existing functionality is broken (regression) when code changes.
- **Confidence in Refactoring:** Proceed with code improvements confidently if protected by tests.
- **Specification Clarification:** Test cases themselves also serve as documentation describing the expected behavior of components and functions.
- **Improved Development Efficiency:** Reduce repetitive manual confirmation work.

### 1.2. Introducing Jest and ts-jest

This guide uses [Jest](https://jestjs.io/), a JavaScript/TypeScript testing framework. To use Jest in a TypeScript project, a preset (transpiler) called `ts-jest` is required.

This setup is assumed to be done in parallel with the project setup described in `crisp-game-lib-card-game-guide.md`.

**Main Installation Packages:**

```bash
npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom
```

- `jest`: The Jest core.
- `@types/jest`: Type definitions for Jest.
- `ts-jest`: A preset to make TypeScript executable with Jest.
- `jest-environment-jsdom`: A Jest environment that simulates a browser environment (DOM APIs, etc.). This is usually necessary because `crisp-game-lib` assumes a browser environment.

### 1.3. Role of Mocks

`crisp-game-lib` relies on global functions (`play`, `input`, `text`, etc.) and DOM manipulation. Attempting to run these directly in Jest's test environment (Node.js-based) will result in errors. Mocks are also important for isolating the unit under test (function or module) and eliminating external dependencies.

This guide will later describe how to mock `crisp-game-lib` entirely.

## 2. Test Strategy

### 2.1. Unit Tests vs. Integration Tests

- **Unit Tests:** Test the smallest units of code, such as functions or modules, individually. External dependencies are replaced with mocks. This guide primarily focuses on unit tests.
- **Integration Tests:** Combine multiple units and test if they work correctly together.
- **E2E (End-to-End) Tests:** Simulate user operations in an actual browser environment and test the entire application.

For small `crisp-game-lib` games, covering the main logic with unit tests is often a cost-effective strategy.

### 2.2. What Should Be Tested?

This depends on the type and complexity of the game, but generally, the following elements are test targets:

- **Game Core Logic (`GameDefinition`):**
  - `setupGame`: Is the initial state generated correctly?
  - `applyAction`: Does each action update the state correctly? Is immutability maintained?
  - `checkGameEnd`: Are win/lose/continue conditions judged correctly?
  - `getAvailableActions` (optional): Are available actions listed for a specific state?
- **Input Processing and State Changes (helper functions in `main.ts`, etc.):**
  - Are intended elements (cards, icons) correctly identified for player click input (coordinates)?
  - Is the selection state (`selectedHandIndex`, `selectedSourceCell`, etc.) updated appropriately?
  - Are appropriate actions triggered in response to input (`applyAction` called)?
  - Are invalid inputs and edge cases handled appropriately (error sound playback, state immutability, etc.)?
- **Tutorial Logic:**
  - Do tutorial steps transition correctly according to specific game states or player actions?
  - Are tutorial messages (`setText` of `SpeechBubbleView`, etc.) set as expected?
  - Does the management of displayed steps (`shownTutorialStepsThisSession`) function correctly?
- **(Optional) Unit Tests for View Components:**
  - Do custom view classes like `CardView` and `SpeechBubbleView` correctly set properties based on the given state, or call expected `crisp-game-lib` drawing functions (`text`, `rect`, `char`, etc.) within their drawing methods? (This guide does not delve deeply into this, but it is effective for complex views).

## 3. Jest Setup and Configuration

### 3.1. `jest.config.js`

Create `jest.config.js` (or `.ts`) in the project root and configure Jest.

```javascript
// jest.config.js (Example used in Cartographer's Expedition)
export default {
  preset: "ts-jest/presets/default-esm", // Preset for ESM + TypeScript
  testEnvironment: "jsdom", // Simulate browser environment
  transform: {
    "^.+.tsx?$": [
      // Transpile .ts or .tsx files
      "ts-jest",
      {
        useESM: true, // Use ESM
      },
    ],
  },
  moduleNameMapper: {
    // Replace `crisp-game-lib` imports with a stub file
    "^crisp-game-lib$": "<rootDir>/test/manual-mocks/crisp-game-lib-stub.ts",
    // Setting to resolve `.js` extensions in import statements (depends on project's moduleResolution)
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  // Node modules are basically not targeted for transpilation (adjust as needed)
  transformIgnorePatterns: ["/node_modules/"],
};
```

**Key Configuration Items:**

- `preset`: Specifies the `ts-jest` preset. If using ES Modules, select an `default-esm` type.
- `testEnvironment`: Specifying `jsdom` makes browser APIs like `window` and `document` available in tests.
- `transform`: Configures TypeScript files (`.ts`, `.tsx`) to be transpiled with `ts-jest`. `useESM: true` is important when `"type": "module"` is specified in `package.json`.
- `moduleNameMapper`: Maps the import path of a specific module to another file (usually a mock file). Essential for mocking `crisp-game-lib`.

### 3.2. Test Script in `package.json`

Define the test execution command in the `scripts` section of `package.json`.

```json
// package.json
{
  "type": "module", // If using ESM
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
    // To run a specific file: npm test -- test/path/to/file.test.ts
    // Watch mode: npm test -- --watch
  }
  // ...
}
```

- `"type": "module"`: Specify if using ES Modules throughout the project.
- `node --experimental-vm-modules ...`: Node.js flag required when using ESM with Jest.
- `npm test -- <path_to_file>`: Command example for running only a specific test file.

## 4. Mocking `crisp-game-lib` (`crisp-game-lib-stub.ts`)

As mentioned earlier, `crisp-game-lib` does not work as is in the test environment, so create a stub (mock) file that mimics its functionality.

### 4.1. Why Mocks are Necessary

- **Eliminate Environmental Dependencies:** `crisp-game-lib` internally expects DOM operations like `document.createElement("canvas")` and global functions/objects like `play`, `input`. These do not exist in the Node.js environment.
- **Isolate Tests:** Ensure that the unit under test depends only on the interface (call signature) of `crisp-game-lib`, not its specific implementation.
- **Facilitate Verification:** Easily verify if `crisp-game-lib` functions were called as expected (`toHaveBeenCalledWith`) using Jest's mock functionality.

### 4.2. Replacement by `moduleNameMapper`

In `jest.config.js`, use `moduleNameMapper` so that import statements like `import "crisp-game-lib";` or `import * as cgl from "crisp-game-lib";` load the specified stub file (e.g., `<rootDir>/test/manual-mocks/crisp-game-lib-stub.ts`) instead.

### 4.3. Stub File Implementation Example

```typescript
// test/manual-mocks/crisp-game-lib-stub.ts
import { jest } from "@jest/globals";

// Mock for common Vector properties
const commonVecProps = {
  set: jest.fn(),
  isInRect: jest.fn().mockReturnValue(false),
  // Add other methods as needed (add, sub, mag, etc.)
};

// --- Mocks for main functions/objects ---
export const MOCK_PLAY_FN = jest.fn();
export const MOCK_INPUT_OBJ = {
  isJustPressed: false,
  pos: { x: 0, y: 0, ...commonVecProps },
};
export const MOCK_VEC_FN = jest.fn((x = 0, y = 0) => ({
  x,
  y,
  ...commonVecProps,
}));
export const MOCK_COLOR_FN = jest.fn((name) => name); // Example implementation that returns the color name
export const MOCK_TEXT_FN = jest.fn();
export const MOCK_TITLE_FN = jest.fn();
export const MOCK_END_FN = jest.fn();
export const MOCK_CHAR_FN = jest.fn();
// ... Other necessary functions (rect, line, clamp, rnd, etc.)

// --- Mocks for view classes ---
export const MOCK_CARD_VIEW_CLASS = jest.fn().mockImplementation(() => ({
  containsPoint: jest.fn().mockReturnValue(false),
  startFlipAnimation: jest.fn(),
  startMoveAnimation: jest.fn(),
  draw: jest.fn(),
  pos: { x: 0, y: 0, ...commonVecProps },
  rank: 0,
  suit: "s",
  isFaceUp: false,
  isMoving: false,
  isFlipping: false,
  isSelected: false,
  isHighlighted: false,
  // ... Other properties or methods
}));
export const MOCK_SPEECH_BUBBLE_VIEW_CLASS = jest
  .fn()
  .mockImplementation(() => ({
    setText: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    draw: jest.fn(),
    pos: { x: 0, y: 0, ...commonVecProps },
    setTail: jest.fn(),
    size: { x: 0, y: 0 },
    // ...
  }));

// --- Assignment to global (expected behavior by crisp-game-lib) ---
if (typeof globalThis !== "undefined") {
  (globalThis as any).play = MOCK_PLAY_FN;
  (globalThis as any).input = MOCK_INPUT_OBJ;
  (globalThis as any).vec = MOCK_VEC_FN;
  (globalThis as any).color = MOCK_COLOR_FN;
  (globalThis as any).text = MOCK_TEXT_FN;
  (globalThis as any).title = MOCK_TITLE_FN;
  (globalThis as any).end = MOCK_END_FN;
  (globalThis as any).char = MOCK_CHAR_FN;
  (globalThis as any).CardView = MOCK_CARD_VIEW_CLASS;
  (globalThis as any).SpeechBubbleView = MOCK_SPEECH_BUBBLE_VIEW_CLASS;
  // ...
}

// --- Export for use in test files with import * as cgl from "crisp-game-lib" ---
export const play = MOCK_PLAY_FN;
export const input = MOCK_INPUT_OBJ;
export const vec = MOCK_VEC_FN;
export const color = MOCK_COLOR_FN;
export const text = MOCK_TEXT_FN;
export const title = MOCK_TITLE_FN;
export const end = MOCK_END_FN;
export const char = MOCK_CHAR_FN;
export const CardView = MOCK_CARD_VIEW_CLASS;
export const SpeechBubbleView = MOCK_SPEECH_BUBBLE_VIEW_CLASS;
// ...

export const __esModule = true; // Mark as ESM
```

This stub file needs to be extended according to the `crisp-game-lib` features used by the game.

## 5. Creating Test Cases (`*.test.ts`)

Jest test files usually follow the `*.test.ts` (or `*.spec.ts`) naming convention.

### 5.1. Jest Basic API

- `describe(name, fn)`: Groups related tests. Nesting is also possible.
- `it(name, fn)` or `test(name, fn)`: Defines individual test cases.
- `beforeEach(fn)`: Defines processing executed before each `it` block (state reset, etc.).
- `afterEach(fn)`: Defines processing executed after each `it` block.
- `beforeAll(fn)`: Executed once before all tests in a `describe` block.
- `afterAll(fn)`: Executed once after all tests in a `describe` block.
- `expect(value)`: Starts an assertion (validation of expected value). Many matchers (`.toBe()`, `.toEqual()`, `.toHaveBeenCalledWith()`, `.toThrow()`, etc.) are available.

### 5.2. Example: Testing `main.ts`

Referring to `Cartographer's Expedition`'s `test/games/cartographers-expedition/main.test.ts`, here are key points of the test structure.

#### 5.2.1. `import`

```typescript
// test/games/cartographers-expedition/main.test.ts
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import type { Rank, Suit, Card } from "../../../src/types.js";
import type {
  ExpeditionState,
  ExpeditionAction,
} from "../../../src/games/cartographers-expedition/definition.js";

// crisp-game-lib is replaced by a stub
// @ts-expect-error TS7016 (stub may not have complete type definitions)
import * as crispGameLibModule from "crisp-game-lib";
// The actual GameDefinition may also be mocked (see below)
import { CartographersExpedition as ActualCartographersExpedition } from "../../../src/games/cartographers-expedition/definition.js";

// Import functions to be tested, and test setters/getters
import {
  handleOngoingInput,
  // ... (test helper functions: __TEST_ONLY_setGameState, getGameState, etc.)
  updateTutorialDisplay,
} from "../../../src/games/cartographers-expedition/main.js";
```

#### 5.2.2. Preparation in `beforeEach`

Before each test case (`it`) runs, cleanly reset the state and set up necessary mocks.

```typescript
describe("Cartographer's Expedition - Main Game Flow", () => {
  let testGridCardViews: any[][]; // Array of mocked CardView instances
  let testHandCardViews: any[];
  let testTutorialBubbleInstance: any; // Mocked SpeechBubbleView instance
  let initialGameState: ExpeditionState; // Initial game state used in each test

  beforeEach(() => {
    jest.clearAllMocks(); // Clear call history of all mock functions

    // Reset crisp-game-lib input state (manipulate stub properties)
    if (crispGameLibModule && crispGameLibModule.input) {
      (crispGameLibModule.input as any).isJustPressed = false;
      (crispGameLibModule.input as any).pos = {
        x: 0,
        y: 0,
        ...commonVecPropsFromStub, // Assuming this is defined in the stub or imported
      };
    }
    // Set implementation for specific mock functions (e.g., color returns color name)
    (crispGameLibModule.color as jest.Mock).mockImplementation((name) => name);

    // Mock GameDefinition functions (applyAction, checkGameEnd, etc.)
    // This makes it easier to control how the main.ts logic under test
    // interacts with GameDefinition.
    (ActualCartographersExpedition.applyAction as jest.Mock).mockClear();
    (ActualCartographersExpedition.checkGameEnd as jest.Mock)
      .mockClear()
      .mockReturnValue({ status: "ONGOING" }); // Set default return value

    // Initialize game state (convenient to have test setters in main.ts)
    initialGameState = {
      /* ... */
    };
    __TEST_ONLY_setGameState(initialGameState);
    __TEST_ONLY_setSelectedSourceCell(null);
    // ... Reset other module-scoped variables in main.ts

    // Prepare mocked view instances
    // (Since CardView and SpeechBubbleView constructors are mocked with jest.fn(),
    // `new` returns mock instances)
    testGridCardViews = initialGameState.grid.map((row) =>
      row.map((cell) => (cell ? new crispGameLibModule.CardView() : null))
    );
    testHandCardViews = initialGameState.hand.map((card) =>
      card ? new crispGameLibModule.CardView() : null
    );
    __TEST_ONLY_setGridCardViews(testGridCardViews); // Test setter in main.ts
    // ...

    testTutorialBubbleInstance = new crispGameLibModule.SpeechBubbleView();
    __TEST_ONLY_setTutorialBubble(testTutorialBubbleInstance);
  });

  // ... `it` blocks follow here ...
});
```

**Points:**

- Functions prefixed with `__TEST_ONLY_...` are setters/getters exported from `main.ts` only for testing purposes. This makes it easier to control and observe the internal state of the module under test.
- Each function of `GameDefinition` (`ActualCartographersExpedition`) like `applyAction`, `checkGameEnd` is also mocked with `jest.fn()` and cleared in `beforeEach`. You can use `mockReturnValueOnce` or `mockImplementationOnce` per test case to make them behave specifically.

#### 5.2.3. Test Cases (`it` blocks)

Each `it` block tests a specific scenario.

**Common Pattern:**

1.  **Arrange:**

    - Set preconditions necessary for the test.
      - `crispGameLibModule.input.isJustPressed = true;`
      - `crispGameLibModule.input.pos.x = /* ... */;`
      - To simulate a specific card view being clicked, set its `containsPoint` mock method to return `true`:
        `testGridCardViews[r][c].containsPoint.mockReturnValue(true);`
      - If necessary, set the return value of `GameDefinition` mock functions:
        `(ActualCartographersExpedition.applyAction as jest.Mock).mockReturnValueOnce(expectedNextState);`
        `(ActualCartographersExpedition.checkGameEnd as jest.Mock).mockReturnValueOnce({ status: "WIN", ... });`
      - Set internal state of `main.ts` with test setters:
        `__TEST_ONLY_setSelectedSourceCell({ r: 1, c: 1 });`
        `__TEST_ONLY_setTutorialStep(2);`

2.  **Act:**

    - Call the function under test.
      `handleOngoingInput();`
      `updateTutorialDisplay(...);`

3.  **Assert:**
    - Use `expect` to verify if the execution result is as expected.
      - `crisp-game-lib` mock function calls:
        `expect(crispGameLibModule.play).toHaveBeenCalledWith("tap");`
        `expect(testTutorialBubbleInstance.setText).toHaveBeenCalledWith(expect.stringContaining("..."));`
        `expect(crispGameLibModule.title).toHaveBeenCalledWith("YOU WIN!", expect.any(Object));`
      - `main.ts` state getters:
        `expect(getSelectedSourceCell()).toEqual({ r: 1, c: 1 });`
        `expect(getTutorialStep()).toBe(2);`
        `expect(getGameState()).toEqual(expectedNextState);`
      - `GameDefinition` mock function calls:
        `expect(ActualCartographersExpedition.applyAction).toHaveBeenCalledWith(currentState, expectedActionPayload);`
        `expect(ActualCartographersExpedition.checkGameEnd).toHaveBeenCalledWith(newState);`

```typescript
// Example: STEP 1 - Test source card selection
it("STEP 1: should select a face-up grid card as source", () => {
  // Arrange
  const sourceCardR = 1,
    sourceCardC = 1;
  const sourceCardView = testGridCardViews[sourceCardR]?.[sourceCardC];
  if (!sourceCardView) throw new Error("Test setup error");
  sourceCardView.containsPoint.mockReturnValue(true); // Simulate this card being clicked
  (crispGameLibModule.input as any).isJustPressed = true;
  (crispGameLibModule.input.pos as any).set(10, 20); // Click coordinates (arbitrary)

  // Act
  handleOngoingInput();

  // Assert
  expect(crispGameLibModule.play).toHaveBeenCalledWith("tap");
  expect(getSelectedSourceCell()).toEqual({ r: sourceCardR, c: sourceCardC });
  expect(getTutorialStep()).toBe(2); // Tutorial should advance
  expect(testTutorialBubbleInstance.setText).toHaveBeenCalled(); // Message should be set
});
```

## 6. Examples of Specific Test Scenarios (from Cartographer's Expedition)

Test scenarios implemented in `main.test.ts` are as follows:

- **Main Game Flow:**
  1. Click a face-up card on the grid to select it as the source.
  2. After selecting the source, click a card in hand to select it.
  3. After selecting the source and hand card, click an adjacent face-down card to reveal it (execute action).
- **Discard Mode:**
  1. Activate discard mode (in tests, directly use `__TEST_ONLY_setIsDiscardModeActive(true)`).
  2. Click a card in hand to discard it and draw a new card from the deck (execute action).
  3. Verify sound, state reset, tutorial update, etc.
- **Game End Conditions:**
  1. Execute a card reveal action.
  2. Mock `GameDefinition.applyAction` to return a new state.
  3. Mock `GameDefinition.checkGameEnd` to return "WIN" (or "LOSE").
  4. After executing the input handler under test (`handleOngoingInput`), verify that `checkGameEnd` is called, and based on its result, `crispGameLibModule.title` (or `end`) is called with appropriate arguments.
     (Note: Since the entire `update` loop of `main.ts` is not tested, the call to `checkGameEnd` and the subsequent `title` call had to be simulated within the test.)

**Test Scenarios That Could Be Added in the Future:**

- Selection of an invalid target cell (not adjacent, already face-up, etc.).
- Deselection of a selected source card (re-clicking the same card, clicking the background).
- Input restrictions according to tutorial steps.
- Discard action when the deck is empty.
- Game end when all cards are revealed.
- Other edge cases.

## 7. Debugging and Troubleshooting

- **Read Test Failure Messages Carefully:** Jest's output provides detailed information about the difference between expected and actual values (`Expected: ... Received: ...`) and stack traces where errors occurred.
- **Utilize `console.log`:** Outputting variable values or mock call situations with `console.log` within the function under test or in the test case can help identify problems.
- **Jest Options:**
  - `npm test -- --watch`: Automatically re-runs related tests when files change.
  - `npm test -- --runInBand`: Runs tests sequentially in a single process. Can help isolate strange issues during parallel execution.
  - `npm test -- --clearCache`: Clears Jest's cache. Try this if old results are displayed due to caching.
  - `.only` and `.skip`: Using `describe.only(...)` or `it.only(...)` allows you to run only that test suite or test case. Convenient for debugging. `it.skip(...)` temporarily disables a test.
- **Struggling with ESM:** Errors like `SyntaxError: Cannot use import statement outside a module` or `ReferenceError: exports is not defined` are prone to occur when ESM settings (Node.js flags, `type` in `package.json`, `preset` or `transform` in `jest.config.js`, `module` setting in `tsconfig.json`) are not aligned. Carefully review related settings.
- **Verify Mocks:** If mocks are not functioning as expected (`TypeError: ... is not a function`, etc.), check that mock functions are correctly defined/exported in the stub file and correctly mapped in `moduleNameMapper`. Also, it's important that `jest.clearAllMocks()` is called in `beforeEach`.

Hopefully, this guide will be helpful for implementing tests in game development using `crisp-game-lib`.

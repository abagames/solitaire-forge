# Guide to Implementing Card Games with Crisp Game Lib (from Cartographer's Expedition Implementation Example)

This document summarizes the basic procedures and techniques for implementing browser-based card games using `crisp-game-lib`. It is primarily based on insights gained during the implementation of "Cartographer's Expedition."

## 1. Project Setup

### 1.1. Introducing Vite (Recommended)

**(Note: If your project already has Vite integrated, skip this section)**

- Provides a fast development server and build process.
- Add `vite` as a development dependency to `package.json` (`npm install vite --save-dev`).
- Set up development server start and build commands in `scripts`.

  - **Method A: Specify directory via command arguments:**

    ```json
    // package.json
    {
      "type": "module",
      "scripts": {
        "dev": "vite src/games/your-game-name",
        "build": "vite build src/games/your-game-name"
      }
      // ... dependencies, devDependencies
    }
    ```

  - **Method B: Configure with `vite.config.js` (or `.ts`) (Recommended):**
    Create a configuration file in the project root. This allows for more detailed settings.

    ```javascript
    // vite.config.js example
    import { defineConfig } from "vite";

    export default defineConfig({
      root: "src/games/your-game-name", // Directory containing the HTML file
      // publicDir: 'public', // Directory for static files (relative to root)
      build: {
        // Specify output directory relative to project root
        outDir: "../../dist/your-game-name",
        emptyOutDir: true, // Empty the output directory on build
      },
      server: {
        // open: true, // Automatically open browser on server start
      },
    });
    ```

    When using `vite.config.js`, write the `scripts` in `package.json` without arguments.

    ```json
    // package.json (when using vite.config.js)
    {
      "scripts": {
        "dev": "vite",
        "build": "vite build"
      }
      // ...
    }
    ```

### 1.2. HTML File (`index.html`)

- Very simple.
- Load the main TypeScript file (`main.ts`, etc.) that uses `crisp-game-lib` with `<script type="module">`.
- The `body` can be empty (the library will generate a Canvas).

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Your Game Title</title>
      <meta
        name="viewport"
        content="width=device-width, height=device-height,
      user-scalable=no, initial-scale=1, maximum-scale=1"
      />
      <script type="module" src="./main.ts"></script>
    </head>
    <body></body>
  </html>
  ```

## 2. Initializing Crisp Game Lib (`main.ts`)

### 2.1. Calling the `init` Function

- This is the entry point for the game.
- Pass the `update` function, character definitions (`characters`), and various options (`options`).

  ```typescript
  // main.ts
  import "crisp-game-lib";
  import { characters } from "../../utils/view.ts"; // Load character definitions from a separate file
  import { update } from "./update"; // The update function can also be in a separate file

  init({
    update, // Function called every frame
    characters, // Patterns for characters and shapes to use
    options: {
      // Game-specific option settings
      viewSize: { x: 70, y: 130 }, // Screen size
      isShowingScore: false, // Whether to display the score
      isSoundEnabled: false, // Whether sound is enabled
      // isUsingSmallText: true, // To make all text smaller (as of v1.3.0, specify with text() option)
      // theme: "pixel", // Theme specification
    },
  });
  ```

### 2.2. `update` Function

- The main game loop. Called every frame.
- Main responsibilities (in order of execution):
  - Initialize game state (on the first frame or on retry)
  - **Update tutorial state** (detect step changes)
  - Process player input
  - Update game logic (apply actions, etc.)
  - Check for game end
  - Draw the screen
- **State Variables:** Define variables outside the scope of the `update` function (module scope) to hold game state (`gameState`), player selection state (`selectedHandIndex`, `selectedSourceCell`), game progress status (`gameStatus`, `gameOverReason`), and tutorial state (`tutorialStep`, `previousTutorialStep`, etc.).

  ```typescript
  // main.ts (module scope)
  import { ExpeditionState } from "./game.ts"; // Assuming game.ts defines this type
  import { SpeechBubbleView } from "../../utils/view.ts"; // Assuming view.ts defines this class

  let gameState: ExpeditionState | null = null;
  let selectedHandIndex: number | null = null;
  let selectedSourceCell: { r: number; c: number } | null = null;
  let gameStatus: "ONGOING" | "WIN" | "LOSE" = "ONGOING";
  let gameOverReason: string | null = null;
  type TutorialStep = /*...*/ | "OFF"; // Define your tutorial steps
  let tutorialStep: TutorialStep = 1; // Or your initial step
  let previousTutorialStep: TutorialStep | null = null;
  let tutorialBubble: SpeechBubbleView | null = null;
  let shownTutorialStepsThisSession: Set<TutorialStep> = new Set();

  function update() {
    // 1. Initialization (if gameState === null)
    if (!gameState) {
      gameState = /* Initialize your game state */;
      selectedHandIndex = null;
      // ... Reset other states ...
      tutorialStep = 1; // Or your initial step
      previousTutorialStep = null;
      shownTutorialStepsThisSession.clear();
      // ... Initialize tutorialBubble ...
    }

    // 2. Update tutorial (detect changes)
    if (tutorialStep !== previousTutorialStep && tutorialBubble) {
      updateTutorialBubble(/* Pass necessary arguments, e.g., tutorialStep, shownTutorialStepsThisSession, tutorialBubble */);
      previousTutorialStep = tutorialStep;
    }

    // 3. Process input (if gameStatus === "ONGOING")
    if (gameStatus === "ONGOING" && input.isJustPressed) {
      // ... Click detection, state updates, action execution ...
      // tutorialStep might also be updated here
    } else if (gameStatus !== "ONGOING" && input.isJustPressed) {
      // Retry logic after game ends
      gameState = null; // To re-initialize next frame
    }

    // 4. Drawing (if gameState exists)
    if (gameState) {
      // ... Draw board, hand, information, icons, speech bubble, end message ...
    } else {
      // Loading display, etc.
    }

    // 5. Tutorial step transition (at the end of the frame)
    // Example: if a step is completed, move to another or back to a default
    if (tutorialStep === 5 || tutorialStep === 6) { // Example condition
       tutorialStep = 1; // This change will be processed by change detection next frame
    }
  }
  ```

### 2.3. Character and Shape Definitions (`view.ts`, etc.)

- `crisp-game-lib` draws shapes using ASCII art-like character patterns.
- Pass an array of `characters` defining card suits, ranks, icons, etc., to `init`.
  ```typescript
  // src/utils/view.ts
  export const characters = [
    `
    l
   lll
  lllll
  l l l
    l
   lll
  `, // 'a': Spade, for example
    // ... Other suits, ranks ('f' for 10, etc.), icons ('g' for trash can, etc.)
  ];
  ```

## 3. Separating Game Logic (`game.ts`)

- Separating drawing and input processing from game rules and state management improves code readability.

### 3.1. Type Definitions (also using `types.ts`)

- **Game State (State):** Define a data structure representing the game's situation (e.g., `ExpeditionState`). Include board, hand, draw pile, progress, etc.

  ```typescript
  // src/types.ts (example)
  export type Suit = "SPADE" | "HEART" | "DIAMOND" | "CLUB";
  export type Rank = "A" | "2" | /*...*/ | "K";
  export interface Card { suit: Suit; rank: Rank; id: string; }
  export interface BaseGameState { /* ... common properties ... */ }

  // src/games/your-game-name/game.ts
  import { BaseGameState, Card } from "../../types.ts"; // Adjust path as needed
  export interface YourGameState extends BaseGameState {
    grid: (Card & { faceUp: boolean } | null)[][];
    hand: Card[];
    drawPile: Card[];
    discardPile: Card[];
    // ... Other game-specific states
  }
  ```

- **Action (Action):** Define types for operations the player can perform (e.g., `ExpeditionAction`). Often includes a `type` for identification and a `payload` for details.
  ```typescript
  // src/games/your-game-name/game.ts
  import { BaseAction } from "../../types.ts"; // Assuming a BaseAction type exists
  export interface RevealAdjacentAction extends BaseAction {
    type: "revealAdjacent";
    payload: { handIndex: number; sourceRow: number /*...*/ };
  }
  export interface DiscardAndDrawAction extends BaseAction {
    type: "discardAndDraw";
    payload: { handIndex: number };
  }
  export type YourGameAction = RevealAdjacentAction | DiscardAndDrawAction;
  ```

### 3.2. Game Definition Object (`GameDefinition`)

- Create an object that groups game rules as functions.

  ```typescript
  // src/games/your-game-name/game.ts
  import { GameDefinition } from "../../types.ts"; // Assuming this type is defined

  export const YourGame: GameDefinition<YourGameState, YourGameAction> = {
    gameId: "your_game_id",
    gameName: "Your Game Name",

    setupGame: (seed?: string): YourGameState => {
      // Create deck, shuffle, deal to board/hand, etc.
      // ...
      const initialState: YourGameState = {
        /* ... */
      };
      return initialState;
    },

    applyAction: (
      state: YourGameState,
      action: YourGameAction
    ): YourGameState => {
      // Return a new state object instead of modifying state directly (Immutability)
      // Reasons:
      // - Prevents unintended side effects
      // - Makes state changes easier to track and debug
      // - Facilitates future implementation of state history (Undo/Redo)
      const newState = {
        ...state,
        // Note: Nested objects and arrays may require deep copying
        grid: state.grid.map((row) => [...row]), // Example: deep copy of 2D array
        hand: [...state.hand], // Shallow copy of array
      };

      if (action.type === "revealAdjacent") {
        // Reveal card based on payload, discard from hand, draw new, etc.
        // ★ For hand replenishment, using splice to insert at the original index is good UX
        // newState.hand.splice(action.payload.handIndex, 0, newCard);
      } else if (action.type === "discardAndDraw") {
        // Discard from hand and draw based on payload
        // ★ For hand replenishment, use splice to insert at the original index
        // newState.hand.splice(action.payload.handIndex, 0, newCard);
      }
      // ...
      return newState;
    },

    checkGameEnd: (
      state: YourGameState
    ): { status: "WIN" | "LOSE" | "ONGOING"; reason?: string } => {
      // Check win/loss conditions and return the result
      // This result will be reflected in main.ts's gameStatus, gameOverReason
      // ...
      return { status: "ONGOING" };
    },

    getAvailableActions: (state: YourGameState): YourGameAction[] => {
      // (Optional) List all actions currently possible
      // Can be used for AI implementation or hint display
      // ...
      return [];
    },
  };
  ```

## 4. Implementing Drawing (`main.ts`, `view.ts`)

### 4.1. View Components (`CardView`, etc.)

- Grouping drawing logic for specific elements (like cards) into classes increases reusability.

  ```typescript
  // src/utils/view.ts
  import { vec, Vector, text, rect, line } from "crisp-game-lib"; // Assuming these are available

  export class CardView {
    pos: Vector;
    size = vec(9, 16); // Card size
    rank: number; // Or string, depending on your Rank type
    suit: "spade" | "heart" | "diamond" | "club"; // Or your Suit type
    isFaceUp: boolean;
    isHighlighted: boolean; // Highlight state
    isVisible: boolean = true; // To control visibility
    // tailDirection?: "up" | "down" | "left" | "right" | "none"; // For speech bubble like tails

    constructor(
      rank: number,
      suit: "spade" | "heart" | "diamond" | "club",
      isFaceUp: boolean,
      pos: Vector
    ) {
      this.rank = rank;
      this.suit = suit;
      this.isFaceUp = isFaceUp;
      this.pos = pos;
      this.isHighlighted = false;
    }

    getRankDisplayString(): string {
      // Convert A, K, Q, J, 10 (e.g., 'f' for 10)
      if (this.rank === 1) return "A";
      if (this.rank === 10) return "T"; // Or "f" as in example
      if (this.rank === 11) return "J";
      if (this.rank === 12) return "Q";
      if (this.rank === 13) return "K";
      return String(this.rank);
    }

    draw() {
      if (!this.isVisible) return;
      const cardColor =
        this.suit === "heart" || this.suit === "diamond" ? "red" : "black";
      const backgroundColor = this.isHighlighted ? "yellow" : "white";

      // Draw background
      rect(
        this.pos.x - this.size.x / 2,
        this.pos.y - this.size.y / 2,
        this.size.x,
        this.size.y,
        { color: backgroundColor }
      );
      rect(
        this.pos.x - this.size.x / 2 + 0.5,
        this.pos.y - this.size.y / 2 + 0.5,
        this.size.x - 1,
        this.size.y - 1,
        { color: "light_black" }
      );

      if (this.isFaceUp) {
        // Draw rank and suit
        text(
          this.getRankDisplayString(),
          this.pos.x - this.size.x / 2 + 1,
          this.pos.y - this.size.y / 2 + 1,
          { color: cardColor }
        );
        // text(this.suit.charAt(0).toUpperCase(), this.pos.x + this.size.x/2 -1, this.pos.y + this.size.y/2 -1 , {color: cardColor});
        // Or use a character for suit: char(this.suit === 'spade' ? 'a' : ... , this.pos.x, this.pos.y, {color: cardColor})
      } else {
        // Draw card back pattern
        text("?", this.pos.x, this.pos.y, { color: "blue" });
      }

      // Draw tail (if it's a speech bubble like card)
      // if (this.tailDirection && this.tailDirection !== 'none') { /* ... draw line ... */ }
    }

    contains(point: Vector): boolean {
      return (
        point.x >= this.pos.x - this.size.x / 2 &&
        point.x <= this.pos.x + this.size.x / 2 &&
        point.y >= this.pos.y - this.size.y / 2 &&
        point.y <= this.pos.y + this.size.y / 2
      );
    }
  }
  ```

### 4.2. Drawing in the `update` Function

- Draw each element based on the game state (`gameState`).
- **Board:** Loop through `gameState.grid`, create/configure `CardView` instances for each cell, and call `draw()`.
- **Hand:** Loop through `gameState.hand` and draw using `CardView` similarly.
- **Information:** Draw draw pile count (`gameState.drawPile.length`), number of revealed landmarks (`gameState.revealedLandmarks`), etc., using `text()`.
  - The fourth argument options for `text()` can specify `{ isSmallText: true, color: "...", backgroundColor: "..." }`, etc.
- **Icons:** Draw interactive elements like a trash can using `char()`. Changing color to indicate clickability is also effective.
- **Highlight:** Set the `isHighlighted` property of `CardView` instances for selected hand cards or source cards to `true` before calling `draw()`.
- **Game End Screen:** If `gameStatus` is "WIN" or "LOSE", display the result using `text()`. Specifying a background color improves readability.
- **Tutorial Bubble:** Call `draw()` on the `tutorialBubble` whose display state (`isVisible`) is managed by `updateTutorialBubble`.

## 5. Player Input Processing (`main.ts`)

- Generally processed at the beginning of the `update` function (before drawing).
- Process **only when the game is ongoing** (`if (gameStatus === "ONGOING")`).

### 5.1. Click Detection

- Detect clicked (tapped) frames with `if (input.isJustPressed)`.
- Get click coordinates (Vector) with `const clickPos = input.pos;`.

### 5.2. Element Identification

- Determine if the click coordinates (`clickPos`) are within the rectangular area of each drawn element (cards, icons, etc.) using `element.contains(clickPos)` (assuming a `contains` method like in the `CardView` example) or `clickPos.isInRect(x, y, width, height)`.
  - `isInRect` takes the **top-left coordinates** and width/height of the element. If managing by center coordinates (`pos`) like in `CardView`, conversion to top-left coordinates is necessary for `isInRect`.
  - For icons (`char`), calculate the rectangle from the character's center coordinates (e.g., `DISCARD_ICON_X`, `DISCARD_ICON_Y`) and assumed character width/height (e.g., `DISCARD_ICON_WIDTH/HEIGHT`).

### 5.3. State Management and Selection Logic

- **Priority:** Perform click detection for elements leading to specific actions (trash icon, target card) first, then selection elements (hand, source card), and finally background clicks, to prevent unintended behavior.
- **Element Click Flag:** Use a flag (`clickedOnElement`) to indicate if an element (card, icon) was clicked, distinguishing it from background click processing.
- **Selection State Variables:** Prepare variables to hold which element is selected (e.g., `selectedHandIndex: number | null`, `selectedSourceCell: { r: number; c: number } | null`).
- **Select/Deselect:** Update the corresponding selection state variable when an element is clicked.
  - Implementing a toggle (clicking an already selected element deselects it, returning to `null`) is convenient.
  - If no element was clicked (background click), deselect all selection states (set to `null`) to prevent misoperations.
  - **Tutorial Integration:** Update `tutorialStep` at timings like card selection. If necessary, check if a specific selection is possible (e.g., `canSelectHandForSource()`) to branch the tutorial.

### 5.4. Action Execution

- **Priority:** Perform determination for final action execution, such as target selection (reveal card) or hand exchange, first.
- \*\*Card Reveal (`revealAdjacent`):
  - If `selectedHandIndex` and `selectedSourceCell` are both selected, and
  - A face-down card on the board is clicked, and
  - It is adjacent to `selectedSourceCell`, and
  - The hand and source card combination is valid according to rules (rank or suit match), then
  - Create a `{ type: "revealAdjacent", payload: { ... } }` action and call `applyAction(gameState, action)` to update `gameState`.
  - Reset selection state (`null`) after action execution.
- \*\*Hand Exchange (`discardAndDraw`):
  - If a trash icon (or similar) is clicked, and
  - `selectedHandIndex` is selected, and
  - The draw pile (`gameState.drawPile`) is not empty, then
  - Create a `{ type: "discardAndDraw", payload: { handIndex: selectedHandIndex } }` action and call `applyAction`.
  - Reset selection state after action execution.
- Manage a flag (`actionTaken`) indicating whether an action was executed. If an action was taken in a frame, control subsequent selection logic (hand/source card selection) to skip it.

### 5.5. Game End Check

- Immediately after an action is executed (`actionTaken === true`), call `YourGame.checkGameEnd(gameState)` (using your game definition object).
- If the result is not "ONGOING", update `gameStatus` and `gameOverReason`.

## 6. Tutorial Implementation (Cartographer's Expedition Example)

An example of implementing a tutorial feature to teach the player game controls step-by-step.

### 6.1. State Variables

- `tutorialStep`: Variable indicating the current tutorial stage (`1 | 2 | ... | "OFF"`).
- `previousTutorialStep`: Holds the `tutorialStep` from the previous frame, used to detect changes.
- `tutorialBubble`: Holds an instance of `SpeechBubbleView`.
- `shownTutorialStepsThisSession`: A `Set<TutorialStep>` that records steps already displayed in the current game session. This prevents the same step message from being displayed repeatedly.

### 6.2. Tutorial View (`SpeechBubbleView`)

- A view class responsible for displaying the speech bubble (see Section 4.1).
- Has methods to set text, position, tail direction, and control display/hiding (`setText`, `setTail`, `show`, `hide`, `draw`).
- By specifying `"none"` for `tailDirection` in the `setTail` method or constructor options, a speech bubble without a tail can also be displayed.

### 6.3. Update Logic (`updateTutorialBubble`)

- A function called from the `update()` function **only when** `tutorialStep` changes.
- Receives `currentStep`, `shownSteps`, and `bubble` as arguments.
- If `currentStep` is `"OFF"`, call `bubble.hide()` and exit.
- Check `shownSteps.has(currentStep)`.
  - **If not shown (`false`):**
    - Set the message with `bubble.setText()`.
    - Set position and tail with `bubble.pos.set()` and `bubble.setTail()`.
    - Set to display state with `bubble.show()`.
    - Record as shown with `shownSteps.add(currentStep)`.
  - **If already shown (`true`):**
    - Call `bubble.hide()`. This implements the "do not show twice" specification if the state returns to a previously shown step, hiding the bubble.

### 6.4. Integration into `update` Function

- **Initialization:** On game start/retry, execute `tutorialStep = 1` (or initial step), `previousTutorialStep = null`, `shownTutorialStepsThisSession.clear()`, and `new` the `tutorialBubble` (if it doesn't exist).
- **Change Detection:** Before input processing in `update()`, check `if (tutorialStep !== previousTutorialStep)`. If changed, call `updateTutorialBubble()` and update the state with `previousTutorialStep = tutorialStep`.
- **Step Update:** In player input processing (within the `input.isJustPressed` block), update `tutorialStep` to the appropriate value according to specific operations (source selection, hand selection, action execution).
  - If necessary, use helper functions (e.g., `canSelectHandForSource`) to determine the next step.
- **Drawing:** Call `tutorialBubble.draw()` towards the end of the drawing process. Display/hiding depends on the `isVisible` flag controlled within `updateTutorialBubble`.
- **Step Transition:** After certain steps (e.g., steps 5, 6 indicating action completion), if returning to a basic step (e.g., step 1), update `tutorialStep` at the **end** of the `update()` function. This displays the completion message for that frame, and the processing for step 1 (change detection → `updateTutorialBubble` → hide) occurs in the next frame.
- **Game End:** When game end is detected by `checkGameEnd`, set `tutorialStep = "OFF"`. The bubble will be hidden by change detection in the next frame.

## 7. Miscellaneous (Formerly Section 6)

- **Constants:** Defining card sizes, grid start positions, information display positions, etc., as constants makes layout adjustments easier.
- **Debugging:** Outputting click coordinates, selection states, action executions, etc., with `console.log` helps with debugging.
- **Helper Functions:** Extracting specific condition checks (e.g., `canSelectHandForSource`) or calculation logic into helper functions outside the `update` function makes the `update` function itself more readable.

**`crisp-game-lib` Utilities:** The library also provides useful functions like:

- `vec(x, y)`: Creates a Vector object.
- `addWithCharCode(char, offset)`: Gets a character by adding an offset to a character code (e.g., `addWithCharCode('a', 1)` returns `'b'`). Useful when using characters like a spritesheet.
- `clamp(value, min, max)`: Clamps a value within a specified range.
- `range(count)`: Generates an array of numbers from 0 to `count-1`.
- `rnd(minOrMax, max)`: Generates a random number.

Hopefully, this guide will be helpful for developing card games using `crisp-game-lib`.

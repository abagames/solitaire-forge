import "crisp-game-lib";
import { catalystReactionGameDefinition } from "./definition.ts"; // Import the game definition
import type {
  CatalystReactionState,
  PlayCatalystAction,
} from "./definition.ts"; // Import types
import type { Card } from "../../types.ts"; // Import Card from types.ts
import { characters, CardView } from "../../utils/view.ts"; // Import from shared view.ts

// Placeholder characters array is no longer needed

let gameState: CatalystReactionState | null = null;
let selectedHandCardId: string | null = null; // Stores 'rankString+suitString' e.g. '1s' or '10d'
let selectedPlacementPosition: number | null = null; // 0 to N (N = field.length)
let gameStatus: "ongoing" | "win" | "lose" = "ongoing";
let gameOverMessage: string = "";

// --- Drawing constants ---
const CARD_WIDTH = 9;
const CARD_HEIGHT = 16;
const FIELD_START_X = 5;
const FIELD_START_Y = 20;
const HAND_START_X = 15;
const HAND_START_Y = 50; // Adjusted Y for hand cards
const CARD_SPACING = 4; // Increased from 2 to 4
const PLACEMENT_MARKER_RADIUS = 1; // Changed from 2 to 1 for smaller markers

// Store CardView instances for managing individual card states (like selection, animation)
let fieldCardViews: CardView[] = [];
let handCardViews: CardView[] = [];

// TODO: Add other state variables like gameStatus, tutorial variables if needed

// Refactored core logic for testability
export function __TEST_ONLY_handleInputAndGameLogic() {
  if (!gameState || gameStatus !== "ongoing") {
    return; // Should be handled by the main update loop's game over logic
  }

  let actionTakenThisFrame = false;

  if (input.isJustPressed) {
    let clickedOnUIElement = false;

    // 1. Check hand card clicks
    for (const cv of handCardViews) {
      if (cv.containsPoint(input.pos)) {
        clickedOnUIElement = true;
        const cardIdentifier = cv.rank.toString() + cv.suit.charAt(0);
        if (selectedHandCardId === cardIdentifier) {
          selectedHandCardId = null;
        } else {
          selectedHandCardId = cardIdentifier;
        }
        selectedPlacementPosition = null;
        updateSelectionVisuals();
        break;
      }
    }

    // 2. Check placement marker clicks
    if (!clickedOnUIElement && selectedHandCardId && gameState) {
      const fieldCardCenterY = FIELD_START_Y + CARD_HEIGHT / 2;
      for (let i = 0; i <= gameState.field.length; i++) {
        let markerCenterX;
        if (i === 0) {
          markerCenterX =
            FIELD_START_X -
            Math.round(CARD_SPACING / 2.0) -
            PLACEMENT_MARKER_RADIUS;
        } else {
          markerCenterX =
            FIELD_START_X + i * (CARD_WIDTH + CARD_SPACING) - CARD_SPACING / 2;
        }
        if (
          input.pos.distanceTo(vec(markerCenterX, fieldCardCenterY)) <
          PLACEMENT_MARKER_RADIUS + 3
        ) {
          clickedOnUIElement = true;
          selectedPlacementPosition = i;
          break;
        }
      }
    }

    // 3. If both hand card and placement are selected, attempt action
    if (selectedHandCardId && selectedPlacementPosition !== null && gameState) {
      const targetCardGameState = gameState.hand.find((c) => {
        const gsCardIdentifier =
          rankToNumber(c.rank).toString() + c.suit.toLowerCase().charAt(0);
        return gsCardIdentifier === selectedHandCardId;
      });

      if (targetCardGameState) {
        const action: PlayCatalystAction = {
          type: "PLAY_CATALYST",
          payload: {
            catalystCardId: targetCardGameState.id,
            position: selectedPlacementPosition,
          },
        };
        gameState = catalystReactionGameDefinition.applyAction(
          gameState,
          action
        );
        actionTakenThisFrame = true;
        selectedHandCardId = null;
        selectedPlacementPosition = null;
        updateCardViews();
      } else {
        console.error(
          "Logic error: selectedHandCardId did not match any card in gameState.hand",
          selectedHandCardId
        );
        selectedHandCardId = null;
      }
    }
  }

  if (actionTakenThisFrame && gameState) {
    const endCheck = catalystReactionGameDefinition.checkGameEnd(gameState);
    if (endCheck.status !== "ONGOING") {
      gameStatus = endCheck.status.toLowerCase() as "win" | "lose";
      if (gameStatus === "win") {
        gameOverMessage = "YOU WIN!";
      } else {
        gameOverMessage = `GAME OVER\\n${endCheck.reason || "No more moves!"}`;
      }
    } else if (
      gameState.hand.length === 0 &&
      gameState.deck.length === 0 &&
      catalystReactionGameDefinition.getAvailableActions(gameState).length === 0
    ) {
      gameStatus = "lose";
      gameOverMessage = "GAME OVER\\nNo more cards or moves!";
    }
  }
}

function update() {
  if (!gameState) {
    gameState = catalystReactionGameDefinition.setupGame(String(Date.now()));
    selectedHandCardId = null;
    selectedPlacementPosition = null;
    gameStatus = "ongoing";
    gameOverMessage = "";
    updateCardViews();
    console.log("Game Initialized", gameState);
    return; // Initial call to update should just init
  }

  if (gameStatus !== "ongoing") {
    if (input.isJustPressed) {
      gameState = null; // Signal to re-initialize on next frame
    }
    // Drawing game over message
    if (gameOverMessage) {
      const messageLines = gameOverMessage.split("\\n");
      const boxHeight = messageLines.length * 6 + 4;
      const boxWidth = 80;
      const boxX = (150 - boxWidth) / 2;
      const boxY = (70 - boxHeight) / 2;
      color("black");
      rect(boxX, boxY, boxWidth, boxHeight);
      color("white");
      messageLines.forEach((line, index) => {
        text(line, boxX + 2, boxY + 3 + index * 6);
      });
      text("[CLICK TO RESTART]", boxX + 2, boxY + boxHeight - 9, {
        isSmallText: true,
        color: "light_red",
      });
    }
    return; // Stop further processing if game is over
  }

  fieldCardViews.forEach((cv) => cv.update());
  handCardViews.forEach((cv) => cv.update());

  __TEST_ONLY_handleInputAndGameLogic(); // Call the refactored logic

  // --- Drawing ---
  if (gameState) {
    fieldCardViews.forEach((cv) => cv.draw());
    handCardViews.forEach((cv) => cv.draw());

    if (selectedHandCardId) {
      const markerOriginalColor = "yellow";
      const markerSize = PLACEMENT_MARKER_RADIUS * 2;
      const markerCenterY = FIELD_START_Y + CARD_HEIGHT / 2;

      for (let i = 0; i <= gameState.field.length; i++) {
        let markerCenterX;
        if (i === 0) {
          markerCenterX =
            FIELD_START_X -
            Math.round(CARD_SPACING / 2.0) -
            PLACEMENT_MARKER_RADIUS;
        } else {
          markerCenterX =
            FIELD_START_X + i * (CARD_WIDTH + CARD_SPACING) - CARD_SPACING / 2;
        }

        const markerRectX = markerCenterX - PLACEMENT_MARKER_RADIUS;
        const markerRectY = markerCenterY - PLACEMENT_MARKER_RADIUS;

        color(markerOriginalColor);
        rect(markerRectX, markerRectY, markerSize, markerSize);
      }
    }

    color("black");
    text(`Deck: ${gameState.deck.length}`, 60, HAND_START_Y + 9, {
      isSmallText: true,
    });
  }
}

export function updateCardViews() {
  // Exported for potential use in tests if needed, though direct state set might be better
  if (!gameState) return;

  fieldCardViews = gameState.field.map((card, index) => {
    const cv = new CardView();
    cv.pos = vec(
      FIELD_START_X + CARD_WIDTH / 2 + index * (CARD_WIDTH + CARD_SPACING),
      FIELD_START_Y + CARD_HEIGHT / 2
    );
    cv.rank = rankToNumber(card.rank);
    cv.suit = card.suit.toLowerCase() as "spade" | "heart" | "diamond" | "club";
    cv.isFaceUp = true;
    return cv;
  });

  handCardViews = gameState.hand.map((card, index) => {
    const cv = new CardView();
    cv.pos = vec(
      HAND_START_X + CARD_WIDTH / 2 + index * (CARD_WIDTH + CARD_SPACING),
      HAND_START_Y + CARD_HEIGHT / 2
    );
    cv.rank = rankToNumber(card.rank);
    cv.suit = card.suit.toLowerCase() as "spade" | "heart" | "diamond" | "club";
    cv.isFaceUp = true;
    return cv;
  });
  updateSelectionVisuals();
}

export function updateSelectionVisuals() {
  // Exported for tests
  handCardViews.forEach((cv) => {
    const cardViewIdentifier = cv.rank.toString() + cv.suit.charAt(0);
    cv.isSelected = cardViewIdentifier === selectedHandCardId;
  });
}

export function rankToNumber(rank: Card["rank"]): number {
  // Exported for tests
  if (rank === "A") return 1;
  if (rank === "K") return 13;
  if (rank === "Q") return 12;
  if (rank === "J") return 11;
  const numRank = parseInt(rank);
  if (!isNaN(numRank) && numRank >= 2 && numRank <= 10) return numRank;
  return 0;
}

// Test-only helper functions
export const __TEST_ONLY_setGameState = (
  state: CatalystReactionState | null
) => {
  gameState = state;
};
export const __TEST_ONLY_getGameState = () => gameState;

export const __TEST_ONLY_setSelectedHandCardId = (id: string | null) => {
  selectedHandCardId = id;
};
export const __TEST_ONLY_getSelectedHandCardId = () => selectedHandCardId;

export const __TEST_ONLY_setSelectedPlacementPosition = (
  pos: number | null
) => {
  selectedPlacementPosition = pos;
};
export const __TEST_ONLY_getSelectedPlacementPosition = () =>
  selectedPlacementPosition;

export const __TEST_ONLY_setGameStatus = (
  status: "ongoing" | "win" | "lose"
) => {
  gameStatus = status;
};
export const __TEST_ONLY_getGameStatus = () => gameStatus;

export const __TEST_ONLY_setHandCardViews = (views: CardView[]) => {
  handCardViews = views;
};
export const __TEST_ONLY_setFieldCardViews = (views: CardView[]) => {
  fieldCardViews = views;
};
// Also exporting updateCardViews, updateSelectionVisuals, rankToNumber for direct test use if needed.

init({
  update,
  characters, // Now imported from ../../utils/view.ts
  options: {
    viewSize: { x: 150, y: 70 },
    isShowingScore: false,
    isSoundEnabled: false,
    // theme: "pixel", // Optional: explore themes later
    // isUsingSmallText: true, // Optional: if text needs to be smaller globally
  },
});

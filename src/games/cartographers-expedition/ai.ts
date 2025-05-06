import { PlayerAI } from "../../types.ts";
import {
  ExpeditionState,
  ExpeditionAction,
  RevealAdjacentAction,
  DiscardAndDrawAction,
} from "./definition.ts";
import { createRng } from "../../utils/rng.ts";

// Helper function to calculate Manhattan distance
const manhattanDistance = (
  r1: number,
  c1: number,
  r2: number,
  c2: number
): number => {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
};

// --- Basic AI for Cartographer\'s Expedition (NEW: Find Aces Strategy) ---
export const CartographersBasicAI: PlayerAI<ExpeditionState, ExpeditionAction> =
  {
    chooseAction: (
      state: ExpeditionState,
      availableActions: ExpeditionAction[],
      history?: ExpeditionAction[],
      actionSeed?: string
    ): ExpeditionAction => {
      if (availableActions.length === 0) {
        throw new Error(
          "BasicAI cannot choose an action: No actions available."
        );
      }

      const rng = actionSeed ? createRng(actionSeed) : Math.random;
      const gridRows = state.grid.length;
      const gridCols = state.grid[0]?.length ?? 0;

      // Define corner positions (assuming 5x5 grid based on definition.ts)
      const cornerPositions = [
        { r: 0, c: 0 },
        { r: 0, c: gridCols - 1 },
        { r: gridRows - 1, c: 0 },
        { r: gridRows - 1, c: gridCols - 1 },
      ];

      // Identify corners with unrevealed Aces
      const targetCorners = cornerPositions.filter((pos) => {
        const card = state.grid[pos.r]?.[pos.c];
        // Target if it\'s an Ace and NOT face up, or if the card is missing (shouldn\'t happen but safe check)
        return card?.rank === "A" && !card.faceUp;
        // We assume setup correctly placed Aces in corners
      });

      // Separate actions
      const revealActions = availableActions.filter(
        (a): a is RevealAdjacentAction => a.type === "revealAdjacent"
      );
      const discardActions = availableActions.filter(
        (a): a is DiscardAndDrawAction => a.type === "discardAndDraw"
      );

      // --- Strategy: Prioritize revealing towards unrevealed Aces ---
      if (revealActions.length > 0 && targetCorners.length > 0) {
        let bestActions: RevealAdjacentAction[] = [];
        let minDistance = Infinity;

        for (const action of revealActions) {
          const targetR = action.payload.targetRow;
          const targetC = action.payload.targetCol;

          // Calculate min distance from this target to ANY unrevealed Ace corner
          let currentMinTargetDist = Infinity;
          for (const corner of targetCorners) {
            const dist = manhattanDistance(
              targetR,
              targetC,
              corner.r,
              corner.c
            );
            if (dist < currentMinTargetDist) {
              currentMinTargetDist = dist;
            }
          }

          // Update best actions based on distance
          if (currentMinTargetDist < minDistance) {
            minDistance = currentMinTargetDist;
            bestActions = [action]; // New best distance found
          } else if (currentMinTargetDist === minDistance) {
            bestActions.push(action); // Add to equally good actions
          }
        }

        // Choose randomly among the best actions
        if (bestActions.length > 0) {
          const randomIndex = Math.floor(rng() * bestActions.length);
          // console.log(`DEBUG AI: Choosing reveal towards Ace corner (Dist: ${minDistance})`);
          return bestActions[randomIndex];
        }
        // Fallback if calculation failed (shouldn\'t happen) - choose random reveal
        console.warn(
          "DEBUG AI: Corner distance calculation failed? Choosing random reveal."
        );
        const randomIndex = Math.floor(rng() * revealActions.length);
        return revealActions[randomIndex];
      } else if (revealActions.length > 0) {
        // If no target corners (all Aces revealed?) or calculation error, just pick a random reveal
        // console.log("DEBUG AI: No target corners or revealActions empty after filter. Choosing random reveal.");
        const randomIndex = Math.floor(rng() * revealActions.length);
        return revealActions[randomIndex];
      } else if (discardActions.length > 0) {
        // --- If no reveal actions possible, discard randomly ---
        const randomIndex = Math.floor(rng() * discardActions.length);
        // console.log("DEBUG AI: No reveal actions, choosing random discard.");
        return discardActions[randomIndex];
      }

      // Should not happen if availableActions > 0 initially
      throw new Error("BasicAI Error: Could not select any action.");
    },
  };

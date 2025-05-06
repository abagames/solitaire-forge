import { PlayerAI } from "../../types.js";
import { GameState, GameAction } from "./types.ts";
import { createRng } from "../../utils/rng.js";
import { getRankValue } from "./definition.ts"; // Import helper from definition
// Note: We might need to move getRankValue here if definition.ts no longer exports it,
// or keep it exported from definition.ts.
// For now, assume it remains exported from definition.ts.

export const DungeonDelverBasicAI: PlayerAI<GameState, GameAction> = {
  chooseAction: (
    state: GameState,
    availableActions: GameAction[],
    history?: GameAction[],
    actionSeed?: string
  ): GameAction => {
    const rng = actionSeed ? createRng(actionSeed) : Math.random;
    const handCards = state.layouts.hand.cards;

    // 1. 階層クリア報酬を最優先
    const clearLevelActions = availableActions.filter(
      (a): a is GameAction & { type: "clearLevel" } => a.type === "clearLevel"
    );
    if (clearLevelActions.length > 0) {
      clearLevelActions.sort((a, b) => {
        const levelOrder: Record<string, number> = {
          level4: 4,
          level3: 3,
          level2: 2,
          level1: 1,
        };
        // Type assertion needed because layoutId is generic in BaseAction
        const layoutIdA = (a as any).layoutId as keyof typeof levelOrder;
        const layoutIdB = (b as any).layoutId as keyof typeof levelOrder;
        return (levelOrder[layoutIdB] || 0) - (levelOrder[layoutIdA] || 0);
      });
      return clearLevelActions[0];
    }

    // 2. 討伐アクションを次に優先
    const subdueActions = availableActions.filter(
      (a): a is GameAction & { type: "subdue" } => a.type === "subdue"
    );
    if (subdueActions.length > 0) {
      const scoredSubdueActions = subdueActions.map((action) => {
        // Ensure cardId and targetCardId exist, though types should guarantee it
        if (!action.cardId || !action.targetCardId || !action.targetLayoutId) {
          console.warn("Subdue action missing IDs during AI scoring");
          return { action, score: -Infinity }; // Invalid action data
        }
        const challengeCard = handCards.find((c) => c.id === action.cardId);
        const targetLayout = state.layouts[action.targetLayoutId];
        if (!targetLayout) {
          console.warn(
            `Target layout ${action.targetLayoutId} not found during AI scoring`
          );
          return { action, score: -Infinity };
        }
        const targetCard = targetLayout.cards.find(
          (c) => c.id === action.targetCardId
        );
        if (!challengeCard || !targetCard) {
          console.warn("Card not found during subdue scoring", {
            action,
            challengeCard,
            targetCard,
          });
          return { action, score: -Infinity }; // Card not found
        }
        let score = 0;
        // 特殊効果 (手札補充) のスコアを高くする
        if (challengeCard.suit === "HEART") score += 3;
        if (targetCard.suit === "DIAMOND") score += 3;
        // 階層クリアにつながるスコア
        if (targetLayout.cards.length === 1) score += 1;
        return { action, score };
      });

      // Filter out invalid scores before sorting
      const validScoredActions = scoredSubdueActions.filter(
        (a) => a.score > -Infinity
      );

      if (validScoredActions.length > 0) {
        validScoredActions.sort((a, b) => b.score - a.score); // Sort by score descending
        // Choose the best scoring action
        return validScoredActions[0].action;
      }
    }

    // 3. 探索アクション
    const exploreActions = availableActions.filter(
      (a): a is GameAction & { type: "explore" } => a.type === "explore"
    );

    if (exploreActions.length > 0) {
      if (handCards.length === 0) {
        throw new Error(
          "AI Error: Attempting to explore with no cards in hand, but explore actions are available?"
        );
      }

      const sortedHand = [...handCards].sort((a, b) => {
        const isACostPreferred = a.suit === "SPADE" || a.suit === "CLUB";
        const isBCostPreferred = b.suit === "SPADE" || b.suit === "CLUB";

        if (isACostPreferred && !isBCostPreferred) return -1;
        if (!isACostPreferred && isBCostPreferred) return 1;

        return getRankValue(a.rank) - getRankValue(b.rank);
      });
      const preferredCostCard = sortedHand[0];

      const preferredExploreActions = exploreActions.filter(
        (a) => a.cardId === preferredCostCard.id
      );

      if (preferredExploreActions.length > 0) {
        // Prioritize exploring shallower levels first
        const levelOrder = ["level1", "level2", "level3", "level4"];
        for (const level of levelOrder) {
          const actionsForLevel = preferredExploreActions.filter(
            (a) => a.targetLayoutId === level
          );
          if (actionsForLevel.length > 0) {
            return actionsForLevel[Math.floor(rng() * actionsForLevel.length)];
          }
        }
        // Fallback if preferred cost card actions don't match expected levels (shouldn't happen)
        console.warn(
          "Preferred explore actions found, but not for expected levels. Choosing random preferred."
        );
        return preferredExploreActions[
          Math.floor(rng() * preferredExploreActions.length)
        ];
      }

      // Fallback: If no actions use the preferred cost card, use any explore action
      console.warn(
        "Could not find explore action using the preferred cost card, choosing random explore."
      );
      return exploreActions[Math.floor(rng() * exploreActions.length)];
    }

    // 4. フォールバック (Should not be reached if actions are available)
    if (availableActions.length > 0) {
      console.error(
        "AI logic reached fallback despite available actions:",
        availableActions
      );
      // Return a random available action as a last resort
      return availableActions[Math.floor(rng() * availableActions.length)];
    }

    // Should be caught by checkGameEnd, but throw error if AI is called with no actions
    throw new Error("AI chosen action called with no available actions.");
  },
};

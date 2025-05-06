import {
  GameDefinition,
  BaseGameState,
  BaseAction,
  Rank,
  Suit,
  Card as BaseCard,
} from "../../types.js";
import { GameState, GameAction, GameCard } from "./types.ts";
import { createRng } from "../../utils/rng.js";

// カードの数値変換ヘルパー関数 (A=14)
export const getRankValue = (rank: Rank): number => {
  const rankValues: Record<Rank, number> = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14, // Changed from 1 to 14
  };
  return rankValues[rank];
};

// スートの数値変換ヘルパー関数 (♣️=1, ♦️=2, ♥️=3, ♠️=4)
export const getSuitValue = (suit: Suit): number => {
  const suitValues: Record<Suit, number> = {
    CLUB: 1,
    DIAMOND: 2,
    HEART: 3,
    SPADE: 4,
  };
  return suitValues[suit];
};

// 討伐成功判定ヘルパー関数
const canSubdue = (
  challengeCard: BaseCard,
  targetCard: BaseCard,
  levelId: string
): boolean => {
  const challengeValue = getRankValue(challengeCard.rank);
  const targetValue = getRankValue(targetCard.rank);
  const challengeSuitValue = getSuitValue(challengeCard.suit);
  const targetSuitValue = getSuitValue(targetCard.suit);
  const isSameSuit = challengeCard.suit === targetCard.suit;

  switch (levelId) {
    case "level1": // Suit > (Circular: Club(1) beats Spade(4))
      return (
        challengeSuitValue > targetSuitValue ||
        (challengeSuitValue === 1 && targetSuitValue === 4)
      );
    case "level2": // Rank > (Circular: 2 beats Ace(14))
      return (
        challengeValue > targetValue ||
        (challengeValue === 2 && targetValue === 14)
      );
    case "level3": // Suit Match
      return isSameSuit;
    case "level4": // Rank Match
      return challengeValue === targetValue;
    default:
      return false;
  }
};

const DungeonDelver: GameDefinition<GameState, GameAction> = {
  gameId: "DungeonDelver",
  gameName: "ダンジョン探索者",
  description:
    "4つの階層からなるダンジョンを探索しながら、最深部を目指すソリティアゲーム。より深い階層ほど危険（高いカード）と報酬（特殊アクション）が増します。全カードを適切に配置するか、安全に脱出することを目指します。",

  setupGame: (seed?: string) => {
    const rng = seed ? createRng(seed) : Math.random;

    // 初期状態の設定
    const initialState: GameState = {
      _cardIdCounter: 0,
      layouts: {
        deck: {
          name: "deck",
          type: "deck",
          faceDown: true,
          x: 0,
          y: 0,
          cards: [],
        },
        hand: {
          name: "hand",
          type: "hand",
          faceUp: true,
          x: 0,
          y: 100,
          cards: [],
        },
        level1: {
          name: "level1",
          type: "row",
          faceUp: false,
          x: 200,
          y: 0,
          maxCards: 4,
          cards: [],
        },
        level2: {
          name: "level2",
          type: "row",
          faceUp: false,
          x: 200,
          y: 150,
          maxCards: 4,
          cards: [],
        },
        level3: {
          name: "level3",
          type: "row",
          faceUp: false,
          x: 200,
          y: 300,
          maxCards: 4,
          cards: [],
        },
        level4: {
          name: "level4",
          type: "row",
          faceUp: false,
          x: 200,
          y: 450,
          maxCards: 4,
          cards: [],
        },
        cleared: {
          name: "cleared",
          type: "pile",
          faceUp: true,
          x: 500,
          y: 0,
          cards: [],
        },
        discard: {
          name: "discard",
          type: "pile",
          faceUp: true,
          x: 100,
          y: 0,
          cards: [],
        },
      },
    };

    // 52枚のカードを生成
    const suits: Suit[] = ["SPADE", "HEART", "DIAMOND", "CLUB"];
    const ranks: Rank[] = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const deck: BaseCard[] = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({
          suit,
          rank,
          id: `${suit}-${rank}-${initialState._cardIdCounter++}`,
        });
      }
    }

    // デッキをシャッフル
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // デッキを初期状態にセット
    initialState.layouts.deck.cards = deck;

    // 初期配布 (5枚に戻す)
    for (let i = 0; i < 5; i++) {
      if (initialState.layouts.deck.cards.length > 0) {
        const card = initialState.layouts.deck.cards.pop()!;
        (card as GameCard).faceUp = true;
        initialState.layouts.hand.cards.push(card as GameCard);
      }
    }

    // 各階層にカードを配る (変更: 各4枚)
    const levelDistribution = {
      level1: 4,
      level2: 4,
      level3: 4,
      level4: 4,
    };
    for (const [level, count] of Object.entries(levelDistribution)) {
      for (let i = 0; i < count; i++) {
        if (initialState.layouts.deck.cards.length > 0) {
          const card = initialState.layouts.deck.cards.pop()!;
          (card as GameCard).faceUp = false;
          initialState.layouts[level].cards.push(card as GameCard);
        }
      }
    }

    return initialState;
  },

  getAvailableActions: (state: GameState): GameAction[] => {
    const actions: GameAction[] = [];
    const handCards = state.layouts.hand.cards;
    const levelLayoutIds = ["level1", "level2", "level3", "level4"];

    // 1. 探索アクション (Explore) - 右端の裏向きカードのみ対象
    // 手札が1枚以上ないと探索コストを払えない
    if (handCards.length > 0) {
      for (const layoutId of levelLayoutIds) {
        const layout = state.layouts[layoutId];
        // 階層にカードがなければスキップ
        if (layout.cards.length === 0) continue;

        // 右端のカードを取得
        const rightmostCard = layout.cards[layout.cards.length - 1];

        // 右端のカードが裏向きの場合のみ探索可能
        if (!rightmostCard.faceUp) {
          // どの手札をコストにするか
          for (const costCard of handCards) {
            actions.push({
              type: "explore",
              layoutId: "hand",
              cardId: costCard.id, // コストとして使う手札
              targetLayoutId: layoutId,
              targetCardId: rightmostCard.id, // 右端のカードを対象
              params: {
                $cardId: costCard.id,
                $targetLayoutId: layoutId,
                $targetCardId: rightmostCard.id,
              },
            });
          }
        }
      }
    }

    // 2. 討伐アクション (Subdue)
    for (const layoutId of levelLayoutIds) {
      const layout = state.layouts[layoutId];
      for (const targetCard of layout.cards) {
        // 表向きのカードのみ討伐可能
        if (targetCard.faceUp) {
          // このターゲットを討伐できる手札を探す
          for (const challengeCard of handCards) {
            if (canSubdue(challengeCard, targetCard, layoutId)) {
              actions.push({
                type: "subdue",
                layoutId: "hand",
                cardId: challengeCard.id, // 挑戦に使う手札
                targetLayoutId: layoutId,
                targetCardId: targetCard.id,
                params: {
                  $cardId: challengeCard.id,
                  $targetLayoutId: layoutId,
                  $targetCardId: targetCard.id,
                },
              });
            }
          }
        }
      }
    }

    // 3. 階層クリア報酬アクション (Clear Level)
    for (const layoutId of levelLayoutIds) {
      const layout = state.layouts[layoutId];
      const metadata = layout.metadata || {};
      if (layout.cards.length === 0 && metadata.cleared !== true) {
        actions.push({
          type: "clearLevel",
          layoutId,
          params: { $layoutId: layoutId },
        });
      }
    }

    return actions;
  },

  applyAction: (state: GameState, action: GameAction): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
      case "explore": {
        // New Explore action
        const { cardId, targetLayoutId, targetCardId } = action;
        if (!cardId || !targetLayoutId || !targetCardId) return newState;

        // 1. コストカードを手札から探す
        const handLayout = newState.layouts.hand;
        const costCardIndex = handLayout.cards.findIndex(
          (c) => c.id === cardId
        );
        if (costCardIndex === -1) return newState; // Cost card not found
        const costCard = handLayout.cards[costCardIndex];

        // 2. ターゲットカードを階層から探す (裏向きのはず)
        const targetLayout = newState.layouts[targetLayoutId];
        const targetCardIndex = targetLayout.cards.findIndex(
          (c) => c.id === targetCardId
        );
        if (
          targetCardIndex === -1 ||
          targetLayout.cards[targetCardIndex].faceUp
        ) {
          console.warn(
            "Explore target invalid or already face up:",
            targetCardId
          );
          return newState; // Target not found or already face up
        }
        const targetCard = targetLayout.cards[targetCardIndex];

        // 3. コストカードを捨て札に移動
        handLayout.cards.splice(costCardIndex, 1);
        newState.layouts.discard.cards.push(costCard);

        // 4. ターゲットカードを表向きにする
        targetCard.faceUp = true;

        return newState;
      }

      case "subdue": {
        // New Subdue action
        const { cardId, targetLayoutId, targetCardId } = action;
        if (!cardId || !targetLayoutId || !targetCardId) return newState;

        // 1. 挑戦カードを手札から探す
        const handLayout = newState.layouts.hand;
        const challengeCardIndex = handLayout.cards.findIndex(
          (c) => c.id === cardId
        );
        if (challengeCardIndex === -1) return newState; // Challenge card not found
        const challengeCard = handLayout.cards[challengeCardIndex];

        // 2. ターゲットカードを階層から探す (表向きのはず)
        const targetLayout = newState.layouts[targetLayoutId];
        const targetCardIndex = targetLayout.cards.findIndex(
          (c) => c.id === targetCardId
        );
        if (
          targetCardIndex === -1 ||
          !targetLayout.cards[targetCardIndex].faceUp
        ) {
          console.warn("Subdue target invalid or not face up:", targetCardId);
          return newState; // Target not found or not face up
        }
        const targetCard = targetLayout.cards[targetCardIndex];

        // 3. 成功判定 (getAvailableActions で保証されているはずだが念のため)
        if (!canSubdue(challengeCard, targetCard, targetLayoutId)) {
          console.warn("Attempted subdue action that should not be possible.");
          return newState; // Should not happen if getAvailableActions is correct
        }

        // 4. ターゲットカードを手札に移動 (変更)
        targetLayout.cards.splice(targetCardIndex, 1);
        targetCard.faceUp = true; // 手札では常に表向き
        newState.layouts.hand.cards.push(targetCard); // cleared -> hand

        // 5. 挑戦カードを手札から捨て札に移動
        handLayout.cards.splice(challengeCardIndex, 1);
        newState.layouts.discard.cards.push(challengeCard);

        // 6. 特殊効果の適用
        // 特殊効果: ハートの挑戦カードを使った場合、山札から2枚ドロー
        if (
          challengeCard.suit === "HEART" &&
          newState.layouts.deck.cards.length > 0
        ) {
          for (let i = 0; i < 2; i++) {
            if (newState.layouts.deck.cards.length > 0) {
              const newCard = newState.layouts.deck.cards.pop()!;
              newCard.faceUp = true;
              newState.layouts.hand.cards.push(newCard);
            }
          }
        }
        // 特殊効果: ダイヤのターゲットカードをクリアした場合、山札から2枚ドロー
        if (
          targetCard.suit === "DIAMOND" &&
          newState.layouts.deck.cards.length > 0
        ) {
          for (let i = 0; i < 2; i++) {
            if (newState.layouts.deck.cards.length > 0) {
              const newCard = newState.layouts.deck.cards.pop()!;
              newCard.faceUp = true;
              newState.layouts.hand.cards.push(newCard);
            }
          }
        }

        return newState;
      }

      case "clearLevel": {
        // (No changes needed for clearLevel)
        const { layoutId } = action;
        if (!layoutId) return newState;

        if (!newState.layouts[layoutId].metadata) {
          newState.layouts[layoutId].metadata = {};
        }
        newState.layouts[layoutId].metadata!.cleared = true;

        // ドロー枚数を一律2枚に変更
        const drawCount = 2;

        for (let i = 0; i < drawCount; i++) {
          if (newState.layouts.deck.cards.length > 0) {
            const card = newState.layouts.deck.cards.pop()!;
            (card as GameCard).faceUp = true;
            newState.layouts.hand.cards.push(card as GameCard);
          }
        }
        return newState;
      }

      default:
        console.warn(`Unhandled action type: ${(action as any).type}`);
        return newState;
    }
  },

  checkGameEnd: (
    state: GameState,
    history?: GameAction[]
  ): { status: "WIN" | "LOSE" | "ONGOING"; reason?: string } => {
    // ゲーム終了条件の判定

    // すべての階層をクリアした場合
    const allLevelsCleared =
      state.layouts.level1.cards.length === 0 &&
      state.layouts.level2.cards.length === 0 &&
      state.layouts.level3.cards.length === 0 &&
      state.layouts.level4.cards.length === 0;

    if (allLevelsCleared) {
      return { status: "WIN" };
    }

    // 利用可能なアクションがない場合 (新しい敗北条件)
    const availableActions = DungeonDelver.getAvailableActions(state);
    if (availableActions.length === 0) {
      // かつ、手札も山札も空の場合 (詰み)
      if (
        state.layouts.hand.cards.length === 0 &&
        state.layouts.deck.cards.length === 0
      ) {
        return { status: "LOSE", reason: "リソース切れで行動不能" };
      } else {
        // アクションはないが、リソースは残っている -> 描画などの都合で ONGOING のまま？
        // いや、ルール上は詰んでいるはず。アクションがない = 負けで良いはず。
        return { status: "LOSE", reason: "行動不能" };
      }
    }

    // それ以外は継続中
    return { status: "ONGOING" };
  },
};

export default DungeonDelver;

# トランプゲームルール記述ライブラリ 仕様書 (TypeScript 版)

## 1. はじめに

### 1.1. 目的

このライブラリは、主に一人用トランプゲーム（ソリティア等）を中心とした様々なカードゲームのルールを、宣言的かつ厳密に記述するための仕様を提供します。TypeScript の型システムを活用し、ルールの整合性を高めます。LLM（大規模言語モデル）がこの仕様に基づいて新しいゲームの定義を生成し、そのルールがシミュレーションや自動テスト、AI によるプレイが可能な形で実行されることを目指します。

### 1.2. 設計思想

- **型安全:** ゲームのルールは、TypeScript を用いたソースコードで記述します。
- **厳密性:** ルールや状態の定義は曖昧さを排除し、型システムとライブラリによる一意な解釈・実行を可能にします。
- **UI 分離:** ゲームの純粋なロジックに特化し、UI 関連の情報は含みません。

## 2. 基本的な型定義

ゲーム定義の中核となる TypeScript の型を以下に示します。

### 2.1. カード表現

標準的なトランプカードを表現します。

```typescript
type Suit = "SPADE" | "HEART" | "DIAMOND" | "CLUB";
type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

interface Card {
  suit: Suit;
  rank: Rank;
  id: string; // 各カードインスタンスを区別するための一意なID
}
```

### 2.2. ゲーム状態 (`GameState`)

ゲームの特定の瞬間における状態を表します。ゲームごとに固有のプロパティを持つことになります。

```typescript
interface GameState {
  // 例: シンプルマッチに必要な状態
  deck: Card[]; // 山札
  discardPile: Card[]; // 場札（捨て札）の一番上のみが意味を持つ場合が多い
  hand: Card[]; // 手札
  // 他のゲームでは、場札が複数列ある、スコアがある、などの状態が追加される
}
```

### 2.3. アクション (`Action`)

プレイヤーが実行可能なアクションを表します。アクションの種類と、それに付随する情報（どのカードを移動するかなど）を含みます。

```typescript
interface Action {
  type: string; // アクションの種類を示す識別子 (例: 'DRAW_CARD', 'PLAY_FROM_HAND')
  payload?: any; // アクションに必要な追加情報 (例: { cardId: '...' })
}
```

### 2.4. ゲーム定義 (`GameDefinition`)

ゲーム全体のルールとロジックを定義します。

```typescript
interface GameDefinition<State extends GameState, Act extends Action> {
  /**
   * ゲームの初期状態を生成します。
   * @param seed 乱数生成のためのシード（任意）
   * @returns 初期状態オブジェクト
   */
  setupGame: (seed?: string) => State;

  /**
   * 特定の状態において、プレイヤーが実行可能なすべてのアクションをリストアップします。
   * @param state 現在のゲーム状態
   * @returns 実行可能なアクションの配列
   */
  getAvailableActions: (state: State) => Act[];

  /**
   * 特定のアクションを現在の状態に適用し、新しい状態を返します。
   * ルールの妥当性チェックもここで行います。無効なアクションの場合はエラーをスローするか、
   * 状態を変更せずに返すことを想定します。
   * @param state 現在のゲーム状態
   * @param action 適用するアクション
   * @returns 新しいゲーム状態
   */
  applyAction: (state: State, action: Act) => State;

  /**
   * ゲームが終了したかどうか、およびその結果（勝利/敗北/進行中）を判定します。
   * @param state 現在のゲーム状態
   * @param history 過去のアクション履歴（オプション、ループ検出などに使用可能）
   * @returns ゲームの終了状態 ('WIN', 'LOSE', 'ONGOING') と、敗北理由 (任意)
   */
  checkGameEnd: (
    state: State,
    history?: Act[]
  ) => { status: "WIN" | "LOSE" | "ONGOING"; reason?: string };

  // オプション: ゲーム固有のヘルパー関数や設定など
  // 例: getCardValue(card: Card): number;
}
```

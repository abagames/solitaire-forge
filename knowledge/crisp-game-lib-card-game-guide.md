# Crisp Game Lib を使ったカードゲーム実装ガイド (Cartographer's Expedition 実装例より)

このドキュメントは、`crisp-game-lib` を使用してブラウザベースのカードゲームを実装する際の基本的な手順とテクニックをまとめたものです。主に「Cartographer's Expedition」の実装過程で得られた知見に基づいています。

## 1. プロジェクトセットアップ

### 1.1. Vite の導入 (推奨)

**(注: 既に Vite が導入済みのプロジェクトでは、このセクションはスキップしてください)**

- 高速な開発サーバーとビルドプロセスを提供します。
- `package.json` に `vite` を開発依存関係として追加します (`npm install vite --save-dev`)。
- `scripts` に開発サーバー起動コマンドとビルドコマンドを設定します。

  - **方法 A: コマンド引数でディレクトリ指定:**

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

  - **方法 B: `vite.config.js` (または `.ts`) で設定 (推奨):**
    プロジェクトルートに設定ファイルを作成します。こちらの方がより詳細な設定が可能です。

    ```javascript
    // vite.config.js 例
    import { defineConfig } from "vite";

    export default defineConfig({
      root: "src/games/your-game-name", // HTMLファイルがあるディレクトリ
      // publicDir: 'public', // 静的ファイルがあるディレクトリ (rootからの相対パス)
      build: {
        // 出力先をプロジェクトルートからの相対パスで指定
        outDir: "../../dist/your-game-name",
        emptyOutDir: true, // ビルド時に出力先を空にする
      },
      server: {
        // open: true, // サーバー起動時に自動でブラウザを開く
      },
    });
    ```

    `vite.config.js` を使用する場合、`package.json` の `scripts` は引数なしで記述します。

    ```json
    // package.json (vite.config.js 使用時)
    {
      "scripts": {
        "dev": "vite",
        "build": "vite build"
      }
      // ...
    }
    ```

### 1.2. HTML ファイル (`index.html`)

- 非常にシンプルです。
- `crisp-game-lib` を利用するメインの TypeScript ファイル (`main.ts` など) を `<script type="module">` で読み込みます。
- `body` は空でも構いません (ライブラリが Canvas を生成します)。

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

## 2. Crisp Game Lib の初期化 (`main.ts`)

### 2.1. `init` 関数の呼び出し

- ゲームのエントリーポイントです。
- `update` 関数、文字定義 (`characters`)、各種オプション (`options`) を渡します。

  ```typescript
  // main.ts
  import "crisp-game-lib";
  import { characters } from "../../utils/view.ts"; // 文字定義を別ファイルから読み込み
  import { update } from "./update"; // update関数を別ファイルにすることも可

  init({
    update, // 毎フレーム呼ばれる関数
    characters, // 使用する文字・図形のパターン
    options: {
      // ゲーム固有のオプション設定
      viewSize: { x: 70, y: 130 }, // 画面サイズ
      isShowingScore: false, // スコア表示の有無
      isSoundEnabled: false, // サウンドの有無
      // isUsingSmallText: true, // 全体のテキストを小さくする場合 (v1.3.0時点では text() オプションで指定)
      // theme: "pixel", // テーマの指定
    },
  });
  ```

### 2.2. `update` 関数

- ゲームのメインループです。毎フレーム呼び出されます。
- 主な役割（実行順）:
  - ゲーム状態の初期化 (初回フレームまたはリトライ時)
  - **チュートリアル状態の更新** (ステップ変更検知)
  - プレイヤー入力の処理
  - ゲームロジックの更新 (アクション適用など)
  - ゲーム終了判定
  - 画面描画
- **状態変数:** `update` 関数のスコープ外（モジュールスコープ）で、ゲームの状態 (`gameState`)、プレイヤーの選択状態 (`selectedHandIndex`, `selectedSourceCell`)、ゲーム進行ステータス (`gameStatus`, `gameOverReason`)、チュートリアル状態 (`tutorialStep`, `previousTutorialStep` など) を保持する変数を定義します。

  ```typescript
  // main.ts (module scope)
  import { ExpeditionState } from "./game.ts";
  import { SpeechBubbleView } from "../../utils/view.ts";

  let gameState: ExpeditionState | null = null;
  let selectedHandIndex: number | null = null;
  let selectedSourceCell: { r: number; c: number } | null = null;
  let gameStatus: "ONGOING" | "WIN" | "LOSE" = "ONGOING";
  let gameOverReason: string | null = null;
  type TutorialStep = /*...*/ | "OFF";
  let tutorialStep: TutorialStep = 1;
  let previousTutorialStep: TutorialStep | null = null;
  let tutorialBubble: SpeechBubbleView | null = null;
  let shownTutorialStepsThisSession: Set<TutorialStep> = new Set();

  function update() {
    // 1. 初期化 (gameState === null の場合)
    if (!gameState) {
      gameState = /*...*/;
      selectedHandIndex = null;
      // ... 他の状態リセット ...
      tutorialStep = 1;
      previousTutorialStep = null;
      shownTutorialStepsThisSession.clear();
      // ... tutorialBubble の初期化 ...
    }

    // 2. チュートリアル更新 (変更検知)
    if (tutorialStep !== previousTutorialStep && tutorialBubble) {
      updateTutorialBubble(/*...*/);
      previousTutorialStep = tutorialStep;
    }

    // 3. 入力処理 (gameStatus === "ONGOING" の場合)
    if (gameStatus === "ONGOING" && input.isJustPressed) {
      // ... クリック判定、状態更新、アクション実行 ...
      // tutorialStep もここで更新される場合がある
    } else if (gameStatus !== "ONGOING" && input.isJustPressed) {
      // ゲーム終了後のリトライ処理
      gameState = null; // 次フレームで初期化へ
    }

    // 4. 描画 (gameState が存在する場合)
    if (gameState) {
      // ... 盤面、手札、情報、アイコン、吹き出し、終了メッセージ描画 ...
    } else {
      // ローディング表示など
    }

    // 5. チュートリアルステップ遷移 (フレームの最後)
    if (tutorialStep === 5 || tutorialStep === 6) {
       tutorialStep = 1; // この変更は次フレームの変更検知で処理される
    }
  }
  ```

### 2.3. 文字・図形定義 (`view.ts` など)

- `crisp-game-lib` は ASCII アートライクな文字パターンで図形を描画します。
- カードのスート、ランク、アイコンなどを定義した `characters` 配列を `init` に渡します。
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
  `, // 'a': スペードなど
    // ... 他のスート、ランク('f'を10にするなど)、アイコン('g'をゴミ箱にするなど)
  ];
  ```

## 3. ゲームロジックの分離 (`game.ts`)

- 描画や入力処理と、ゲームのルール・状態管理を分離するとコードの見通しが良くなります。

### 3.1. 型定義 (`types.ts` も利用)

- **ゲーム状態 (State):** ゲームの状況を表すデータ構造を定義します (例: `ExpeditionState`)。盤面、手札、山札、進行状況などを含みます。

  ```typescript
  // src/types.ts
  export type Suit = "SPADE" | "HEART" | "DIAMOND" | "CLUB";
  export type Rank = "A" | "2" | /*...*/ | "K";
  export interface Card { suit: Suit; rank: Rank; id: string; }
  export interface BaseGameState { /* ... */ }

  // src/games/your-game-name/game.ts
  import { BaseGameState, Card } from "../../types.ts";
  export interface YourGameState extends BaseGameState {
    grid: (Card & { faceUp: boolean } | null)[][];
    hand: Card[];
    drawPile: Card[];
    discardPile: Card[];
    // ... その他ゲーム固有の状態
  }
  ```

- **アクション (Action):** プレイヤーが実行可能な操作を型として定義します (例: `ExpeditionAction`)。識別用の `type` と、詳細情報を持つ `payload` を含むことが多いです。
  ```typescript
  // src/games/your-game-name/game.ts
  import { BaseAction } from "../../types.ts";
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

### 3.2. ゲーム定義オブジェクト (`GameDefinition`)

- ゲームのルールを関数としてまとめたオブジェクトを作成します。

  ```typescript
  // src/games/your-game-name/game.ts
  import { GameDefinition } from "../../types.ts";

  export const YourGame: GameDefinition<YourGameState, YourGameAction> = {
    gameId: "your_game_id",
    gameName: "Your Game Name",

    setupGame: (seed?: string): YourGameState => {
      // デッキ作成、シャッフル、盤面・手札への配置など
      // ...
      return initialState;
    },

    applyAction: (
      state: YourGameState,
      action: YourGameAction
    ): YourGameState => {
      // state を直接変更せず、新しい state オブジェクトを返す (Immutability: 不変性)
      // 理由:
      // - 意図しない副作用を防ぐ
      // - 状態変更が追跡しやすくなりデバッグが容易になる
      // - 将来的に状態履歴管理 (Undo/Redo) を実装しやすくなる
      const newState = {
        ...state,
        // 注意: ネストされたオブジェクトや配列は別途ディープコピーが必要な場合がある
        grid: state.grid.map((row) => [...row]), // 例: 2次元配列のディープコピー
        hand: [...state.hand], // 配列のシャローコピー
      };

      if (action.type === "revealAdjacent") {
        // payload を元にカードを公開、手札を捨てて補充など
        // ★ 手札補充は splice を使い、元の index に挿入すると UX が良い
        // newState.hand.splice(handIndex, 0, newCard);
      } else if (action.type === "discardAndDraw") {
        // payload を元に手札を捨てて補充
        // ★ 手札補充は splice を使い、元の index に挿入する
        // newState.hand.splice(handIndex, 0, newCard);
      }
      // ...
      return newState;
    },

    checkGameEnd: (
      state: YourGameState
    ): { status: "WIN" | "LOSE" | "ONGOING"; reason?: string } => {
      // 勝利条件、敗北条件をチェックして結果を返す
      // この結果を main.ts の gameStatus, gameOverReason に反映させる
      // ...
      return { status: "ONGOING" };
    },

    getAvailableActions: (state: YourGameState): YourGameAction[] => {
      // (オプション) 現在の状態で実行可能な全てのアクションをリストアップする
      // AI実装やヒント表示に利用できる
      // ...
      return [];
    },
  };
  ```

## 4. 描画の実装 (`main.ts`, `view.ts`)

### 4.1. ビューコンポーネント (`CardView` など)

- 特定の要素（カードなど）の描画ロジックをクラスにまとめると再利用性が高まります。

  ```typescript
  // src/utils/view.ts
  export class CardView {
    pos: Vector;
    size = vec(9, 16); // カードサイズ
    rank: number;
    suit: "spade" | "heart" | "diamond" | "club";
    isFaceUp: boolean;
    isHighlighted: boolean; // ハイライト状態

    constructor() {
      /* ... */
    }

    getRankDisplayString(): string {
      /* A, K, Q, J, f(10) などの変換 */
    }

    draw() {
      if (!this.isVisible) return;
      // 背景描画 (rect)
      // テキスト描画 (text)
      // 尻尾描画 (line) - tailDirection が 'none' でない場合
    }
  }
  ```

### 4.2. `update` 関数での描画

- ゲーム状態 (`gameState`) に基づいて、各要素を描画します。
- **盤面:** `gameState.grid` をループし、各セルに対して `CardView` インスタンスを作成・設定して `draw()` を呼び出します。
- **手札:** `gameState.hand` をループし、同様に `CardView` を使って描画します。
- **情報:** 山札枚数 (`gameState.drawPile.length`)、ランドマーク数 (`gameState.revealedLandmarks`) などを `text()` で描画します。
  - `text()` の第 4 引数オプションで `{ isSmallText: true, color: "...", backgroundColor: "..." }` などを指定できます。
- **アイコン:** ゴミ箱など、インタラクティブな要素を `char()` で描画します。クリック可能状態を示すために色を変えるなどの工夫も有効です。
- **ハイライト:** 選択中の手札や起点カードに対応する `CardView` インスタンスの `isHighlighted` プロパティを `true` に設定してから `draw()` を呼び出します。
- **ゲーム終了画面:** `gameStatus` が "WIN" または "LOSE" の場合、`text()` で結果を表示します。背景色を指定すると見やすくなります。
- **チュートリアル吹き出し:** `updateTutorialBubble` によって表示状態 (`isVisible`) が管理されている `tutorialBubble` を `draw()` します。

## 5. プレイヤー入力処理 (`main.ts`)

- `update` 関数の冒頭 (描画前) で処理するのが一般的です。
- **ゲーム進行中のみ** 処理 (`if (gameStatus === "ONGOING")`) するようにします。

### 5.1. クリック検出

- `if (input.isJustPressed)` でクリック（タップ）されたフレームを検出します。
- `const clickPos = input.pos;` でクリック座標 (Vector) を取得します。

### 5.2. 要素判定

- クリック座標 (`clickPos`) が、描画されている各要素 (カード、アイコンなど) の矩形範囲内にあるか `clickPos.isInRect(x, y, width, height)` で判定します。
  - `isInRect` は要素の**左上座標**と幅・高さを引数に取ります。`CardView` のように中心座標 (`pos`) で管理している場合は、左上座標への変換が必要です。
  - アイコン (`char`) の場合は、文字の中心座標 (`DISCARD_ICON_X`, `DISCARD_ICON_Y`) と、想定される文字の幅/高さ (`DISCARD_ICON_WIDTH/HEIGHT`) から矩形を計算します。

### 5.3. 状態管理と選択ロジック

- **優先順位:** クリック判定は、具体的なアクションにつながる要素（ゴミ箱アイコン、ターゲットカード）から行い、次に選択要素（手札、起点カード）、最後に背景クリックの順で行うと、意図しない動作を防ぎやすくなります。
- **要素クリックフラグ:** 要素（カード、アイコン）がクリックされたかどうかを示すフラグ (`clickedOnElement`) を用意し、背景クリック処理と区別します。
- **選択状態変数:** どの要素が選択されているかを保持する変数を用意します (例: `selectedHandIndex: number | null`, `selectedSourceCell: { r: number; c: number } | null`)。
- **選択/解除:** 要素がクリックされたら、対応する選択状態変数を更新します。
  - 既に選択されている要素を再度クリックしたら選択解除 (`null` に戻す) するトグル動作にすると便利です。
  - どの要素もクリックされなかった場合（背景クリック）は、全ての選択状態を解除 (`null` にする) すると誤操作を防げます。
  - **チュートリアル連携:** カード選択などのタイミングで、`tutorialStep` を更新します。必要に応じて、特定の選択が可能か（例: `canSelectHandForSource()`）をチェックしてチュートリアルの分岐を行うこともあります。

### 5.4. アクション実行

- **優先順位:** ターゲット選択 (カード公開) や手札交換など、最終的なアクション実行の判定を先に行います。
- **カード公開 (`revealAdjacent`):**
  - `selectedHandIndex` と `selectedSourceCell` が両方選択されている状態で、
  - 盤面の裏向きカードがクリックされ、
  - それが `selectedSourceCell` に隣接しており、
  - 手札と起点カードの組み合わせがルール上有効 (ランク or スート一致) であれば、
  - `{ type: "revealAdjacent", payload: { ... } }` アクションを作成し、`applyAction(gameState, action)` を呼び出して `gameState` を更新します。
  - アクション実行後は選択状態をリセット (`null`) します。
- **手札交換 (`discardAndDraw`):**
  - ゴミ箱アイコンなどがクリックされ、
  - `selectedHandIndex` が選択されており、
  - 山札 (`gameState.drawPile`) が空でなければ、
  - `{ type: "discardAndDraw", payload: { handIndex: selectedHandIndex } }` アクションを作成し、`applyAction` を呼び出します。
  - アクション実行後は選択状態をリセットします。
- アクションが実行されたかどうかを示すフラグ (`actionTaken`) を管理し、アクションが実行されたフレームでは、後続の選択ロジック (手札/起点カード選択) をスキップするように制御します。

### 5.5. ゲーム終了チェック

- アクションが実行された (`actionTaken === true`) 直後に、`CartographersExpedition.checkGameEnd(gameState)` を呼び出します。
- 結果が "ONGOING" でなければ、`gameStatus` と `gameOverReason` を更新します。

## 6. チュートリアル実装 (Cartographer's Expedition 例)

ゲームの操作方法をプレイヤーに段階的に教えるチュートリアル機能の実装例です。

### 6.1. 状態変数

- `tutorialStep`: 現在のチュートリアルの段階を示す変数 (`1 | 2 | ... | "OFF"`)。
- `previousTutorialStep`: 前フレームの `tutorialStep` を保持し、変更を検知するために使用します。
- `tutorialBubble`: `SpeechBubbleView` のインスタンスを保持します。
- `shownTutorialStepsThisSession`: `Set<TutorialStep>` で、現在のゲームセッションで既に表示したステップを記録します。これにより、同じステップのメッセージが何度も表示されるのを防ぎます。

### 6.2. チュートリアルビュー (`SpeechBubbleView`)

- 吹き出しの表示を担当するビュークラス (Section 4.1 参照)。
- テキスト、位置、尻尾の向きなどを設定し、表示/非表示を制御するメソッド (`setText`, `setTail`, `show`, `hide`, `draw`) を持ちます。
- `setTail` メソッドやコンストラクタオプションで、尻尾の向き (`tailDirection`) に `"none"` を指定することで、尻尾なしの吹き出しを表示することも可能です。

### 6.3. 更新ロジック (`updateTutorialBubble`)

- `tutorialStep` が変更された**ときのみ** `update()` 関数から呼び出される関数。
- 引数として `currentStep`, `shownSteps`, `bubble` を受け取ります。
- `currentStep` が `"OFF"` なら `bubble.hide()` して終了します。
- `shownSteps.has(currentStep)` をチェックします。
  - **未表示 (`false`) の場合:**
    - `bubble.setText()` でメッセージを設定します。
    - `bubble.pos.set()`, `bubble.setTail()` で位置と尻尾を設定します。
    - `bubble.show()` で表示状態にします。
    - `shownSteps.add(currentStep)` で表示済みとして記録します。
  - **表示済み (`true`) の場合:**
    - `bubble.hide()` を呼び出します。これにより、一度表示したステップに状態が戻ってきた場合に、吹き出しが非表示になり、「二度表示しない」仕様を実現します。

### 6.4. `update` 関数への統合

- **初期化:** ゲーム開始/リトライ時に `tutorialStep = 1`, `previousTutorialStep = null`, `shownTutorialStepsThisSession.clear()` を実行し、`tutorialBubble` を (なければ) new します。
- **変更検知:** `update()` の入力処理前に `if (tutorialStep !== previousTutorialStep)` をチェックし、変更があれば `updateTutorialBubble()` を呼び出し、`previousTutorialStep = tutorialStep` で状態を更新します。
- **ステップ更新:** プレイヤーの入力処理 (`input.isJustPressed` ブロック内) で、特定の操作（起点選択、手札選択、アクション実行）に応じて `tutorialStep` を適切な値に更新します。
  - 必要に応じて、補助関数 (`canSelectHandForSource` など) を使って次のステップを決定します。
- **描画:** 描画処理の最後の方で `tutorialBubble.draw()` を呼び出します。表示/非表示は `updateTutorialBubble` 内で制御された `isVisible` フラグに依存します。
- **ステップ遷移:** 特定のステップ（例: アクション完了を示すステップ 5, 6）の後、次の基本ステップ（例: ステップ 1）に戻る場合、`update()` 関数の**最後**で `tutorialStep` を更新します。これにより、そのフレームでは完了メッセージが表示され、次のフレームでステップ 1 の処理（変更検知 → `updateTutorialBubble` → 非表示）が行われます。
- **ゲーム終了時:** `checkGameEnd` でゲーム終了が検出されたら、`tutorialStep = "OFF"` を設定します。次のフレームの変更検知で吹き出しが `hide()` されます。

## 7. その他 (旧 Section 6)

- **定数:** カードサイズ、グリッド開始位置、情報表示位置などを定数として定義しておくと、レイアウト調整が容易になります。
- **デバッグ:** `console.log` でクリック座標、選択状態、アクション実行などを出力するとデバッグが捗ります。
- **ヘルパー関数:** 特定の条件チェック（例: `canSelectHandForSource`）や計算ロジックを `update` 関数外のヘルパー関数として切り出すと、`update` 関数本体が読みやすくなります。

**`crisp-game-lib` ユーティリティ:** ライブラリが提供する以下の様な関数も活用できます。

- `vec(x, y)`: Vector オブジェクトを作成します。
- `addWithCharCode(char, offset)`: 文字コードを基準にオフセットを加えた文字を取得します (例: `addWithCharCode('a', 1)` は `'b'` を返します)。 スプライトシートのように文字を使う場合に便利です。
- `clamp(value, min, max)`: 値を指定された範囲内に収めます。
- `range(count)`: 0 から `count-1` までの数値の配列を生成します。
- `rnd(minOrMax, max)`: 乱数を生成します。

このガイドが、`crisp-game-lib` を用いたカードゲーム開発の一助となれば幸いです。

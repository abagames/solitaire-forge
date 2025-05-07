# Crisp Game Lib ゲームのテストガイド (Jest と Cartographer's Expedition 実装例より)

このドキュメントは、`crisp-game-lib` を使用して開発されたブラウザベースのカードゲーム（または同様のインタラクションを持つゲーム）のテスト戦略と具体的なテストケースの作成方法について解説します。主に「Cartographer's Expedition」のテスト実装 (`test/games/cartographers-expedition/main.test.ts`) で得られた知見に基づいています。

## 1. はじめに

### 1.1. テストの重要性

ソフトウェア開発においてテストは不可欠です。特にゲーム開発では、多様なインタラクションや状態遷移が存在するため、手動テストだけでは網羅的な品質保証が困難です。自動テストを導入することで、以下のメリットが得られます。

- **バグの早期発見:** コード変更時に既存機能が壊れていないか（リグレッション）を迅速に検出できます。
- **リファクタリングの安心感:** テストに保護されていれば、コード改善を自信を持って進められます。
- **仕様の明確化:** テストケース自体が、コンポーネントや関数の期待される動作を記述するドキュメントの役割も果たします。
- **開発効率の向上:** 手動での繰り返し確認作業を削減できます。

### 1.2. Jest と ts-jest の導入

このガイドでは、JavaScript/TypeScript のテスティングフレームワークである [Jest](https://jestjs.io/) を使用します。TypeScript プロジェクトで Jest を利用するためには、`ts-jest` というプリセット（トランスパイラ）が必要です。

これらのセットアップは、`crisp-game-lib-card-game-guide.md` のプロジェクトセットアップと並行して行うことを想定しています。

**主なインストールパッケージ:**

```bash
npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom
```

- `jest`: Jest 本体。
- `@types/jest`: Jest の型定義。
- `ts-jest`: TypeScript を Jest で実行可能にするためのプリセット。
- `jest-environment-jsdom`: ブラウザ環境 (DOM API など) をシミュレートする Jest 環境。`crisp-game-lib` はブラウザ環境を前提とするため、通常必要です。

### 1.3. モックの役割

`crisp-game-lib` は、グローバル関数 (`play`, `input`, `text` など) や DOM 操作に依存しています。Jest のテスト環境 (Node.js ベース) でこれらをそのまま実行しようとするとエラーになります。また、テスト対象のユニット（関数やモジュール）を隔離し、外部依存性を排除するためにもモックは重要です。

このガイドでは、`crisp-game-lib` 全体をモックする方法を後述します。

## 2. テスト戦略

### 2.1. ユニットテスト vs 統合テスト

- **ユニットテスト:** 関数やモジュールなど、コードの最小単位を個別にテストします。外部依存はモックで置き換えます。このガイドでは主にユニットテストに焦点を当てます。
- **統合テスト:** 複数のユニットを組み合わせて、それらが連携して正しく動作するかをテストします。
- **E2E (End-to-End) テスト:** 実際のブラウザ環境でユーザー操作をシミュレートし、アプリケーション全体をテストします。

小規模な `crisp-game-lib` ゲームでは、ユニットテストで主要なロジックをカバーすることが費用対効果の高い戦略となることが多いです。

### 2.2. 何をテストすべきか？

ゲームの種類や複雑さによりますが、一般的に以下の要素がテスト対象となります。

- **ゲームコアロジック (`GameDefinition`):**
  - `setupGame`: 初期状態が正しく生成されるか。
  - `applyAction`: 各アクションが状態を正しく更新するか。不変性 (Immutability) が保たれているか。
  - `checkGameEnd`: 勝利/敗北/継続条件が正しく判定されるか。
  - `getAvailableActions` (オプション): 特定の状態で可能なアクションがリストアップされるか。
- **入力処理と状態変更 (`main.ts` のヘルパー関数など):**
  - プレイヤーのクリック入力（座標）に対して、意図した要素（カード、アイコン）が正しく判定されるか。
  - 選択状態 (`selectedHandIndex`, `selectedSourceCell` など) が適切に更新されるか。
  - 入力に応じて適切なアクションがトリガーされるか（`applyAction` が呼ばれるか）。
  - 無効な入力やエッジケースが適切に処理されるか（エラーサウンド再生、状態不変など）。
- **チュートリアルロジック:**
  - 特定のゲーム状態やプレイヤーのアクションに応じて、チュートリアルのステップが正しく遷移するか。
  - チュートリアルメッセージ (`SpeechBubbleView` の `setText` など) が期待通りに設定されるか。
  - 表示済みステップの管理 (`shownTutorialStepsThisSession`) が機能しているか。
- **(オプション) ビューコンポーネントの単体テスト:**
  - `CardView` や `SpeechBubbleView` などのカスタムビュークラスが、与えられた状態に基づいて正しくプロパティを設定したり、描画メソッド内で期待される `crisp-game-lib` の描画関数 (`text`, `rect`, `char` など) を呼び出したりするか。 (このガイドでは深入りしませんが、複雑なビューでは有効です)

## 3. Jest のセットアップと設定

### 3.1. `jest.config.js`

プロジェクトルートに `jest.config.js` (または `.ts`) を作成し、Jest の設定を行います。

```javascript
// jest.config.js (Cartographer's Expedition で使用している例)
export default {
  preset: "ts-jest/presets/default-esm", // ESM + TypeScript 用のプリセット
  testEnvironment: "jsdom", // ブラウザ環境をシミュレート
  transform: {
    "^.+\\.tsx?$": [
      // .ts または .tsx ファイルをトランスパイル
      "ts-jest",
      {
        useESM: true, // ESM を使用
      },
    ],
  },
  moduleNameMapper: {
    // `crisp-game-lib` のインポートをスタブファイルに差し替える
    "^crisp-game-lib$": "<rootDir>/test/manual-mocks/crisp-game-lib-stub.ts",
    // import文で `.js` 拡張子を解決するための設定 (プロジェクトの moduleResolution に依存)
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  // Nodeモジュールは基本的にトランスパイル対象外 (必要に応じて調整)
  transformIgnorePatterns: ["/node_modules/"],
};
```

**重要な設定項目:**

- `preset`: `ts-jest` のプリセットを指定します。ES Modules を使用している場合は `default-esm` 系を選択します。
- `testEnvironment`: `jsdom` を指定することで、`window` や `document` などのブラウザ API がテスト内で利用可能になります。
- `transform`: TypeScript ファイル (`.ts`, `.tsx`) を `ts-jest` でトランスパイルするように設定します。`useESM: true` は `package.json` で `"type": "module"` を指定している場合に重要です。
- `moduleNameMapper`: 特定のモジュールのインポートパスを別のファイル（通常はモックファイル）にマッピングします。`crisp-game-lib` をモックするために不可欠です。

### 3.2. `package.json` のテストスクリプト

`package.json` の `scripts` にテスト実行コマンドを定義します。

```json
// package.json
{
  "type": "module", // ESM を使用する場合
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
    // 特定のファイルを実行する場合: npm test -- test/path/to/file.test.ts
    // ウォッチモード: npm test -- --watch
  }
  // ...
}
```

- `"type": "module"`: プロジェクト全体で ES Modules を使用する場合に指定します。
- `node --experimental-vm-modules ...`: ESM を Jest で使用する際に必要な Node.js のフラグです。
- `npm test -- <path_to_file>`: 特定のテストファイルのみを実行する場合のコマンド例です。

## 4. `crisp-game-lib` のモック (`crisp-game-lib-stub.ts`)

前述の通り、`crisp-game-lib` はテスト環境でそのまま動作しないため、その機能を模倣するスタブ（モック）ファイルを作成します。

### 4.1. なぜモックが必要か

- **環境依存性の排除:** `crisp-game-lib` は内部で `document.createElement("canvas")` などの DOM 操作や、グローバルに `play`, `input` などの関数/オブジェクトを期待します。Node.js 環境にはこれらが存在しません。
- **テストの分離:** テスト対象のユニットが `crisp-game-lib` の特定の実装に依存せず、インターフェース（呼び出しシグネチャ）にのみ依存するようにします。
- **検証の容易化:** `crisp-game-lib` の関数が期待通りに呼び出されたか (`toHaveBeenCalledWith`) を Jest のモック機能で簡単に検証できます。

### 4.2. `moduleNameMapper` による差し替え

`jest.config.js` の `moduleNameMapper` で、`import "crisp-game-lib";` や `import * as cgl from "crisp-game-lib";` といったインポート文が、代わりに指定したスタブファイル (`<rootDir>/test/manual-mocks/crisp-game-lib-stub.ts` など) を読み込むようにします。

### 4.3. スタブファイルの実装例

```typescript
// test/manual-mocks/crisp-game-lib-stub.ts
import { jest } from "@jest/globals";

// 共通の Vector プロパティのモック
const commonVecProps = {
  set: jest.fn(),
  isInRect: jest.fn().mockReturnValue(false),
  // 必要に応じて他のメソッドも追加 (add, sub, mag など)
};

// --- 主要な関数/オブジェクトのモック ---
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
export const MOCK_COLOR_FN = jest.fn((name) => name); // 色名をそのまま返す実装例
export const MOCK_TEXT_FN = jest.fn();
export const MOCK_TITLE_FN = jest.fn();
export const MOCK_END_FN = jest.fn();
export const MOCK_CHAR_FN = jest.fn();
// ... 他に必要な関数 (rect, line, clamp, rnd, etc.)

// --- ビュークラスのモック ---
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
  // ... 他のプロパティやメソッド
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

// --- グローバルへの割り当て (crisp-game-lib が期待する動作) ---
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

// --- テストファイルから import * as cgl from "crisp-game-lib" で使えるようにエクスポート ---
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

export const __esModule = true; // ESM としてマーク
```

このスタブファイルは、ゲームが使用する `crisp-game-lib` の機能に応じて拡張していく必要があります。

## 5. テストケースの作成 (`*.test.ts`)

Jest のテストファイルは通常 `*.test.ts` (または `*.spec.ts`) という命名規則に従います。

### 5.1. Jest の基本 API

- `describe(name, fn)`: 関連するテストをグループ化します。ネストも可能です。
- `it(name, fn)` または `test(name, fn)`: 個々のテストケースを定義します。
- `beforeEach(fn)`: 各 `it` ブロックの実行前に毎回実行される処理を定義します (状態のリセットなど)。
- `afterEach(fn)`: 各 `it` ブロックの実行後に毎回実行される処理を定義します。
- `beforeAll(fn)`: `describe` ブロック内の全てのテストの前に一度だけ実行されます。
- `afterAll(fn)`: `describe` ブロック内の全てのテストの後に一度だけ実行されます。
- `expect(value)`: アサーション（期待値の検証）を開始します。多数のマッチャー (`.toBe()`, `.toEqual()`, `.toHaveBeenCalledWith()`, `.toThrow()` など) が利用可能です。

### 5.2. `main.ts` のテストを例に

`Cartographer's Expedition` の `test/games/cartographers-expedition/main.test.ts` を参考に、テスト構造のポイントを解説します。

#### 5.2.1. `import`

```typescript
// test/games/cartographers-expedition/main.test.ts
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import type { Rank, Suit, Card } from "../../../src/types.js";
import type {
  ExpeditionState,
  ExpeditionAction,
} from "../../../src/games/cartographers-expedition/definition.js";

// crisp-game-lib はスタブに差し替えられる
// @ts-expect-error TS7016 (スタブには完全な型定義がない場合がある)
import * as crispGameLibModule from "crisp-game-lib";
// GameDefinition の実体もモックする場合がある (後述)
import { CartographersExpedition as ActualCartographersExpedition } from "../../../src/games/cartographers-expedition/definition.js";

// テスト対象の関数や、テスト用のセッター/ゲッターをインポート
import {
  handleOngoingInput,
  // ... (テスト用ヘルパー関数: __TEST_ONLY_setGameState, getGameState, etc.)
  updateTutorialDisplay,
} from "../../../src/games/cartographers-expedition/main.js";
```

#### 5.2.2. `beforeEach` での準備

各テストケース (`it`) の実行前に、状態をクリーンにリセットし、必要なモックを設定します。

```typescript
describe("Cartographer's Expedition - Main Game Flow", () => {
  let testGridCardViews: any[][]; // モックされた CardView インスタンスの配列
  let testHandCardViews: any[];
  let testTutorialBubbleInstance: any; // モックされた SpeechBubbleView インスタンス
  let initialGameState: ExpeditionState; // 各テストで使用する初期ゲーム状態

  beforeEach(() => {
    jest.clearAllMocks(); // 全てのモック関数の呼び出し履歴をクリア

    // crisp-game-lib の入力状態リセット (スタブのプロパティを操作)
    if (crispGameLibModule && crispGameLibModule.input) {
      (crispGameLibModule.input as any).isJustPressed = false;
      (crispGameLibModule.input as any).pos = {
        x: 0,
        y: 0,
        ...commonVecPropsFromStub,
      };
    }
    // 特定のモック関数の実装を設定 (例: color が色名を返すように)
    (crispGameLibModule.color as jest.Mock).mockImplementation((name) => name);

    // GameDefinition の関数のモック (applyAction, checkGameEnd など)
    // これにより、テスト対象の main.ts ロジックが GameDefinition とどう連携するかを
    // コントロールしやすくなる。
    (ActualCartographersExpedition.applyAction as jest.Mock).mockClear();
    (ActualCartographersExpedition.checkGameEnd as jest.Mock)
      .mockClear()
      .mockReturnValue({ status: "ONGOING" }); // デフォルトの戻り値を設定

    // ゲーム状態の初期化 (main.ts 側でテスト用セッターを用意しておくと便利)
    initialGameState = {
      /* ... */
    };
    __TEST_ONLY_setGameState(initialGameState);
    __TEST_ONLY_setSelectedSourceCell(null);
    // ... 他の main.ts 内のモジュールスコープ変数のリセット

    // モックされたビューインスタンスの準備
    // (CardView や SpeechBubbleView のコンストラクタが jest.fn() でモックされているため、
    // new するとモックインスタンスが返る)
    testGridCardViews = initialGameState.grid.map((row) =>
      row.map((cell) => (cell ? new crispGameLibModule.CardView() : null))
    );
    testHandCardViews = initialGameState.hand.map((card) =>
      card ? new crispGameLibModule.CardView() : null
    );
    __TEST_ONLY_setGridCardViews(testGridCardViews); // main.ts のテスト用セッター
    // ...

    testTutorialBubbleInstance = new crispGameLibModule.SpeechBubbleView();
    __TEST_ONLY_setTutorialBubble(testTutorialBubbleInstance);
  });

  // ... ここに it ブロックが続く ...
});
```

**ポイント:**

- `__TEST_ONLY_...` プレフィックスの関数は、`main.ts` からテスト目的でのみエクスポートされるセッター/ゲッターです。これにより、テスト対象モジュールの内部状態を制御・観測しやすくなります。
- `GameDefinition` (`ActualCartographersExpedition`) の各関数 (`applyAction`, `checkGameEnd`) も `jest.fn()` でモック化し、`beforeEach` でクリアします。テストケースごとに `mockReturnValueOnce` や `mockImplementationOnce` を使って特定の振る舞いをさせることができます。

#### 5.2.3. テストケース (`it` ブロック)

各 `it` ブロックでは、特定のシナリオをテストします。

**共通のパターン:**

1.  **セットアップ (Arrange):**

    - テストに必要な前提条件を設定します。
      - `crispGameLibModule.input.isJustPressed = true;`
      - `crispGameLibModule.input.pos.x = /* ... */;`
      - 特定のカードビューがクリックされたことにするため、その `containsPoint` モックメソッドが `true` を返すように設定:
        `testGridCardViews[r][c].containsPoint.mockReturnValue(true);`
      - 必要に応じて、`GameDefinition` のモック関数の戻り値を設定:
        `(ActualCartographersExpedition.applyAction as jest.Mock).mockReturnValueOnce(expectedNextState);`
        `(ActualCartographersExpedition.checkGameEnd as jest.Mock).mockReturnValueOnce({ status: "WIN", ... });`
      - `main.ts` の内部状態をテスト用セッターで設定:
        `__TEST_ONLY_setSelectedSourceCell({ r: 1, c: 1 });`
        `__TEST_ONLY_setTutorialStep(2);`

2.  **実行 (Act):**

    - テスト対象の関数を呼び出します。
      `handleOngoingInput();`
      `updateTutorialDisplay(...);`

3.  **検証 (Assert):**
    - `expect` を使って、実行結果が期待通りか検証します。
      - `crisp-game-lib` のモック関数呼び出し:
        `expect(crispGameLibModule.play).toHaveBeenCalledWith("tap");`
        `expect(testTutorialBubbleInstance.setText).toHaveBeenCalledWith(expect.stringContaining("..."));`
        `expect(crispGameLibModule.title).toHaveBeenCalledWith("YOU WIN!", expect.any(Object));`
      - `main.ts` の状態ゲッター:
        `expect(getSelectedSourceCell()).toEqual({ r: 1, c: 1 });`
        `expect(getTutorialStep()).toBe(2);`
        `expect(getGameState()).toEqual(expectedNextState);`
      - `GameDefinition` のモック関数呼び出し:
        `expect(ActualCartographersExpedition.applyAction).toHaveBeenCalledWith(currentState, expectedActionPayload);`
        `expect(ActualCartographersExpedition.checkGameEnd).toHaveBeenCalledWith(newState);`

```typescript
// 例: STEP 1 - ソースカード選択のテスト
it("STEP 1: should select a face-up grid card as source", () => {
  // Arrange
  const sourceCardR = 1,
    sourceCardC = 1;
  const sourceCardView = testGridCardViews[sourceCardR]?.[sourceCardC];
  if (!sourceCardView) throw new Error("Test setup error");
  sourceCardView.containsPoint.mockReturnValue(true); // このカードがクリックされたことにする
  (crispGameLibModule.input as any).isJustPressed = true;
  (crispGameLibModule.input.pos as any).set(10, 20); // クリック座標 (任意)

  // Act
  handleOngoingInput();

  // Assert
  expect(crispGameLibModule.play).toHaveBeenCalledWith("tap");
  expect(getSelectedSourceCell()).toEqual({ r: sourceCardR, c: sourceCardC });
  expect(getTutorialStep()).toBe(2); // チュートリアルが進むはず
  expect(testTutorialBubbleInstance.setText).toHaveBeenCalled(); // メッセージが設定されるはず
});
```

## 6. 具体的なテストシナリオの例 (Cartographer's Expedition より)

`main.test.ts` で実装されたテストシナリオは以下の通りです。

- **主要なゲームフロー:**
  1.  グリッド上の表向きカードをクリックしてソースとして選択する。
  2.  ソース選択後、手札のカードをクリックして選択する。
  3.  ソースと手札選択後、隣接する裏向きカードをクリックして公開する (アクション実行)。
- **破棄モード:**
  1.  破棄モードを有効化する (テストでは直接 `__TEST_ONLY_setIsDiscardModeActive(true)` を使用)。
  2.  手札のカードをクリックして破棄し、山札から新しいカードを引く (アクション実行)。
  3.  サウンド、状態リセット、チュートリアル更新などを検証。
- **ゲーム終了条件:**
  1.  カード公開アクションを実行する。
  2.  `GameDefinition.applyAction` が新しい状態を返すようにモックする。
  3.  `GameDefinition.checkGameEnd` が "WIN" (または "LOSE") を返すようにモックする。
  4.  テスト対象の入力ハンドラ (`handleOngoingInput`) を実行後、`checkGameEnd` が呼び出され、その結果に基づいて `crispGameLibModule.title` (または `end`) が適切な引数で呼び出されることを検証する。
      (注: `main.ts` の `update` ループ全体をテストするわけではないため、`checkGameEnd` の呼び出しと、その後の `title` 呼び出しをテスト内でシミュレートする必要がありました。)

**今後追加が考えられるテストシナリオ:**

- 無効なターゲットセルの選択 (隣接していない、既に表向きなど)。
- 選択されたソースカードの選択解除 (同じカードを再クリック、背景クリック)。
- チュートリアルステップに応じた入力制限。
- 山札が空の場合の破棄アクション。
- 全てのカードが公開された場合のゲーム終了。
- その他エッジケース。

## 7. デバッグとトラブルシューティング

- **テストの失敗メッセージをよく読む:** Jest の出力は、期待値と実際の値の差分 (`Expected: ... Received: ...`) や、エラーが発生したスタックトレースを詳細に示してくれます。
- **`console.log` の活用:** テスト対象の関数内やテストケース内で変数の値やモックの呼び出し状況を `console.log` で出力すると、問題の特定に役立ちます。
- **Jest のオプション:**
  - `npm test -- --watch`: ファイル変更時に自動で関連テストを再実行します。
  - `npm test -- --runInBand`: テストをシングルプロセスで順次実行します。並列実行時の奇妙な問題の切り分けに役立つことがあります。
  - `npm test -- --clearCache`: Jest のキャッシュをクリアします。キャッシュが原因で古い結果が表示される場合に試します。
  - `.only` と `.skip`: `describe.only(...)` や `it.only(...)` を使うと、そのテストスイートやテストケースのみを実行できます。デバッグ時に便利です。`it.skip(...)` は一時的にテストを無効化します。
- **ESM との格闘:** `SyntaxError: Cannot use import statement outside a module` や `ReferenceError: exports is not defined` などのエラーは、ESM の設定 (Node.js のフラグ、`package.json` の `type`, `jest.config.js` の `preset` や `transform`, `tsconfig.json` の `module` 設定) が噛み合っていない場合に発生しやすいです。関連する設定を丁寧に見直してください。
- **モックの確認:** モックが期待通りに機能していない場合 (`TypeError: ... is not a function` など)、スタブファイルで正しくモック関数が定義・エクスポートされ、`moduleNameMapper` で正しくマッピングされているか確認します。また、`jest.clearAllMocks()` が `beforeEach` で呼ばれているかも重要です。

このガイドが、`crisp-game-lib` を用いたゲーム開発におけるテスト実装の一助となれば幸いです。

import "crisp-game-lib";

export const characters = [
  `
  l
 lll
lllll
l l l
  l
 lll
`,
  `
 r r
rr rr
rrrrr
rrrrr
 rrr
  r
`,
  `
  r
 rrr
rrrrr
rrrrr
 rrr
  r
`,
  `
 lll
 lll
ll ll
ll ll
  l
 lll
`,
  `
l l l
 l l
l l l
 l l
l l l
 l l
`,
  `
l lll
l l l
l l l
l l l
l lll
`,
  `
  ll
llllll
l    l
l    l
 l  l
 llll
`,
  `
lwwwwl
lwwwl
lwwl
lwl
ll
`,
  `
 y r
r r y
 y r
y   r
 yrr
`,
  `
 l ll
 l ll
 l ll
 l ll
ll ll
`,
];

export const suitToIndex = {
  spade: 0,
  heart: 1,
  diamond: 2,
  club: 3,
  back: 4,
  joker: 8,
};

export class CardView {
  pos: Vector;
  size = vec(9, 16);
  rank: number;
  suit: "spade" | "heart" | "diamond" | "club" | "joker";
  isFaceUp: boolean;
  isSelected: boolean;
  isHighlighted: boolean;

  // --- Flip animation properties ---
  isFlipping: boolean;
  flipProgress: number; // 0 (開始) to 1 (終了)
  targetIsFaceUp: boolean | null; // アニメーション終了時の isFaceUp の状態
  flipSpeed: number; // アニメーションの速さ (1フレームあたりの進捗)

  // --- Movement animation properties ---
  isMoving: boolean;
  moveStartPos: Vector;
  moveTargetPos: Vector;
  moveProgress: number; // 0 to 1
  moveSpeed: number; // Progress per frame

  // --- Match animation properties ---
  isDisappearing: boolean;
  disappearSpeed: number;

  constructor() {
    this.pos = vec();
    this.rank = 1;
    this.suit = "spade";
    this.isFaceUp = true;
    this.isSelected = false;
    this.isHighlighted = false;

    // --- Flip animation initialization ---
    this.isFlipping = false;
    this.flipProgress = 0;
    this.targetIsFaceUp = null;
    this.flipSpeed = 0.1; // Example: 10 frames for flip

    // --- Movement initialization ---
    this.isMoving = false;
    this.moveStartPos = vec(); // Initialize, will be set on animation start
    this.moveTargetPos = vec(); // Initialize, will be set on animation start
    this.moveProgress = 0;
    this.moveSpeed = 0.07; // Example: ~14 frames for movement

    // --- Match animation initialization ---
    this.isDisappearing = false;
    this.disappearSpeed = 0.1; // Speed for disappearing animation
  }

  // Rank number を表示用文字列 (A, J, Q, K, T) に変換するヘルパーメソッド
  getRankDisplayString(): string {
    if (this.rank === 0) {
      return "";
    }
    switch (this.rank) {
      case 1:
        return "A";
      case 10:
        return "f"; // ランク 10 の場合は 'f' を返す (cardCharacters[5] に対応)
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return this.rank.toString(); // 2-9 はそのまま文字列として返す (text() で描画)
    }
  }

  // --- Flip animation start method ---
  startFlipAnimation(targetFaceUp: boolean) {
    // 既にアニメーション中、または状態が変わらない場合は何もしない
    if (this.isFlipping || this.isFaceUp === targetFaceUp) {
      return;
    }
    this.isFlipping = true;
    this.flipProgress = 0;
    this.targetIsFaceUp = targetFaceUp;
  }

  // --- Flip animation update method ---
  updateFlipAnimation() {
    if (!this.isFlipping) {
      return;
    }

    this.flipProgress += this.flipSpeed;

    if (this.flipProgress >= 1) {
      // アニメーション完了
      this.isFaceUp = this.targetIsFaceUp!;
      this.isFlipping = false;
      this.flipProgress = 0;
      this.targetIsFaceUp = null;
    }
  }

  // --- Movement animation start method ---
  startMoveAnimation(targetPos: Vector) {
    this.isMoving = true;
    this.moveStartPos = vec(this.pos.x, this.pos.y); // Use vec() to copy
    this.moveTargetPos = vec(targetPos.x, targetPos.y); // Use vec() to copy
    this.moveProgress = 0;
    // Optional: Adjust speed based on distance?
    // const distance = this.pos.distanceTo(targetPos);
    // this.moveSpeed = defaultSpeed / Math.max(1, distance / someFactor);
  }

  // --- Movement animation update method ---
  updateMovement() {
    if (!this.isMoving) {
      return;
    }

    this.moveProgress += this.moveSpeed;

    if (this.moveProgress >= 1) {
      // Movement complete
      this.pos.set(this.moveTargetPos); // Snap to final position
      this.isMoving = false;
      this.moveProgress = 0;
    } else {
      // Interpolate position (Linear Interpolation - lerp)
      const lerpX =
        this.moveStartPos.x +
        (this.moveTargetPos.x - this.moveStartPos.x) * this.moveProgress;
      const lerpY =
        this.moveStartPos.y +
        (this.moveTargetPos.y - this.moveStartPos.y) * this.moveProgress;
      this.pos.set(lerpX, lerpY);
    }
  }

  // --- Add method to start disappearing animation ---
  startDisappearAnimation() {
    this.isDisappearing = true;
    this.moveStartPos = vec(this.pos.x, this.pos.y);
    // Move to above the screen top edge
    this.moveTargetPos = vec(this.pos.x, -this.size.y);
    this.moveProgress = 0;
    this.moveSpeed = this.disappearSpeed;
    this.isMoving = true;
  }

  // --- Combined update method ---
  update() {
    this.updateFlipAnimation();
    this.updateMovement();
  }

  // --- 描画メソッド (アニメーション対応) ---
  draw() {
    // アニメーション更新をここで行う
    this.update();

    let currentScaleX = 1;
    let showFace = this.isFaceUp; // デフォルトで現在の状態を表示

    if (this.isFlipping) {
      // animationProgress (0 to 1) を scale.x (-1 to 1) に変換
      // 0 -> 0.5 -> 1 (progress)  => 1 -> 0 -> -1 (scale.x前半) => 0 -> 1 (scale.x後半)
      // Math.cos を使うと自然なイージングになる
      currentScaleX = Math.cos(this.flipProgress * PI);

      // スケールが 0 をまたいだら表示内容を切り替える
      if (currentScaleX < 0) {
        showFace = this.targetIsFaceUp!; // ターゲットの状態を表示
        currentScaleX *= -1; // 負のスケールは使わず、表示内容で反転を表現
      }
    }

    // --- ハイライト枠描画 ---
    if (this.isHighlighted) {
      color("red");
      // スケール変更に対応するため rect を使用
      rect(
        this.pos.x - (this.size.x / 2 + 1), // 中心基準で描画
        this.pos.y - (this.size.y / 2 + 1),
        this.size.x + 2,
        this.size.y + 2
      );
    }

    // --- 枠線 (スケール適用) ---
    color("black");
    // box 関数は scale を直接適用できないため、rect で描画
    const scaledWidth = this.size.x * currentScaleX;
    rect(
      this.pos.x - scaledWidth / 2, // 中心基準で描画
      this.pos.y - this.size.y / 2,
      scaledWidth,
      this.size.y
    );

    // --- 内側の背景 (スケールが小さすぎるときは描画しない) ---
    if (currentScaleX > 0.1) {
      // 閾値
      const innerBgColor = this.isSelected ? "light_yellow" : "white";
      color(innerBgColor);
      const scaledInnerWidth = (this.size.x - 2) * currentScaleX;
      rect(
        this.pos.x - scaledInnerWidth / 2, // 中心基準で描画
        this.pos.y - (this.size.y - 2) / 2,
        scaledInnerWidth,
        this.size.y - 2
      );

      // --- カード内容描画 (スケール適用) ---
      if (showFace) {
        if (this.suit === "joker") {
          color("black");
          const charCenterX = ceil(this.pos.x - 1);
          const charOptions: LetterOptions = { scale: { x: currentScaleX } };
          char("i", charCenterX, this.pos.y - 3, charOptions);
          char("j", charCenterX, this.pos.y + 3, charOptions);
        } else {
          // --- Standard suit drawing logic ---
          const suitColor =
            this.suit === "heart" || this.suit === "diamond" ? "red" : "black";
          const charCenterX = ceil(this.pos.x - 1);
          const charOptions: LetterOptions = { scale: { x: currentScaleX } };

          // --- FIX: Draw SUIT ---
          color(suitColor);
          char(
            addWithCharCode("a", suitToIndex[this.suit]), // Draw the actual suit character
            charCenterX,
            this.pos.y - 3, // Position for suit
            charOptions
          );
          // --- END FIX ---

          // Draw RANK
          color(suitColor); // Rank color is the same as suit color
          const rankStr = this.getRankDisplayString();
          if (rankStr) {
            char(
              rankStr,
              charCenterX,
              this.pos.y + 3, // Position for rank
              charOptions
            );
          }
        }
      } else {
        // 裏面の描画 (スケール適用)
        color("blue");
        const charCenterX = ceil(this.pos.x - 1);
        const charOptions: LetterOptions = { scale: { x: currentScaleX } };
        char(
          addWithCharCode("a", suitToIndex.back),
          charCenterX,
          this.pos.y - 3,
          charOptions
        );
        char(
          addWithCharCode("a", suitToIndex.back),
          charCenterX,
          this.pos.y + 3,
          charOptions
        );
      }
    }
  }

  // --- NEW: Method to check if a point is inside the card bounds ---
  containsPoint(point: Vector): boolean {
    const topLeftX = this.pos.x - this.size.x / 2;
    const topLeftY = this.pos.y - this.size.y / 2;
    // Use crisp-game-lib's Vector.isInRect for the check
    return point.isInRect(topLeftX, topLeftY, this.size.x, this.size.y);
  }
}

// --- 吹き出し表示クラス (機能拡張) ---
export class SpeechBubbleView {
  pos: Vector;
  size: Vector; // 幅は固定、高さは動的に変わる
  text: string;
  isVisible: boolean;
  textColor: Color | number;
  backgroundColor: Color | number;
  borderColor: Color | number;
  tailAlign: "left" | "center" | "right";
  tailDirection: "up" | "down" | "none";
  tailChar: string;

  // --- 追加: テキスト描画関連の定数 ---
  private readonly padding = { x: 3, y: 2 }; // 内側の左右・上下パディング
  private readonly lineSpacing = 6; // 小さい文字の行の高さ (仮定)
  private readonly charWidth = 4; // 小さい文字の幅 (仮定)
  private readonly minHeight = 15; // 吹き出しの最小高さ

  constructor(
    x: number,
    y: number,
    width: number,
    initialHeight: number, // 初期高さ (最小値として使われる)
    initialText: string = "",
    options?: {
      align?: "left" | "center" | "right";
      direction?: "up" | "down" | "none";
    }
  ) {
    this.pos = vec(x, y);
    // 幅は固定、高さは初期値 (後で計算)
    this.size = vec(width, Math.max(initialHeight, this.minHeight));
    this.text = initialText;
    this.isVisible = false;
    this.textColor = "black";
    this.backgroundColor = "white";
    this.borderColor = "black";
    this.tailAlign = options?.align ?? "left";
    this.tailDirection = options?.direction ?? "down";
    this.tailChar = "h";

    // --- 初期テキストに基づいて高さを計算 ---
    this._calculateAndSetHeight(this.text);
  }

  // --- 追加: テキストに基づいて高さを計算・設定するメソッド ---
  private _calculateAndSetHeight(textToLayout: string) {
    const maxCharsPerLine = Math.floor(
      (this.size.x - this.padding.x * 2) / this.charWidth
    );
    if (maxCharsPerLine <= 0) {
      this.size.y = this.minHeight; // 幅が狭すぎる場合
      return;
    }

    let lines = 1;
    const words = textToLayout.split(" ");
    let currentLine = "";
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length <= maxCharsPerLine) {
        currentLine = testLine;
      } else {
        lines++; // 改行
        currentLine = word; // 次の行の開始
      }
    }

    // 計算した行数に基づいて高さを決定
    const requiredHeight = lines * this.lineSpacing + this.padding.y * 2;
    this.size.y = Math.max(requiredHeight, this.minHeight); // 最小高さを保証
  }

  setText(newText: string) {
    if (this.text !== newText) {
      this.text = newText;
      this._calculateAndSetHeight(this.text); // 高さを再計算
    }
  }

  show(text?: string) {
    if (text && this.text !== text) {
      this.setText(text); // setText内で高さ計算される
    } else if (!this.isVisible) {
      // テキスト変更なしで表示だけする場合も念のため再計算
      // (フォントサイズなどが将来変わる可能性を考慮)
      this._calculateAndSetHeight(this.text);
    }
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  setTail(
    align: "left" | "center" | "right",
    direction: "up" | "down" | "none"
  ) {
    this.tailAlign = align;
    this.tailDirection = direction;
  }

  draw() {
    if (!this.isVisible) {
      return;
    }

    // 背景を描画 (サイズは計算済みの this.size を使用)
    color(this.backgroundColor);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);

    // 枠線を描画 (サイズは計算済みの this.size を使用)
    color(this.borderColor);
    rect(this.pos.x, this.pos.y, this.size.x, 1); // 上
    rect(this.pos.x, this.pos.y + this.size.y - 1, this.size.x, 1); // 下
    rect(this.pos.x, this.pos.y + 1, 1, this.size.y - 2); // 左
    rect(this.pos.x + this.size.x - 1, this.pos.y + 1, 1, this.size.y - 2); // 右

    // テキストを描画 (計算ロジックはほぼ同じだが、はみ出しチェックは不要)
    color(this.textColor);
    const textOptions: LetterOptions = { isSmallText: true };
    const maxCharsPerLine = Math.floor(
      (this.size.x - this.padding.x * 2) / this.charWidth
    );
    let lineY = this.pos.y + this.padding.y + 2;

    if (maxCharsPerLine > 0) {
      // 幅が有効な場合のみ描画
      const words = this.text.split(" ");
      let currentLine = "";
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (testLine.length <= maxCharsPerLine) {
          currentLine = testLine;
        } else {
          text(currentLine, this.pos.x + this.padding.x, lineY, textOptions);
          lineY += this.lineSpacing;
          currentLine = word;
        }
      }
      if (currentLine) {
        text(currentLine, this.pos.x + this.padding.x, lineY, textOptions);
      }
    }

    // しっぽの描画 (Y座標の計算基準が変わることに注意)
    if (this.tailDirection !== "none") {
      let tailX: number;
      let tailY: number;
      const mirrorOptions: LetterOptions = {};
      const tailCharOptions: LetterOptions = {};

      if (this.tailDirection === "down") {
        tailY = this.pos.y + this.size.y + 1;
      } else {
        tailY = this.pos.y - 1;
        mirrorOptions.mirror = { y: -1 };
      }

      const horizontalPadding = 3;
      if (this.tailAlign === "left") {
        tailX = this.pos.x + horizontalPadding;
      } else if (this.tailAlign === "center") {
        tailX = this.pos.x + this.size.x / 2;
      } else {
        tailX = this.pos.x + this.size.x - horizontalPadding;
      }

      color(this.borderColor);
      char(this.tailChar, tailX, tailY, {
        ...mirrorOptions,
        ...tailCharOptions,
      });
    }
  }
}

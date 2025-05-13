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
  flipProgress: number; // 0 (start) to 1 (end)
  targetIsFaceUp: boolean | null; // The state of isFaceUp when the animation ends
  flipSpeed: number; // Animation speed (progress per frame)

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

  // Helper method to convert rank number to display string (A, J, Q, K, T)
  getRankDisplayString(): string {
    if (this.rank === 0) {
      return "";
    }
    switch (this.rank) {
      case 1:
        return "A";
      case 10:
        return "f"; // Returns 'f' for rank 10 (corresponds to cardCharacters[5])
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return this.rank.toString(); // 2-9 are returned as strings directly (drawn with text())
    }
  }

  // --- Flip animation start method ---
  startFlipAnimation(targetFaceUp: boolean) {
    // If already animating or the state doesn't change, do nothing
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
      // Animation complete
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

  // --- Drawing method (with animation support) ---
  draw() {
    // Update animation here
    this.update();

    let currentScaleX = 1;
    let showFace = this.isFaceUp; // Show current state by default

    if (this.isFlipping) {
      // Convert animationProgress (0 to 1) to scale.x (-1 to 1)
      // 0 -> 0.5 -> 1 (progress)  => 1 -> 0 -> -1 (scale.x first half) => 0 -> 1 (scale.x second half)
      // Using Math.cos provides natural easing
      currentScaleX = Math.cos(this.flipProgress * PI);

      // Switch displayed content when scale crosses 0
      if (currentScaleX < 0) {
        showFace = this.targetIsFaceUp!; // Display the target state
        currentScaleX *= -1; // Don't use negative scale; represent flip by changing content
      }
    }

    // --- Draw highlight border ---
    if (this.isHighlighted) {
      color("red");
      // Use rect to support scaling
      rect(
        this.pos.x - (this.size.x / 2 + 1), // Draw centered
        this.pos.y - (this.size.y / 2 + 1),
        this.size.x + 2,
        this.size.y + 2
      );
    }

    // --- Border (scaled) ---
    color("black");
    // box function cannot directly apply scale, so draw with rect
    const scaledWidth = this.size.x * currentScaleX;
    rect(
      this.pos.x - scaledWidth / 2, // Draw centered
      this.pos.y - this.size.y / 2,
      scaledWidth,
      this.size.y
    );

    // --- Inner background (don't draw if scale is too small) ---
    if (currentScaleX > 0.1) {
      // Threshold
      const innerBgColor = this.isSelected ? "light_yellow" : "white";
      color(innerBgColor);
      const scaledInnerWidth = (this.size.x - 2) * currentScaleX;
      rect(
        this.pos.x - scaledInnerWidth / 2, // Draw centered
        this.pos.y - (this.size.y - 2) / 2,
        scaledInnerWidth,
        this.size.y - 2
      );

      // --- Draw card content (scaled) ---
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
        // Draw card back (scaled)
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

// --- Speech bubble display class (extended functionality) ---
export class SpeechBubbleView {
  pos: Vector;
  size: Vector; // Width is fixed, height changes dynamically
  text: string;
  isVisible: boolean;
  textColor: Color | number;
  backgroundColor: Color | number;
  borderColor: Color | number;
  tailAlign: "left" | "center" | "right";
  tailDirection: "up" | "down" | "none";
  tailChar: string;

  // --- Added: Constants related to text drawing ---
  private readonly padding = { x: 3, y: 2 }; // Inner left/right and top/bottom padding
  private readonly lineSpacing = 6; // Line height for small text (assumption)
  private readonly charWidth = 4; // Width of small characters (assumption)
  private readonly minHeight = 15; // Minimum height of the speech bubble

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
    // Width is fixed, height is initial value (calculated later)
    this.size = vec(width, Math.max(initialHeight, this.minHeight));
    this.text = initialText;
    this.isVisible = false;
    this.textColor = "black";
    this.backgroundColor = "white";
    this.borderColor = "black";
    this.tailAlign = options?.align ?? "left";
    this.tailDirection = options?.direction ?? "down";
    this.tailChar = "h";

    // --- Calculate height based on initial text ---
    this._calculateAndSetHeight(this.text);
  }

  // --- Added: Method to calculate and set height based on text ---
  private _calculateAndSetHeight(textToLayout: string) {
    const maxCharsPerLine = Math.floor(
      (this.size.x - this.padding.x * 2) / this.charWidth
    );
    if (maxCharsPerLine <= 0) {
      this.size.y = this.minHeight; // If width is too narrow
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
        lines++; // New line
        currentLine = word; // Start of the next line
      }
    }

    // Determine height based on the calculated number of lines
    const requiredHeight = lines * this.lineSpacing + this.padding.y * 2;
    this.size.y = Math.max(requiredHeight, this.minHeight); // Ensure minimum height
  }

  setText(newText: string) {
    if (this.text !== newText) {
      this.text = newText;
      this._calculateAndSetHeight(this.text); // Recalculate height
    }
  }

  show(text?: string) {
    if (text && this.text !== text) {
      this.setText(text); // Height is calculated within setText
    } else if (!this.isVisible) {
      // Recalculate height just in case, even when only showing without text change
      // (Considering potential future changes to font size, etc.)
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

    // Draw background (uses pre-calculated this.size)
    color(this.backgroundColor);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);

    // Draw border (uses pre-calculated this.size)
    color(this.borderColor);
    rect(this.pos.x, this.pos.y, this.size.x, 1); // Top
    rect(this.pos.x, this.pos.y + this.size.y - 1, this.size.x, 1); // Bottom
    rect(this.pos.x, this.pos.y + 1, 1, this.size.y - 2); // Left
    rect(this.pos.x + this.size.x - 1, this.pos.y + 1, 1, this.size.y - 2); // Right

    // Draw text (calculation logic is almost the same, but overflow check is not needed)
    color(this.textColor);
    const textOptions: LetterOptions = { isSmallText: true };
    const maxCharsPerLine = Math.floor(
      (this.size.x - this.padding.x * 2) / this.charWidth
    );
    let lineY = this.pos.y + this.padding.y + 2;

    if (maxCharsPerLine > 0) {
      // Draw only if width is valid
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

    // Draw tail (note that the Y-coordinate calculation basis changes)
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

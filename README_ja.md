# ソリティアフォージ

標準的な 52 枚組のトランプを使用する、新しい一人用カードゲーム（ソリティア）の設計、実装、評価のためのフレームワークです。

## 概要 (Overview)

このプロジェクトの中核的な目標は、斬新なソリティア体験の創出を促進することです。開発者が以下の手順に従ってゲームをデザインできるよう、体系化されたゲームデザインプロセス（[`knowledge/new-solitaire-creation-steps.md`](./knowledge/new-solitaire-creation-steps.md) を参照）を定義しています。

1.  **コンセプト定義:** テーマとコアメカニクスを確立します。
2.  **ルール定義:** ゲームルールを詳細化し、[`knowledge/library.md`](./knowledge/library.md) の仕様に基づいて TypeScript のゲーム定義を生成します。
3.  **デザインレビュー:** ルールの一貫性、戦略的深さ、エンゲージメントについて批判的に評価します。
4.  **シミュレーションと評価:** ([`knowledge/simulation.md`](./knowledge/simulation.md) に基づいて) シミュレーションを実行し、ゲームバランス、難易度を分析し、潜在的な問題を特定します。
5.  **改良:** レビューとシミュレーションのフィードバックに基づいて、ルールとゲーム定義を繰り返し改善します。

このプロセスには、実装とテストに関する専用のガイドも含まれています。

1.  **ルール実装:** [`knowledge/crisp-game-lib-card-game-guide.md`](./knowledge/crisp-game-lib-card-game-guide.md) に記載されているガイダンスを使用してゲームロジックを実装します。
2.  **テスト:** [`knowledge/crisp-game-lib-testing-guide.md`](./knowledge/crisp-game-lib-testing-guide.md) に概説されているように、ゲーム実装を徹底的にテストします。

## 収録ゲーム (Included Games)

### Catalyst Reaction

- **テーマ:** 錬金術師の工房 (Alchemist's Workshop)
- **ゲームの目標:** 場 (Field) に存在する全てのカードを取り除く（完全に「変成」させる）。
- **ルール:** [./src/games/catalyst-reaction/README.md](./src/games/catalyst-reaction/README.md)

### 地図製作者の探検 (Cartographer's Expedition)

- **説明:** 「Cartographer's Expedition（地図製作者の探検）」は、未知の土地を探索し、隠された重要なランドマークを発見することを目指す一人用トランプゲームです。プレイヤーは手札のカードと場の表向きカードを戦略的に組み合わせ、隣接する裏向きカードを公開していき、4 つの隠されたランドマーク（エース）をすべて見つけることが目標です。
- **ルール:** [./src/games/cartographers-expedition/README.md](./src/games/cartographers-expedition/README.md)

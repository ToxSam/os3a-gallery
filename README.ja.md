# OpenSource3DAssets.com

> 🇬🇧 **[English version available here](README.md) / 英語版はこちら**

無料でオープンソースの3Dアセットを発見するための中央レジストリ

🌐 [opensource3dassets.com](https://opensource3dassets.com)

実際に使えるGLB 3Dアセットを簡単に見つけられるキュレーションされたディレクトリ - CC0パブリックドメインのモデル、小道具、環境、構造物と明確なライセンス情報。

## これは何ですか？

OpenSource3DAssets.comは、ゲーム、VR体験、3Dプロジェクトなどに適した高品質な無料3Dアセットの発見プラットフォームです。

才能あるクリエイターのアセットを紹介しています：

- **Polygonal Mind Collections** - 17のテーマ別コレクション、991以上のアセット
  - MomusPark - 公園環境アセット
  - Medieval Fair - 中世祭りの小道具と構造物
  - Tomb Chaser 1 - エジプトのピラミッドテーマのアセット
  - Tomb Chaser 2 - 日本のネオンパゴダアセット
  - Chromatic Chaos - ヴェイパーウェイブ80年代風
  - Crystal Crossroads - メビウス風砂漠環境
  - その他11のユニークなコレクション！
- **他のクリエイターのCC0作品**（近日公開）

私たちのミッション：透明なライセンスの高品質3Dアセットを簡単に見つけられるようにすること。

## 現在のコレクション

### Polygonal Mind Collections（CC0）

- **991以上の3Dアセット**、17のテーマ別コレクション
- 形式：GLB（Blender、Unity、Unreal Engine、Three.jsなどに対応）
- GitHubに永続保存
- 帰属表示不要、自由に使用可能
- ゲーム開発、VRプロジェクト、3Dビジュアライゼーションに最適

各コレクションはライセンスを明確に表示しているため、何ができるかが正確にわかります。

## 機能

### 🔍 閲覧とフィルター

- コレクション、テーマ、スタイルで検索
- ライセンスタイプでフィルター（CC0、CC-BYなど）
- ダウンロード前に3Dモデルをプレビュー
- Three.jsによるインタラクティブ3Dビューア

### 📦 アセットファインダー

効率的なワークフローのための一括操作：

- 複数選択で一括ダウンロード
- コレクション横断でのフィルターと検索
- サムネイルとメタデータのプレビュー
- 個別アセットまたはコレクション全体のダウンロード

### 🎨 3Dビューア

アセットを確認するインタラクティブビューア：

- 3Dモデルの回転、ズーム、パン
- マテリアルとテクスチャの確認
- ポリゴン数・頂点数情報
- エクスポート形式の互換性チェック

## 技術スタック

- **フレームワーク**：Next.js 14（App Router）
- **スタイリング**：TailwindCSS
- **3Dレンダリング**：Three.js + GLTFLoader
- **データストレージ**：GitHub（JSONファイル）
- **デプロイ**：Vercel
- **ライセンス**：MIT

## データソース

すべてのアセットメタデータは [open-source-3D-assets](https://github.com/ToxSam/open-source-3D-assets) リポジトリに保存されています。

```
data/
├── projects.json           # コレクションメタデータ
└── assets/
    ├── pm-momuspark.json  # MomusParkアセット
    ├── pm-medieval.json   # Medieval Fairアセット
    └── ...                # その他のコレクション
```

## はじめに

### 前提条件

- Node.js 18+
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/ToxSam/os3a-gallery.git

# 依存関係をインストール
cd os3a-gallery
npm install

# 開発サーバーを起動
npm run dev
```

`http://localhost:3000` にアクセスしてギャラリーを表示します。

### 環境変数

`.env.local` ファイルを作成してください：

```env
GITHUB_REPO_OWNER=ToxSam
GITHUB_REPO_NAME=open-source-3D-assets
GITHUB_BRANCH=main
```

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router ページ
│   ├── en/                 # 英語ルート
│   ├── ja/                 # 日本語ルート
│   └── api/                # APIルート
├── components/             # Reactコンポーネント
│   ├── asset/              # アセット関連コンポーネント
│   ├── finder/             # ファインダー/ブラウザコンポーネント
│   └── VRMViewer/          # 3Dビューアコンポーネント
├── lib/                    # ユーティリティ関数
├── locales/                # i18n翻訳
└── types/                  # TypeScript型定義
```

## 貢献

貢献を歓迎しています。以下のような形で参加できます：

1. **アセットの追加**：[データリポジトリ](https://github.com/ToxSam/open-source-3D-assets) にPRを送信
2. **ギャラリーの改善**：バグ修正、機能追加、UI/UXの改善
3. **翻訳**：サイトの多言語翻訳に協力
4. **問題の報告**：バグを見つけたら [Issueを立てる](https://github.com/ToxSam/os3a-gallery/issues)

## ライセンス

このプロジェクト（ギャラリーウェブサイト）はMITライセンスです。詳細はLICENSEファイルを参照してください。

3Dアセット自体はそれぞれのライセンス（主にCC0）に従います。各コレクションのライセンス情報を確認してください。

## クレジット

- **ギャラリー開発**：ToxSam
- **3Dアセット**：Polygonal Mindおよび貢献クリエイター
- **Three.js**：素晴らしい3Dレンダリングライブラリ
- **Next.js**：優れたReactフレームワーク

## リンク

- 🌐 ウェブサイト：[opensource3dassets.com](https://opensource3dassets.com)
- 📊 データリポジトリ：[github.com/ToxSam/open-source-3D-assets](https://github.com/ToxSam/open-source-3D-assets)
- 🐦 Twitter：[@toxsam](https://twitter.com/toxsam)
- 💬 Discord：[コミュニティに参加](#)

## ロードマップ

- [ ] 他のクリエイターのアセットコレクションを追加
- [ ] 高度なフィルタリング（ポリゴン数、マテリアルタイプなど）の実装
- [ ] アセットプレビュー動画の追加
- [ ] アセットタグシステムの構築

---

Made with ❤️ by ToxSam | Powered by Next.js & Three.js

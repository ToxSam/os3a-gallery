---
title: "アセットデータベース（GitHub）"
description: "すべてのアセットメタデータをJSONで取得 - アプリやゲームに統合するのに最適"
---

# アセットデータベース（GitHub）

すべてのアセットメタデータをJSONファイルで取得 - アプリやゲームに統合するのに最適です。

[アセットデータベースを見る →](https://github.com/ToxSam/open-source-3D-assets)

## 構造

```
/data/
  projects.json → 全コレクション + ライセンス情報
  /assets/
    pm-momuspark.json → コレクションのアセットデータ
    pm-medieval-fair.json
    pm-tomb-chaser-1.json
    [その他のコレクションファイル...]
```

## プロジェクトエントリの例

`projects.json` のプロジェクト/コレクションエントリの例：

```json
{
  "id": "pm-momuspark",
  "name": "MomusPark",
  "description": "Park environment assets",
  "asset_data_file": "assets/pm-momuspark.json",
  "license": "CC0",
  "source_type": "github",
  "created_at": "2026-01-01T00:00:00.000Z",
  "updated_at": "2026-01-01T00:00:00.000Z"
}
```

### フィールド説明

- **id**: コレクションの一意識別子
- **name**: 表示名
- **description**: コレクションの短い説明
- **asset_data_file**: 個別アセットデータのJSONファイルへのパス
- **license**: ライセンス（CC0、CC-BY など）
- **source_type**: ソースの種類（例: "github"）
- **created_at** / **updated_at**: タイムスタンプ

## 各アセットに含まれるもの

- GLBの直接ダウンロードリンク（またはモデルURL）
- プレビュー・サムネイル画像
- メタデータ（名前、説明、タグ）
- ライセンス情報

## アセットエントリの例

コレクションJSON内のアセットエントリの例：

```json
{
  "id": "momuspark-bench-01",
  "name": "Park Bench",
  "project_id": "pm-momuspark",
  "description": "Wooden park bench",
  "model_file_url": "https://raw.githubusercontent.com/.../bench.glb",
  "format": "GLB",
  "thumbnail_url": "https://...",
  "license": "CC0",
  "tags": ["prop", "furniture", "outdoor"]
}
```

### フィールド説明

- **id**: アセットの一意識別子
- **name**: 表示名
- **project_id**: 所属コレクションのID
- **description**: 説明文
- **model_file_url**: GLBファイルの直接ダウンロードURL
- **format**: ファイル形式（通常 "GLB"）
- **thumbnail_url**: プレビュー画像URL
- **license**: ライセンス（例: CC0）
- **tags**: フィルター用のオプションタグ

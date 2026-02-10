---
title: "GLB形式について"
description: "GLBはゲーム、VR、3Dプロジェクトでモデル・小物・環境に使われる3Dアセット形式です。"
---

# GLB形式について

GLBはglTF（GL Transmission Format）のバイナリ形式で、効率的な転送と読み込みのためのロイヤリティフリーの3Dアセット形式です。Webやリアルタイムアプリケーションにおける3Dモデルの標準です。

## GLBを使用する理由

- **幅広い互換性** – Blender、Unity、Unreal Engine、Three.js、ほとんどの3Dツールで利用可能
- **オープンスタンダード** – Khronos Groupの標準で、特定ベンダーに依存しない
- **単一ファイル** – モデル、マテリアル、（オプションで）テクスチャを1ファイルに
- **効率的** – バイナリ形式でコンパクトかつ読み込みが速い
- **Web向け** – WebGLやThree.jsなどでブラウザネイティブ対応

## 互換性

- **Blender** – ネイティブのインポート/エクスポート
- **Unity** – 標準のGLTFUtilityまたは他のインポーターパッケージ
- **Unreal Engine** – glTF/GLBインポート対応
- **Three.js / Web** – GLTFLoader（当サイトのビューアも使用）
- **Godot、Babylon.jsなど** – 広いエコシステムでサポート

[glTF/GLBについて詳しく見る →](https://www.khronos.org/gltf/)

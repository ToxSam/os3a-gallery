---
title: "Asset Database (GitHub)"
description: "Access all asset metadata as JSON files - perfect for integrating into your app or game"
---

# Asset Database (GitHub)

Access all asset metadata as JSON files - perfect for integrating into your app or game.

[View Asset Database →](https://github.com/ToxSam/open-source-3D-assets)

## Structure

```
/data/
  projects.json → All collections + license info
  /assets/
    pm-momuspark.json → Collection asset data
    pm-medieval-fair.json
    pm-tomb-chaser-1.json
    [other collection files...]
```

## Example Project Entry

Here's an example of what a project/collection entry looks like in `projects.json`:

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

### Project Field Descriptions

- **id**: Unique identifier for the collection
- **name**: Display name of the collection
- **description**: Short description of the collection
- **asset_data_file**: Path to the JSON file containing individual asset data
- **license**: License type (CC0, CC-BY, etc.)
- **source_type**: Type of source (e.g., "github")
- **created_at** / **updated_at**: Timestamps

## Each asset includes

- Direct GLB download link (or model URL)
- Preview / thumbnail images
- Metadata (name, description, tags)
- License information

## Example Asset Entry

Here's an example of what an asset entry might look like in a collection JSON file:

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

### Field Descriptions

- **id**: Unique identifier for the asset
- **name**: Display name
- **project_id**: ID of the collection this asset belongs to
- **description**: Text description
- **model_file_url**: Direct download URL for the GLB file
- **format**: File format (typically "GLB")
- **thumbnail_url**: Preview image URL
- **license**: License (e.g., CC0)
- **tags**: Optional tags for filtering

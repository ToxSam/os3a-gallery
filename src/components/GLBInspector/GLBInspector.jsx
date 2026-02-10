/// src/components/GLBInspector/GLBInspector.jsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useI18n } from '@/lib/i18n';
import { Upload, Info, Layers, Image, Code, Download, X, Smile } from 'lucide-react';
import { VRMViewer } from '@/components/VRMViewer/VRMViewer';
import TextureRenderer from '@/components/VRMViewer/TextureRenderer';

export const GLBInspector = () => {
  const { t } = useI18n();
  const fileInputRef = useRef(null);
  
  const [glbUrl, setGlbUrl] = useState(null);
  const [glbFile, setGlbFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [textures, setTextures] = useState([]);
  const [activeTab, setActiveTab] = useState('info');
  const [selectedTextureIndex, setSelectedTextureIndex] = useState(null);

  // Handle file selection
  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept GLB/GLTF files
    const isValidFile = file.name.toLowerCase().endsWith('.glb') || 
                        file.name.toLowerCase().endsWith('.gltf');
    
    if (!isValidFile) {
      alert('Please select a valid GLB or GLTF file');
      return;
    }

    // Store the file
    setGlbFile(file);

    // Create object URL for the file
    const url = URL.createObjectURL(file);
    setGlbUrl(url);

    // Reset state
    setMetadata(null);
    setTextures([]);
    setActiveTab('info');
  }, []);

  // Handle metadata load from VRMViewer
  const handleMetadataLoad = useCallback((data) => {
    console.log('GLB metadata loaded:', data);
    setMetadata(data);
  }, []);

  // Handle textures load from VRMViewer
  const handleTexturesLoad = useCallback((textureData) => {
    console.log('GLB textures loaded:', textureData);
    setTextures(textureData || []);
  }, []);

  // Download texture
  const downloadTexture = (texture, index) => {
    if (!texture || !texture.image) return;

    const canvas = document.createElement('canvas');
    const img = texture.image;
    canvas.width = img.width || img.naturalWidth;
    canvas.height = img.height || img.naturalHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `texture_${index}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  // Reset/clear the loaded model
  const handleClear = () => {
    if (glbUrl) {
      URL.revokeObjectURL(glbUrl);
    }
    setGlbUrl(null);
    setGlbFile(null);
    setMetadata(null);
    setTextures([]);
    setActiveTab('info');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cream dark:bg-cream-dark">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Welcome/Info panel (hidden when model loaded) */}
        {!glbUrl && (
          <div className="w-96 bg-cream dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
            <div className="min-h-full flex flex-col">
              <div className="flex-1">
                {/* Hero Section */}
                <div className="px-6 py-8">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 p-8">
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        Welcome to GLB Inspector
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        A powerful tool for analyzing and exploring GLB/GLTF 3D models. Inspect your models with detailed insights and controls.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Open GLB/GLTF File
                        </button>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-48 h-48 bg-blue-200/20 dark:bg-blue-700/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-48 h-48 bg-purple-200/20 dark:bg-purple-700/20 rounded-full blur-3xl"></div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="px-6 mt-12">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xl">✨</span>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Key Features</h3>
                  </div>

                  <div className="flex gap-8">
                    {/* Left Column */}
                    <div className="flex-1 space-y-6">
                      {/* Model Information */}
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400" />
                        <div>
                          <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Model Information</h4>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">View comprehensive model statistics and details.</p>
                        </div>
                      </div>

                      {/* Animation Support */}
                      <div className="flex items-start gap-3">
                        <Layers className="h-5 w-5 flex-none text-green-600 dark:text-green-400" />
                        <div>
                          <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Animation Support</h4>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">Play and preview embedded animations.</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 space-y-6">
                      {/* Texture Analysis */}
                      <div className="flex items-start gap-3">
                        <Image className="h-5 w-5 flex-none text-purple-600 dark:text-purple-400" />
                        <div>
                          <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Texture Analysis</h4>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">Examine and download model textures with format details.</p>
                        </div>
                      </div>

                      {/* Technical Details */}
                      <div className="flex items-start gap-3">
                        <Code className="h-5 w-5 flex-none text-amber-600 dark:text-amber-400" />
                        <div>
                          <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Technical Details</h4>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">Access model metadata and statistics.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="px-6 py-8">
                  <div className="bg-cream/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">💡</span>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Quick Tips</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">👆</span>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Left-click to orbit, right-click to pan, scroll to zoom
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">🔍</span>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Toggle wireframe and skeleton visualization
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">📦</span>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Supports both GLB and GLTF file formats
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right sidebar - Model info panel (shown when model loaded) */}
        {glbUrl && metadata && (
          <div className="w-96 bg-cream dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
            {/* Header with clear button */}
            <div className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Model Inspector</h2>
              <button
                onClick={handleClear}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Clear model"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'info'
                    ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Info className="h-4 w-4 inline-block mr-2" />
                Info
              </button>
              <button
                onClick={() => setActiveTab('textures')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'textures'
                    ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Image className="h-4 w-4 inline-block mr-2" />
                Textures ({textures.length})
              </button>
            </div>

            {/* Tab content */}
            <div className="p-6">
              {activeTab === 'info' && (
                <div className="space-y-6">
                  {/* File Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">File Information</h3>
                    <div className="space-y-2 text-sm">
                      {glbFile && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Filename:</span>
                            <span className="text-gray-900 dark:text-gray-100 font-medium">{glbFile.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">File Size:</span>
                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                              {(glbFile.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Model Stats */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Model Statistics</h3>
                    <div className="space-y-2 text-sm">
                      {metadata.triangleCount !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Triangles:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {metadata.triangleCount.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {metadata.materialCount !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Materials:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">{metadata.materialCount}</span>
                        </div>
                      )}
                      {metadata.avatarHeight !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Height:</span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {metadata.avatarHeight.toFixed(2)} m
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Textures:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">{textures.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Animation Info */}
                  {metadata.animationNames && metadata.animationNames.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Animations ({metadata.animationNames.length})
                      </h3>
                      <div className="space-y-1">
                        {metadata.animationNames.map((name, idx) => (
                          <div
                            key={idx}
                            className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded"
                          >
                            {name || `Animation ${idx + 1}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'textures' && (
                <div className="space-y-4">
                  {textures.length === 0 ? (
                    <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                      No textures found in this model
                    </div>
                  ) : (
                    textures.map((texture, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedTextureIndex(index)}
                      >
                        <div className="aspect-square bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                          {texture && texture.image ? (
                            <TextureRenderer texture={texture} size={256} />
                          ) : (
                            <div className="text-gray-400 dark:text-gray-600">No preview</div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Texture {index + 1}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadTexture(texture, index);
                              }}
                              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                          {texture && texture.image && (
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {texture.image.width || texture.image.naturalWidth} × {texture.image.height || texture.image.naturalHeight}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Center - 3D Viewer */}
        <div className="flex-1 relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          {glbUrl ? (
            <VRMViewer
              url={glbUrl}
              onMetadataLoad={handleMetadataLoad}
              onTexturesLoad={handleTexturesLoad}
              showInfoPanel={false}
              hideControls={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg flex items-center gap-3"
              >
                <Upload className="h-5 w-5" />
                Open GLB/GLTF File
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Texture lightbox */}
      {selectedTextureIndex !== null && textures[selectedTextureIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          onClick={() => setSelectedTextureIndex(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedTextureIndex(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>
            <TextureRenderer
              texture={textures[selectedTextureIndex]}
              size={1024}
              className="rounded-lg"
            />
            <div className="mt-4 text-white text-center">
              <p className="text-lg font-medium">Texture {selectedTextureIndex + 1}</p>
              {textures[selectedTextureIndex]?.image && (
                <p className="text-sm text-gray-300">
                  {textures[selectedTextureIndex].image.width || textures[selectedTextureIndex].image.naturalWidth} × 
                  {textures[selectedTextureIndex].image.height || textures[selectedTextureIndex].image.naturalHeight}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GLBInspector;

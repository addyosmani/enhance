import React, { useState, useCallback } from 'react';
import { Wand2 } from 'lucide-react';
import { ImageDropzone } from './components/ImageDropzone';
import { ModelSelector } from './components/ModelSelector';
import { ImagePreview } from './components/ImagePreview';
import { MODEL_CATEGORIES } from './constants';
import { upscaleImage } from './utils/upscaler';
import type { ImageState, SelectedModel } from './types';

function App() {
  const [selectedModel, setSelectedModel] = useState<SelectedModel>({
    type: MODEL_CATEGORIES[0].models[0].name,
    scale: MODEL_CATEGORIES[0].models[0].scales[0]
  });
  const [imageState, setImageState] = useState<ImageState>({
    original: null,
    upscaled: null,
    processing: false,
    error: null,
  });
  const [processableImage, setProcessableImage] = useState<string | null>(null);

  const handleImageSelect = useCallback(async (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setImageState((prev) => ({
        ...prev,
        original: imageUrl,
        upscaled: null,
        error: null,
      }));
      setProcessableImage(imageUrl);
    };
    reader.onerror = () => {
      setImageState((prev) => ({
        ...prev,
        error: 'Failed to load image. Please try again.',
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleResize = useCallback((resizedImageUrl: string) => {
    setProcessableImage(resizedImageUrl);
  }, []);

  const handleUpscale = useCallback(async () => {
    if (!processableImage) return;

    setImageState((prev) => ({ ...prev, processing: true, error: null }));

    try {
      const upscaledUrl = await upscaleImage(processableImage, selectedModel);
      
      setImageState((prev) => ({
        ...prev,
        upscaled: upscaledUrl,
        processing: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Upscale error:', errorMessage);
      setImageState((prev) => ({
        ...prev,
        processing: false,
        error: errorMessage,
      }));
    }
  }, [processableImage, selectedModel]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wand2 className="w-12 h-12 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-900">Enhance</h1>
          </div>
          <p className="text-xl text-gray-600">
            Upscale and enhance your images with AI
          </p>
        </div>

        <div className="space-y-8">
          {!imageState.original ? (
            <ImageDropzone
              onImageSelect={handleImageSelect}
              disabled={imageState.processing}
            />
          ) : (
            <div className="space-y-8">
              <ImagePreview
                original={imageState.original}
                upscaled={imageState.upscaled}
                processing={imageState.processing}
                onResize={handleResize}
              />
              
              <div className="space-y-4">
                <ModelSelector
                  selectedModel={selectedModel}
                  onSelectModel={setSelectedModel}
                  disabled={imageState.processing}
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleUpscale}
                  disabled={imageState.processing}
                  className={`px-6 py-3 rounded-lg bg-blue-500 text-white font-medium flex items-center gap-2 transition-colors ${
                    imageState.processing
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  }`}
                >
                  {imageState.processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Enhance Image
                    </>
                  )}
                </button>
              </div>

              {imageState.error && (
                <p className="text-center text-red-500">{imageState.error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
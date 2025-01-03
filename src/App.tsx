import React, { useState } from 'react';
import { Maximize } from 'lucide-react';
import { Dropzone } from './components/Dropzone';
import { ModelSelector } from './components/ModelSelector';
import { ImagePreview } from './components/ImagePreview';
import { getModel } from './lib/models/registry';
import { fileToImageData, imageDataToBlob } from './lib/image-utils';

function App() {
  const [selectedModel, setSelectedModel] = useState('swin-ir');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageDrop = async (file: File) => {
    setIsProcessing(true);
    setUpscaledImage(null);
    setError(null);
    
    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setOriginalImage(objectUrl);

    try {
      // Get selected model
      const model = await getModel(selectedModel);
      await model.load();

      // Process image
      const imageData = await fileToImageData(file);
      const upscaledData = await model.upscale(imageData);
      const upscaledBlob = await imageDataToBlob(upscaledData);
      
      setUpscaledImage(URL.createObjectURL(upscaledBlob));
    } catch (err) {
      console.error('Error processing image:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while processing the image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Maximize className="h-12 w-12 text-blue-500" />
            <h1 className="text-4xl font-bold">Upscale Images</h1>
          </div>
          <p className="text-xl text-gray-600">
            Enhance and upscale your images using AI - right in your browser
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Model Selection */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Choose Upscaling Model</h2>
            <ModelSelector 
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>

          {/* Image Upload */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <Dropzone onImageDrop={handleImageDrop} />
            {error && (
              <p className="mt-4 text-red-500">{error}</p>
            )}
          </div>

          {/* Preview */}
          {originalImage && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <ImagePreview 
                original={originalImage}
                upscaled={upscaledImage}
                isProcessing={isProcessing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
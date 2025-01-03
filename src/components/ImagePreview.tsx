import React from 'react';

interface ImagePreviewProps {
  original: string | null;
  upscaled: string | null;
  isProcessing: boolean;
}

export function ImagePreview({ original, upscaled, isProcessing }: ImagePreviewProps) {
  if (!original) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-2">
        <h3 className="font-semibold">Original</h3>
        <div className="relative border rounded-lg overflow-hidden">
          <img src={original} alt="Original" className="w-full h-auto" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">Upscaled</h3>
        <div className="relative border rounded-lg overflow-hidden">
          {isProcessing ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : upscaled ? (
            <img src={upscaled} alt="Upscaled" className="w-full h-auto" />
          ) : (
            <div className="aspect-video bg-gray-50 flex items-center justify-center text-gray-400">
              Upscaled image will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
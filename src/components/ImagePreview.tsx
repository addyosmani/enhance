import React from 'react';
import { Download } from 'lucide-react';

interface ImagePreviewProps {
  original: string;
  upscaled: string | null;
  processing: boolean;
}

export function ImagePreview({ original, upscaled, processing }: ImagePreviewProps) {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Original</h3>
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
          <img
            src={original}
            alt="Original"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Enhanced</h3>
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
          {processing ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : upscaled ? (
            <>
              <img
                src={upscaled}
                alt="Upscaled"
                className="w-full h-full object-contain"
              />
              <a
                href={upscaled}
                download="enhanced.png"
                className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
              >
                <Download className="w-6 h-6 text-blue-500" />
              </a>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Enhanced image will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
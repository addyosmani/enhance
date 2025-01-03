import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { ImageResizer } from './ImageResizer';
import { loadImage } from '../utils/image-loader';
import { resizeImage } from '../utils/image-resizer';

interface ImagePreviewProps {
  original: string;
  upscaled: string | null;
  processing: boolean;
  onResize: (resizedImage: string) => void;
}

export function ImagePreview({ original, upscaled, processing, onResize }: ImagePreviewProps) {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [displayedImage, setDisplayedImage] = useState<string>(original);

  useEffect(() => {
    loadImage(original).then(setOriginalImage);
    setDisplayedImage(original);
    onResize(original); // Pass initial image to parent
  }, [original, onResize]);

  const handleResize = async (width: number, height: number) => {
    if (!originalImage) return;
    const resized = await resizeImage(originalImage, width, height);
    setDisplayedImage(resized);
    onResize(resized); // Pass resized image to parent
  };

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-700">Original</h3>
        {originalImage && (
          <ImageResizer
            originalWidth={originalImage.naturalWidth}
            originalHeight={originalImage.naturalHeight}
            onResize={handleResize}
          />
        )}
        <div className="relative bg-gray-100 rounded-lg flex items-center justify-center p-4 min-h-[320px]">
          <img
            src={displayedImage}
            alt="Original"
            className="max-w-full max-h-[600px] w-auto h-auto"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Enhanced</h3>
        <div className="relative bg-gray-100 rounded-lg flex items-center justify-center p-4 min-h-[320px]">
          {processing ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : upscaled ? (
            <>
              <img
                src={upscaled}
                alt="Upscaled"
                className="max-w-full max-h-[600px] w-auto h-auto"
                style={{ objectFit: 'contain' }}
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
            <div className="text-gray-400">
              Enhanced image will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
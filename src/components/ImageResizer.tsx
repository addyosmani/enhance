import React, { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';

interface ImageResizerProps {
  originalWidth: number;
  originalHeight: number;
  onResize: (width: number, height: number) => void;
}

export function ImageResizer({ originalWidth, originalHeight, onResize }: ImageResizerProps) {
  const [scale, setScale] = useState(100);
  const [width, setWidth] = useState(originalWidth);
  const [height, setHeight] = useState(originalHeight);
  const [aspectLocked, setAspectLocked] = useState(true);

  const aspectRatio = originalWidth / originalHeight;

  useEffect(() => {
    const newWidth = Math.round((originalWidth * scale) / 100);
    const newHeight = Math.round((originalHeight * scale) / 100);
    setWidth(newWidth);
    setHeight(newHeight);
    onResize(newWidth, newHeight);
  }, [scale, originalWidth, originalHeight, onResize]);

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (aspectLocked) {
      const newHeight = Math.round(newWidth / aspectRatio);
      setHeight(newHeight);
      setScale((newWidth / originalWidth) * 100);
      onResize(newWidth, newHeight);
    } else {
      onResize(newWidth, height);
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (aspectLocked) {
      const newWidth = Math.round(newHeight * aspectRatio);
      setWidth(newWidth);
      setScale((newHeight / originalHeight) * 100);
      onResize(newWidth, newHeight);
    } else {
      onResize(width, newHeight);
    }
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Resize</label>
        <input
          type="range"
          min="1"
          max="100"
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-600 w-12">{scale}%</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-1 space-y-1">
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <input
            type="number"
            value={width}
            onChange={(e) => handleWidthChange(Number(e.target.value))}
            min="1"
            max={originalWidth}
            className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
          />
        </div>
        
        <button
          onClick={() => setAspectLocked(!aspectLocked)}
          className={`mt-5 p-2 rounded-md transition-colors ${
            aspectLocked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          }`}
          title={aspectLocked ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        
        <div className="flex-1 space-y-1">
          <label className="block text-sm font-medium text-gray-700">Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            min="1"
            max={originalHeight}
            className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>
      <div className="block text-sm">Resizing images to be smaller may be needed for MAXIM models</div>

    </div>
  );
}
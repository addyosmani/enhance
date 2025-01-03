import React, { useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void;
  disabled: boolean;
}

const SUPPORTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'image/avif',
  'image/webp'
];

export function ImageDropzone({ onImageSelect, disabled }: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file && SUPPORTED_FORMATS.includes(file.type)) {
        onImageSelect(file);
      }
    },
    [onImageSelect, disabled]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || !e.target.files?.length) return;
      const file = e.target.files[0];
      if (SUPPORTED_FORMATS.includes(file.type)) {
        onImageSelect(file);
      }
    },
    [onImageSelect, disabled]
  );

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`w-full max-w-3xl h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors ${
          disabled
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'border-blue-300 bg-blue-50 hover:bg-blue-100 cursor-pointer'
        }`}
      >
        <Upload className="w-12 h-12 text-blue-500 mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drop your image here or click to upload
        </p>
        <p className="text-sm text-gray-500">Supports PNG, JPEG, AVIF, and WebP files</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/avif,image/webp"
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />
      </div>
    </div>
  );
}
import React from 'react';

interface ScaleSelectorProps {
  scales: number[];
  selectedScale: number;
  onSelectScale: (scale: number) => void;
  disabled: boolean;
}

export function ScaleSelector({
  scales,
  selectedScale,
  onSelectScale,
  disabled
}: ScaleSelectorProps) {
  if (scales.length <= 1) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Select Scale</h4>
      <div className="flex gap-2">
        {scales.map(scale => (
          <button
            key={scale}
            onClick={() => onSelectScale(scale)}
            disabled={disabled}
            className={`px-4 py-2 rounded-md border transition-colors ${
              selectedScale === scale
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {scale}x
          </button>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { Check } from 'lucide-react';
import type { ModelType } from '../types';

interface ModelCardProps {
  model: ModelType;
  isSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

export function ModelCard({ 
  model, 
  isSelected, 
  onSelect, 
  disabled 
}: ModelCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{model.name}</h3>
        {isSelected && (
          <Check className="w-5 h-5 text-blue-500" />
        )}
      </div>
      <p className="text-sm text-gray-600 mt-1">{model.description}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
          {model.size}
        </span>
      </div>
    </button>
  );
}
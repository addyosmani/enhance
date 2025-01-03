import React from 'react';
import { models } from '../lib/models/registry';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => onModelChange(model.id)}
          className={`p-4 rounded-lg border-2 text-left transition-colors
            ${selectedModel === model.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-200'}`}
        >
          <h3 className="font-semibold">{model.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{model.description}</p>
          <p className="text-sm text-gray-500 mt-1">{model.scale}x upscaling</p>
        </button>
      ))}
    </div>
  );
}
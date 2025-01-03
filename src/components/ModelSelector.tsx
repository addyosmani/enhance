import React from 'react';
import { Check } from 'lucide-react';
import { ModelCategorySection } from './ModelCategorySection';
import { MODEL_CATEGORIES } from '../constants';
import type { SelectedModel } from '../types';

interface ModelSelectorProps {
  selectedModel: SelectedModel;
  onSelectModel: (model: SelectedModel) => void;
  disabled: boolean;
}

export function ModelSelector({ 
  selectedModel, 
  onSelectModel, 
  disabled 
}: ModelSelectorProps) {
  return (
    <div className="space-y-8">
      {MODEL_CATEGORIES.map((category) => (
        <ModelCategorySection
          key={category.name}
          category={category}
          selectedModel={selectedModel}
          onSelectModel={onSelectModel}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
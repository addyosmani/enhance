import React from 'react';
import { Check } from 'lucide-react';
import { ModelCard } from './ModelCard';
import { ScaleSelector } from './ScaleSelector';
import type { ModelCategory, SelectedModel } from '../types';

interface ModelCategorySectionProps {
  category: ModelCategory;
  selectedModel: SelectedModel;
  onSelectModel: (model: SelectedModel) => void;
  disabled: boolean;
}

export function ModelCategorySection({
  category,
  selectedModel,
  onSelectModel,
  disabled
}: ModelCategorySectionProps) {
  const selectedModelInCategory = category.models.find(
    model => model.name === selectedModel.type
  );

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.models.map((model) => (
          <ModelCard
            key={model.name}
            model={model}
            isSelected={selectedModel.type === model.name}
            onSelect={() => onSelectModel({ 
              type: model.name, 
              scale: model.scales[0] 
            })}
            disabled={disabled}
          />
        ))}
      </div>

      {selectedModelInCategory && (
        <ScaleSelector
          scales={selectedModelInCategory.scales}
          selectedScale={selectedModel.scale}
          onSelectScale={(scale) => onSelectModel({ 
            ...selectedModel, 
            scale 
          })}
          disabled={disabled}
        />
      )}
    </div>
  );
}
import type { UpscaleModel } from '../types';

const VALID_MODEL_NAMES = ['compact', 'medium', 'hd', '4k'];

export function validateModel(modelName: string): boolean {
  return VALID_MODEL_NAMES.includes(modelName.toLowerCase());
}

export function getModelDisplayName(model: UpscaleModel): string {
  return model.name.toLowerCase();
}
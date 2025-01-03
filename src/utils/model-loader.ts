import { modelRegistry } from './models';

export function getModel(modelType: string, scale: number): any {
  const modelPackage = modelRegistry[modelType];
  if (!modelPackage) {
    throw new Error(`Model package ${modelType} not found`);
  }

  const model = modelPackage[scale];
  if (!model) {
    throw new Error(`Scale ${scale}x not supported for ${modelType}`);
  }

  return model;
}
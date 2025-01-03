import { initializeModelRegistry } from './models';

let modelRegistry: any = null;

export async function initializeModels() {
  if (!modelRegistry) {
    modelRegistry = await initializeModelRegistry();
  }
  return modelRegistry;
}

export async function getModel(modelType: string, scale: number): Promise<any> {
  const models = await initializeModels();
  const modelPackage = models[modelType];
  
  if (!modelPackage) {
    throw new Error(`Model package ${modelType} not found`);
  }

  const model = modelPackage[scale];
  if (!model) {
    throw new Error(`Scale ${scale}x not supported for ${modelType}`);
  }

  return model;
}
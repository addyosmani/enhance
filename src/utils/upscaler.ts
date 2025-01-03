import Upscaler from 'upscaler';
import { getModel } from './model-loader';
import { loadImage } from './image-loader';
import type { SelectedModel } from '../types';

let upscalerInstance: Upscaler | null = null;
let currentModelKey: string = '';

async function getUpscaler(modelSelection: SelectedModel): Promise<Upscaler> {
  const modelKey = `${modelSelection.type}-${modelSelection.scale}`;
  
  if (upscalerInstance && modelKey === currentModelKey) {
    return upscalerInstance;
  }

  try {
    const model = getModel(modelSelection.type, modelSelection.scale);
    upscalerInstance = new Upscaler({
      model,
      patchSize: 128,
      padding: 4
    });

    currentModelKey = modelKey;
    return upscalerInstance;
  } catch (error) {
    console.error('Error initializing upscaler:', error);
    throw new Error('Failed to initialize upscaler');
  }
}

export async function upscaleImage(
  imageUrl: string,
  modelSelection: SelectedModel
): Promise<string> {
  try {
    if (!imageUrl) {
      throw new Error('No image provided');
    }

    const upscaler = await getUpscaler(modelSelection);
    const loadedImg = await loadImage(imageUrl);
    
    const upscaledImage = await upscaler.upscale(loadedImg);
    if (!upscaledImage) {
      throw new Error('Upscaling failed to produce an image');
    }
    
    return upscaledImage;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Upscale error:', errorMessage);
    throw new Error(`Failed to upscale image: ${errorMessage}`);
  }
}
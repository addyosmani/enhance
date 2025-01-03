import Upscaler from 'upscaler';
import { getModel } from './model-loader';
import { isMaximModel } from './model-utils';
import { preprocessMaximImage } from './maxim-preprocessor';
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
    const model = await getModel(modelSelection.type, modelSelection.scale);
    
    upscalerInstance = new Upscaler({
      model,
      patchSize: 64,
      padding: 2,
      progress: (progress: number) => console.log(`Processing: ${Math.round(progress * 100)}%`)
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
    
    // For MAXIM models, preprocess the image
    const img = isMaximModel(modelSelection.type) 
      ? await preprocessMaximImage(imageUrl)
      : await loadImage(imageUrl);
    
    const upscaledImage = await upscaler.upscale(img);
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
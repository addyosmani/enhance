import { loadImage } from './image-loader';
import { MAX_TEXTURE_SIZE, MAX_MAXIM_SIZE, SAFETY_MARGIN } from './constants';
import { isMaximModel, calculateMaxInputSize } from './model-utils';
import { calculateDownscaleFactor, scaleImage } from './image-scaling';
import { validateDimensions } from './size-validator';
import { preprocessMaximImage } from './maxim-preprocessor';

export async function preprocessImage(
  imageUrl: string, 
  modelType: string, 
  scale: number
): Promise<HTMLImageElement> {
  // For MAXIM models, use specialized preprocessing
  if (isMaximModel(modelType)) {
    return preprocessMaximImage(imageUrl);
  }
  
  const img = await loadImage(imageUrl);
  
  // Validate input dimensions
  const validation = validateDimensions(img.naturalWidth, img.naturalHeight);
  if (!validation.valid) {
    throw new Error(validation.reason);
  }

  // Calculate maximum allowed input size based on scale
  const maxAllowedSize = calculateMaxInputSize(scale);

  // Calculate final dimensions after scaling
  const finalWidth = img.naturalWidth * scale;
  const finalHeight = img.naturalHeight * scale;
  const maxTextureSize = MAX_TEXTURE_SIZE * SAFETY_MARGIN;

  // Check if final dimensions would exceed limits
  if (finalWidth > maxTextureSize || finalHeight > maxTextureSize) {
    // Calculate required downscale factor
    const downscaleFactor = calculateDownscaleFactor(
      img.naturalWidth,
      img.naturalHeight,
      Math.floor(maxAllowedSize / scale)
    );

    console.log(`Downscaling image by factor ${downscaleFactor} to prevent exceeding WebGL limits`);
    return scaleImage(img, downscaleFactor);
  }

  return img;
}
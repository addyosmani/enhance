import { MAX_TEXTURE_SIZE, SAFETY_MARGIN, PATCH_SIZE, PATCH_PADDING } from './constants';

export function isMaximModel(modelType: string): boolean {
  return modelType.startsWith('MAXIM');
}

export function calculateMaxInputSize(scale: number): number {
  // Account for patch size, padding, and scale factor
  const effectivePatchSize = PATCH_SIZE + (2 * PATCH_PADDING);
  
  // Calculate max size accounting for final scaled dimensions
  const maxSize = Math.floor((MAX_TEXTURE_SIZE * SAFETY_MARGIN) / scale);
  
  // Ensure size is divisible by effective patch size
  const adjustedSize = Math.floor(maxSize / effectivePatchSize) * effectivePatchSize;
  
  // Add final safety margin
  return Math.floor(adjustedSize * 0.95); // Additional 5% safety margin
}
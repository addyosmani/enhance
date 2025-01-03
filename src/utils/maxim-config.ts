import { getMaxTextureSize } from './webgl-detector';

// Constants for MAXIM models
export const MAXIM_PATCH_SIZE = 64; // Must be multiple of 64
export const MAXIM_PADDING = 2;

// Get safe working dimensions considering WebGL limits
export function getMaximWorkingDimensions() {
  const maxTextureSize = getMaxTextureSize();
  // Use 80% of max texture size for safety margin
  const safeMaxSize = Math.floor(maxTextureSize * 0.8);
  // Ensure it's a multiple of patch size
  return Math.floor(safeMaxSize / MAXIM_PATCH_SIZE) * MAXIM_PATCH_SIZE;
}
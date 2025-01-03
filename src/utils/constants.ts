// WebGL and model-specific constraints
export const MAX_TEXTURE_SIZE = 16384;
export const MAX_MAXIM_SIZE = 1024;

// Safety margins and padding
export const SAFETY_MARGIN = 0.8; // Reduce to 80% for extra safety
export const PATCH_SIZE = 128;
export const PATCH_PADDING = 4;

// Dimension constraints
export const MIN_DIMENSION = 32; // Minimum size to process
export const MAX_DIMENSION = Math.floor(MAX_TEXTURE_SIZE * SAFETY_MARGIN);
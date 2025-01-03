import { MAX_DIMENSION, MIN_DIMENSION } from './constants';

export function validateDimensions(width: number, height: number): {
  valid: boolean;
  reason?: string;
} {
  if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
    return {
      valid: false,
      reason: `Image dimensions must be at least ${MIN_DIMENSION}px`
    };
  }

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    return {
      valid: false,
      reason: `Image dimensions exceed maximum allowed size of ${MAX_DIMENSION}px`
    };
  }

  return { valid: true };
}
// Detect maximum WebGL texture size for the current browser/GPU
export function getMaxTextureSize(): number {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || 
             canvas.getContext('webgl') || 
             canvas.getContext('experimental-webgl');
  
  if (!gl) {
    console.warn('WebGL not supported, falling back to minimum safe size');
    return 4096; // Conservative fallback
  }

  return gl.getParameter(gl.MAX_TEXTURE_SIZE);
}
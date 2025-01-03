// Image scaling calculations and operations
export function calculateDownscaleFactor(
  width: number, 
  height: number, 
  maxSize: number
): number {
  const maxDimension = Math.max(width, height);
  if (maxDimension <= maxSize) return 1;
  
  // Calculate factor needed to fit within limits
  return maxSize / maxDimension;
}

export async function scaleImage(
  img: HTMLImageElement, 
  scale: number
): Promise<HTMLImageElement> {
  if (scale === 1) return img;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Use Math.floor to ensure we stay within limits
  canvas.width = Math.floor(img.naturalWidth * scale);
  canvas.height = Math.floor(img.naturalHeight * scale);

  // Use better quality settings for downscaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const scaledImg = new Image();
  scaledImg.src = canvas.toDataURL('image/png');
  
  return new Promise((resolve, reject) => {
    scaledImg.onload = () => resolve(scaledImg);
    scaledImg.onerror = reject;
  });
}
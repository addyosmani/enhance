export async function resizeImage(
  image: HTMLImageElement,
  targetWidth: number,
  targetHeight: number
): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  // Use high quality image scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
  
  return canvas.toDataURL('image/png');
}
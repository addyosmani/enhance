export async function loadImage(imageUrl: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  // Prevent any automatic scaling or fitting
  img.style.maxWidth = 'none';
  img.style.maxHeight = 'none';
  img.style.objectFit = 'none';

  // Log original dimensions for debugging
  const logDimensions = () => {
    console.log('Loading image with dimensions:', {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.width,
      height: img.height
    });
  };

  return new Promise((resolve, reject) => {
    img.onload = () => {
      logDimensions();
      // Ensure we use the natural dimensions
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
      resolve(img);
    };
    img.onerror = (error) => reject(new Error(`Failed to load image: ${error}`));
    img.src = imageUrl;
  });
}
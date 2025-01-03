export interface UpscaleModel {
  name: string;
  id: string;
  description: string;
  scale: number;
  load(): Promise<void>;
  upscale(imageData: ImageData): Promise<ImageData>;
}

export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  scale: number;
}
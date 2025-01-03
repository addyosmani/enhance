export interface UpscaleModel {
  name: string;
  size: string;
  description: string;
  scale: number;
}

export interface ModelType {
  name: string;
  packageName: string;
  description: string;
  size: string;
  scales: number[];
}

export interface ModelCategory {
  name: string;
  description: string;
  models: ModelType[];
}

export interface ImageState {
  original: string | null;
  upscaled: string | null;
  processing: boolean;
  error: string | null;
}

export interface SelectedModel {
  type: string;
  scale: number;
}
import { UpscaleModel } from './types';
import * as ort from 'onnxruntime-web';

export abstract class BaseModel implements UpscaleModel {
  private static isInitialized = false;

  protected session: ort.InferenceSession | null = null;
  abstract name: string;
  abstract id: string;
  abstract description: string;
  abstract scale: number;
  abstract modelUrl: string;

  private static async initializeOrtEnv() {
    if (!BaseModel.isInitialized) {
      // Set WASM paths before any model operations
      const wasmPaths = {
        wasm: './ort-wasm.wasm',
        wasmSimd: './ort-wasm-simd.wasm',
        wasmThreaded: './ort-wasm-threaded.wasm',
        wasmSimdThreaded: './ort-wasm-simd-threaded.wasm'
      };
      
      Object.assign(ort.env.wasm, wasmPaths);

      // Enable debugging for ONNX Runtime
      ort.env.debug = true;
      ort.env.logLevel = 'verbose';

      BaseModel.isInitialized = true;
    }
  }

  async load(): Promise<void> {
    if (!this.session) {
      try {
        await BaseModel.initializeOrtEnv();
        this.session = await ort.InferenceSession.create(this.modelUrl, {
          executionProviders: ['wasm'],
          graphOptimizationLevel: 'all'
        });
      } catch (err: unknown) {
        const error = err as Error;
        console.error('Error loading model:', error);
        throw new Error(`Failed to load model ${this.name}: ${error.message}`);
      }
    }
  }

  protected async preprocessImage(imageData: ImageData): Promise<ort.Tensor> {
    // Convert ImageData to float32 tensor, normalize to [0, 1]
    const data = new Float32Array(imageData.data.length / 4 * 3);
    for (let i = 0, j = 0; i < imageData.data.length; i += 4, j += 3) {
      data[j] = imageData.data[i] / 255.0;     // R
      data[j + 1] = imageData.data[i + 1] / 255.0; // G
      data[j + 2] = imageData.data[i + 2] / 255.0; // B
    }
    
    return new ort.Tensor(
      'float32',
      data,
      [1, 3, imageData.height, imageData.width]
    );
  }

  protected async postprocessTensor(tensor: ort.Tensor, width: number, height: number): Promise<ImageData> {
    const data = new Uint8ClampedArray(width * height * 4);
    const floatData = tensor.data as Float32Array;
    
    for (let i = 0, j = 0; i < floatData.length; i += 3, j += 4) {
      data[j] = Math.round(floatData[i] * 255);     // R
      data[j + 1] = Math.round(floatData[i + 1] * 255); // G
      data[j + 2] = Math.round(floatData[i + 2] * 255); // B
      data[j + 3] = 255; // A
    }
    
    return new ImageData(data, width, height);
  }

  abstract upscale(imageData: ImageData): Promise<ImageData>;
}
import { BaseModel } from './base-model';
import * as ort from 'onnxruntime-web';

export class RealESRGAN extends BaseModel {
  name = 'Real-ESRGAN';
  id = 'real-esrgan';
  description = 'Excellent for photo restoration';
  scale = 4;
  modelUrl = './models/RealESRGAN_x4.onnx';

  async upscale(imageData: ImageData): Promise<ImageData> {
    if (!this.session) {
      await this.load();
    }

    const inputTensor = await this.preprocessImage(imageData);
    const outputs = await this.session!.run({ input: inputTensor });
    const outputTensor = outputs.output;

    return this.postprocessTensor(
      outputTensor,
      imageData.width * this.scale,
      imageData.height * this.scale
    );
  }
}
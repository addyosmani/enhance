import { BaseModel } from './base-model';
import * as ort from 'onnxruntime-web';

export class SPAN extends BaseModel {
  name = 'SPAN';
  id = 'span';
  description = 'Fast and lightweight upscaling';
  scale = 2;
  modelUrl = './models/span_small_x2.onnx';

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
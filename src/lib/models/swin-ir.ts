import { BaseModel } from './base-model';
import * as ort from 'onnxruntime-web';

export class SwinIR extends BaseModel {
  name = 'SwinIR';
  id = 'swin-ir';
  description = 'Best for general purpose upscaling';
  scale = 4;
  modelUrl = './models/swin_ir_small_x4.onnx';

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
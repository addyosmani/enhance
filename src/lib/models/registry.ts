import { ModelInfo } from './types';
import { SwinIR } from './swin-ir';
import { RealESRGAN } from './real-esrgan';
import { SPAN } from './span';

export const models: ModelInfo[] = [
  {
    id: 'swin-ir',
    name: 'SwinIR',
    description: 'Best for general purpose upscaling',
    scale: 4
  },
  {
    id: 'real-esrgan',
    name: 'Real-ESRGAN',
    description: 'Excellent for photo restoration',
    scale: 4
  },
  {
    id: 'span',
    name: 'SPAN',
    description: 'Fast and lightweight upscaling',
    scale: 2
  }
];

export async function getModel(id: string) {
  switch (id) {
    case 'swin-ir':
      return new SwinIR();
    case 'real-esrgan':
      return new RealESRGAN();
    case 'span':
      return new SPAN();
    default:
      throw new Error(`Unknown model: ${id}`);
  }
}
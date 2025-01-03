import type { ModelCategory } from './types';

export const MODEL_CATEGORIES: ModelCategory[] = [
  {
    name: 'Upscaling',
    description: 'Increase image resolution while maintaining quality',
    models: [
      {
        name: 'ESRGAN Slim',
        packageName: '@upscalerjs/esrgan-slim',
        description: 'Fast, lightweight model suitable for most images',
        size: '2.5MB',
        scales: [2, 3, 4]
      },
      {
        name: 'ESRGAN Medium',
        packageName: '@upscalerjs/esrgan-medium',
        description: 'Balanced performance and quality',
        size: '5MB',
        scales: [2, 3, 4]
      },
      {
        name: 'ESRGAN Thick',
        packageName: '@upscalerjs/esrgan-thick',
        description: 'High-quality upscaling with better detail preservation',
        size: '12MB',
        scales: [2, 3, 4, 8]
      },
      {
        name: 'Default',
        packageName: '@upscalerjs/default-model',
        description: 'Standard upscaling model',
        size: '2MB',
        scales: [2, 4]
      }
    ]
  },
  {
    name: 'Enhancement',
    description: 'Fix common image quality issues',
    models: [
      {
        name: 'MAXIM Deblurring',
        packageName: '@upscalerjs/maxim-deblurring/64',
        description: 'Remove motion blur and out-of-focus blur',
        size: '8MB',
        scales: [1]
      },
      {
        name: 'MAXIM Denoising',
        packageName: '@upscalerjs/maxim-denoising',
        description: 'Remove image noise and grain',
        size: '8MB',
        scales: [1]
      },
      {
        name: 'MAXIM Low Light',
        packageName: '@upscalerjs/maxim-enhancement',
        description: 'Enhance dark or poorly lit images',
        size: '8MB',
        scales: [1]
      },
      {
        name: 'MAXIM Retouching',
        packageName: '@upscalerjs/maxim-retouching',
        description: 'Automatic photo retouching and enhancement',
        size: '8MB',
        scales: [1]
      },
      {
        name: 'MAXIM Deraining',
        packageName: '@upscalerjs/maxim-deraining',
        description: 'Remove rain drops and streaks from images',
        size: '8MB',
        scales: [1]
      },
      {
        name: 'MAXIM Dehazing',
        packageName: '@upscalerjs/maxim-dehazing-indoor',
        description: 'Remove haze and fog from indoor images',
        size: '8MB',
        scales: [1]
      }
    ]
  }
];
import * as tf from '@tensorflow/tfjs';
import { deblurring } from './deblurring';
import { dehazing } from './dehazing';
import { denoising } from './denoising';
import { deraining } from './deraining';
import { enhancement } from './enhancement';
import { retouching } from './retouching';

// Initialize TensorFlow.js
await tf.ready();

export const maximModels = {
  'MAXIM Deblurring': { 1: deblurring },
  'MAXIM Dehazing': { 1: dehazing },
  'MAXIM Denoising': { 1: denoising },
  'MAXIM Deraining': { 1: deraining },
  'MAXIM Low Light': { 1: enhancement },
  'MAXIM Retouching': { 1: retouching }
};
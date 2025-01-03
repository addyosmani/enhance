import { slimModels } from './slim';
import { mediumModels } from './medium';
import { thickModels } from './thick';
import { defaultModels } from './default';
import { maximModels } from './maxim';

export const modelRegistry = {
  ...maximModels,
  'ESRGAN Slim': slimModels,
  'ESRGAN Medium': mediumModels,
  'ESRGAN Thick': thickModels,
  'Default': defaultModels
};
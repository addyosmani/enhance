import { slimModels } from './slim';
import { mediumModels } from './medium';
import { thickModels } from './thick';
import { defaultModels } from './default';
import { initializeMaximModels } from './maxim';

export async function initializeModelRegistry() {
  const maximModels = await initializeMaximModels();
  
  return {
    ...maximModels,
    'ESRGAN Slim': slimModels,
    'ESRGAN Medium': mediumModels,
    'ESRGAN Thick': thickModels,
    'Default': defaultModels
  };
}
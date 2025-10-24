import { Animal } from './common/Animal';
import { Plant } from './common/Plant';

export interface AbstractFactory {
  createAnimal(): Animal;
  createPlant(): Plant;
}
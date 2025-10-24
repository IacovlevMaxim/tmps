import { AbstractFactory } from './AbstractFactory';
import { Animal } from './common/Animal';
import { Plant } from './common/Plant';
import { Cat } from './common/Cat';
import { Flower } from './common/Flower';

export class AbstractFactoryTwo implements AbstractFactory {
  createAnimal(): Animal {
    return new Cat(); // Garden animals
  }

  createPlant(): Plant {
    return new Flower(); // Garden plants
  }
}
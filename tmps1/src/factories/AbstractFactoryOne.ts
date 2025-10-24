import { AbstractFactory } from './AbstractFactory';
import { Animal } from './common/Animal';
import { Plant } from './common/Plant';
import { Dog } from './common/Dog';
import { Tree } from './common/Tree';

export class AbstractFactoryOne implements AbstractFactory {
  createAnimal(): Animal {
    return new Dog(); // Forest animals
  }

  createPlant(): Plant {
    return new Tree(); // Forest plants
  }
}
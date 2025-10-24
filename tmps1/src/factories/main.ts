import { Factory } from './Factory';
import { AbstractFactory } from './AbstractFactory';
import { AbstractFactoryOne } from './AbstractFactoryOne';
import { AbstractFactoryTwo } from './AbstractFactoryTwo';

export function runFactoryDemo(): void {
  console.log('Factory Pattern Demo ');
  
  const factory = new Factory();

  const dog = factory.createAnimal('dog');
  dog?.makeSound();

  const cat = factory.createAnimal('cat');
  cat?.makeSound();

  const tree = factory.createPlant('tree');
  tree?.grow();

  const flower = factory.createPlant('flower');
  flower?.grow();

  console.log('\nAbstract Factory Pattern Demo');
  
  // Abstract Factory
  const factoryOne: AbstractFactory = new AbstractFactoryOne();
  const factoryTwo: AbstractFactory = new AbstractFactoryTwo();

  const forestAnimal = factoryOne.createAnimal();
  const forestPlant = factoryOne.createPlant();

  const gardenAnimal = factoryTwo.createAnimal();
  const gardenPlant = factoryTwo.createPlant();

  console.log('\nForest ecosystem:');
  forestAnimal.makeSound();
  forestPlant.grow();

  console.log('\nGarden ecosystem:');
  gardenAnimal.makeSound();
  gardenPlant.grow();
}

export default runFactoryDemo;
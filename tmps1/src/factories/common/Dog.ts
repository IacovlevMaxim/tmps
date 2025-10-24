import { Animal } from './Animal';

export class Dog implements Animal {
  makeSound(): void {
    console.log('Woof! Woof!');
  }
}
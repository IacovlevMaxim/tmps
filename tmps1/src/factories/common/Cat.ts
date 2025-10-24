import { Animal } from './Animal';

export class Cat implements Animal {
  makeSound(): void {
    console.log('Meow! Meow!');
  }
}
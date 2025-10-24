import { Plant } from './Plant';

export class Flower implements Plant {
  grow(): void {
    console.log('Flower is blooming...');
  }
}
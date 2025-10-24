import { Plant } from './Plant';

export class Tree implements Plant {
  grow(): void {
    console.log('Tree is growing...');
  }
}
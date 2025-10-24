import { Animal } from './common/Animal';
import { Plant } from './common/Plant';
import { AnimalCreationStrategy, PlantCreationStrategy } from './interfaces/CreationStrategy';
import {
    DogCreationStrategy,
    CatCreationStrategy,
    TreeCreationStrategy,
    FlowerCreationStrategy,
    DefaultAnimalCreationStrategy,
    DefaultPlantCreationStrategy
} from './Strategies';

export class Factory {
  private animalStrategies: AnimalCreationStrategy[] = [
    new DogCreationStrategy(),
    new CatCreationStrategy(),
    new DefaultAnimalCreationStrategy()
  ];

  private plantStrategies: PlantCreationStrategy[] = [
    new TreeCreationStrategy(),
    new FlowerCreationStrategy(),
    new DefaultPlantCreationStrategy()
  ];

  createAnimal(animalType: string): Animal | null {
    const strategy = this.animalStrategies.find(s => s.canHandle(animalType));
    try {
      return strategy?.create() || null;
    } catch {
      return null;
    }
  }

  createPlant(plantType: string): Plant | null {
    const strategy = this.plantStrategies.find(s => s.canHandle(plantType));
    try {
      return strategy?.create() || null;
    } catch {
      return null;
    }
  }
}
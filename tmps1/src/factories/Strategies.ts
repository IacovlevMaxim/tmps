import { Animal } from './common/Animal';
import { Plant } from './common/Plant';
import { Dog } from './common/Dog';
import { Cat } from './common/Cat';
import { Tree } from './common/Tree';
import { Flower } from './common/Flower';
import { AnimalCreationStrategy, PlantCreationStrategy } from './interfaces/CreationStrategy';

export class DogCreationStrategy implements AnimalCreationStrategy {
    canHandle(type: string): boolean {
        return type.toLowerCase() === 'dog';
    }

    create(): Animal {
        return new Dog();
    }
}

export class CatCreationStrategy implements AnimalCreationStrategy {
    canHandle(type: string): boolean {
        return type.toLowerCase() === 'cat';
    }

    create(): Animal {
        return new Cat();
    }
}

export class TreeCreationStrategy implements PlantCreationStrategy {
    canHandle(type: string): boolean {
        return type.toLowerCase() === 'tree';
    }

    create(): Plant {
        return new Tree();
    }
}

export class FlowerCreationStrategy implements PlantCreationStrategy {
    canHandle(type: string): boolean {
        return type.toLowerCase() === 'flower';
    }

    create(): Plant {
        return new Flower();
    }
}

export class DefaultAnimalCreationStrategy implements AnimalCreationStrategy {
    canHandle(_type: string): boolean {
        return true; 
    }

    create(): Animal {
        throw new Error('Unknown animal type');
    }
}

export class DefaultPlantCreationStrategy implements PlantCreationStrategy {
    canHandle(_type: string): boolean {
        return true; 
    }

    create(): Plant {
        throw new Error('Unknown plant type');
    }
}

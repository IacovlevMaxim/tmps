import { Animal } from '../common/Animal';
import { Plant } from '../common/Plant';

export interface AnimalCreationStrategy {
    canHandle(type: string): boolean;
    create(): Animal;
}

export interface PlantCreationStrategy {
    canHandle(type: string): boolean;
    create(): Plant;
}

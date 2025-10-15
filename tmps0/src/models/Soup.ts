import { Food } from './Food.js';

/**
 * Demonstrates Open/Closed Principle
 */
export class Soup extends Food {
    private _ingredients: string[];
    private _brothType: string;

    constructor(name: string, brothType: string = 'vegetable') {
        super(name, 'Comfort Food');
        this._ingredients = ['water', 'salt'];
        this._brothType = brothType;
        this._portions = 3;
    }

    get ingredients(): string[] {
        return [...this._ingredients];
    }

    get brothType(): string {
        return this._brothType;
    }

    getOptimalTemperature(): number {
        return 70;
    }

    getRequiredCookingTime(): number {
        return 25; 
    }

    addIngredient(ingredient: string): string {
        this._ingredients.push(ingredient);
        return `Added ${ingredient} to ${this._name}`;
    }

    displayInfo(): void {
        console.log(`${this._name} Information:`);
        console.log(`Category: ${this._category}`);
        console.log(`Broth Type: ${this._brothType}`);
        console.log(`Ingredients: ${this._ingredients.join(', ')}`);
        console.log(`Temperature: ${this._temperature}°C`);
        console.log(`Quality: ${this._quality}`);
        console.log(`Cooking Time: ${this._cookingTime} minutes`);
        console.log(`Portions: ${this._portions}`);
        console.log(`Required Cooking Time: ${this.getRequiredCookingTime()} minutes`);
        console.log(`Optimal Temperature: ${this.getOptimalTemperature()}°C`);
        console.log('---------------------------\n');
    }
}
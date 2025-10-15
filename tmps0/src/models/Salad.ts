import { Food } from './Food.js';

/**
 * Open/Closed Principle
 * Extends Food without modifying the base class
 */
export class Salad extends Food {
    private _ingredients: string[];
    private _dressing: string;

    constructor(name: string, dressing: string = 'vinaigrette') {
        super(name, 'Healthy');
        this._ingredients = ['lettuce', 'tomatoes'];
        this._dressing = dressing;
        this._portions = 2;
    }

    get ingredients(): string[] {
        return [...this._ingredients];
    }

    get dressing(): string {
        return this._dressing;
    }

    getOptimalTemperature(): number {
        return 5;
    }

    getRequiredCookingTime(): number {
        return 0;
    }

    addIngredient(ingredient: string): string {
        this._ingredients.push(ingredient);
        return `Added ${ingredient} to ${this._name}`;
    }

    displayInfo(): void {
        console.log(`${this._name} Information:`);
        console.log(`Category: ${this._category}`);
        console.log(`Ingredients: ${this._ingredients.join(', ')}`);
        console.log(`Dressing: ${this._dressing}`);
        console.log(`Temperature: ${this._temperature}°C`);
        console.log(`Quality: ${this._quality}`);
        console.log(`Cooking Time: ${this._cookingTime} minutes (no cooking needed)`);
        console.log(`Portions: ${this._portions}`);
        console.log(`Required Cooking Time: ${this.getRequiredCookingTime()} minutes`);
        console.log(`Optimal Temperature: ${this.getOptimalTemperature()}°C`);
        console.log('---------------------------\n');
    }
}
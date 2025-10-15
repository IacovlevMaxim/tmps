import { Food } from './Food.js';

/**
 * Open/Closed Principle
 * Extends Food without modifying the base class
 */
export class Pizza extends Food {
    private _toppings: string[];
    private _size: 'small' | 'medium' | 'large';

    constructor(name: string, size: 'small' | 'medium' | 'large' = 'medium') {
        super(name, 'Italian');
        this._toppings = ['cheese', 'tomato sauce'];
        this._size = size;
        this._portions = size === 'small' ? 2 : size === 'medium' ? 4 : 6;
    }

    get toppings(): string[] {
        return [...this._toppings];
    }

    get size(): string {
        return this._size;
    }

    getOptimalTemperature(): number {
        return 65;
    }

    getRequiredCookingTime(): number {
        return this._size === 'small' ? 10 : this._size === 'medium' ? 15 : 20;
    }

    addTopping(topping: string): string {
        this._toppings.push(topping);
        return `Added ${topping} to ${this._name}`;
    }

    displayInfo(): void {
        console.log(`${this._name} Information:`);
        console.log(`Category: ${this._category}`);
        console.log(`Size: ${this._size}`);
        console.log(`Toppings: ${this._toppings.join(', ')}`);
        console.log(`Temperature: ${this._temperature}°C`);
        console.log(`Quality: ${this._quality}`);
        console.log(`Cooking Time: ${this._cookingTime} minutes`);
        console.log(`Portions: ${this._portions}`);
        console.log(`Required Cooking Time: ${this.getRequiredCookingTime()} minutes`);
        console.log(`Optimal Temperature: ${this.getOptimalTemperature()}°C`);
        console.log('---------------------------\n');
    }
}
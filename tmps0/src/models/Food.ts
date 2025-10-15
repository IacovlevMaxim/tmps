export abstract class Food {
    protected _name: string;
    protected _category: string;
    protected _temperature: number; // in Celsius
    protected _quality: 'fresh' | 'good' | 'stale' | 'spoiled' | 'excellent';
    protected _cookingTime: number; // in minutes
    protected _portions: number;

    constructor(name: string, category: string) {
        this._name = name;
        this._category = category;
        this._temperature = 20; // room temperature
        this._quality = 'fresh';
        this._cookingTime = 0;
        this._portions = 1;
    }

    get name(): string {
        return this._name;
    }

    get category(): string {
        return this._category;
    }

    get temperature(): number {
        return this._temperature;
    }

    get quality(): string {
        return this._quality;
    }

    get cookingTime(): number {
        return this._cookingTime;
    }

    get portions(): number {
        return this._portions;
    }

    setTemperature(temp: number): void {
        this._temperature = temp;
    }

    setQuality(quality: 'fresh' | 'good' | 'stale' | 'spoiled' | 'excellent'): void {
        this._quality = quality;
    }

    cook(minutes: number): void {
        this._cookingTime += minutes;
    }

    displayInfo(): void {
        console.log(`${this._name} Information:`);
        console.log(`Category: ${this._category}`);
        console.log(`Temperature: ${this._temperature}°C`);
        console.log(`Quality: ${this._quality}`);
        console.log(`Cooking Time: ${this._cookingTime} minutes`);
        console.log(`Portions: ${this._portions}`);
        console.log(`Required Cooking Time: ${this.getRequiredCookingTime()} minutes`);
        console.log(`Optimal Temperature: ${this.getOptimalTemperature()}°C`);
        console.log('---------------------------\n');
    }

    abstract getOptimalTemperature(): number;
    abstract getRequiredCookingTime(): number;
}
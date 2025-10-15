# Topic: *SOLID Principles Implementation*
## Author: *Iacovlev Maxim*
------
## Objectives:
__1. Study and understand the core SOLID design principles.__

__2. Choose a domain area and design a system that demonstrates proper application of SOLID principles.__

__3. Implement a sample project that showcases Single Responsibility, Open/Closed, and Dependency Inversion principles.__

## Some Theory:
SOLID is an acronym that represents five fundamental principles of object-oriented programming and design. These principles, when applied together, make it more likely that a programmer will create a system that is easy to maintain and extend over time. They promote code reusability, reduce coupling, and increase cohesion within software systems.

The five SOLID principles are:
   * Single Responsibility Principle (SRP)
   * Open/Closed Principle (OCP)
   * Liskov Substitution Principle (LSP)
   * Interface Segregation Principle (ISP)
   * Dependency Inversion Principle (DIP)

For this project, we focus on three core principles that form the foundation of clean, maintainable code architecture.

## Main tasks:
__1. Choose an OO programming language and a suitable development environment.__

__2. Select a domain area for the sample project (cafeteria operations system).__

__3. Design and implement classes that demonstrate proper separation of concerns.__

__4. Apply at least 3 SOLID principles with clear examples and explanations.__

## Solution:

I implemented a **Cafeteria Operations Management System** that demonstrates three key SOLID principles through a food preparation and serving workflow.

### Domain Overview:
The system manages different types of food items (Pizza, Salad, Soup) through various cafeteria services including cooking, serving, and quality control. The architecture demonstrates how proper principle application creates flexible, maintainable code.

#### Single Responsibility Principle (SRP):
Each class in the system has a single, well-defined responsibility:

**Food Base Class:**
```typescript
export abstract class Food {
    protected _name: string;
    protected _category: string;
    protected _temperature: number;
    protected _quality: 'fresh' | 'good' | 'stale' | 'spoiled';
    
    constructor(name: string, category: string) {
        this._name = name;
        this._category = category;
        this._temperature = 20; // room temperature
        this._quality = 'fresh';
    }
    
    // Only responsible for food data management
    abstract getRequiredCookingTime(): number;
    abstract displayInfo(): void;
}
```

**Specialized Services:**
```typescript
// Only responsible for cooking operations
export class OvenCookingService implements ICookingService {
    cookFood(food: Food): string {
        return `Cooking ${food.name} in the oven at 200°C`;
    }
}

// Only responsible for serving operations  
export class TableServingService implements IServingService {
    serveFood(food: Food): string {
        return `Serving ${food.name} at table temperature`;
    }
}

// Only responsible for quality assessment
export class FoodQualityControl implements IQualityControl {
    checkQuality(food: Food): string {
        return `Quality check: ${food.name} is ${food.quality}`;
    }
}
```

Each class focuses on a single aspect of cafeteria operations, making them easier to maintain and test.

#### Open/Closed Principle (OCP):
The system is designed to be open for extension but closed for modification. New food types can be added without changing existing code:

**Base Food Class (Closed for modification):**
```typescript
export abstract class Food {
    // Core functionality that doesn't change
    protected _name: string;
    protected _category: string;
    
    // Abstract methods that concrete classes must implement
    abstract getRequiredCookingTime(): number;
    abstract displayInfo(): void;
}
```

**Extended Food Types (Open for extension):**
```typescript
export class Pizza extends Food {
    private size: string;
    private toppings: string[] = [];

    constructor(name: string, size: string) {
        super(name, 'Italian');
        this.size = size;
    }

    getRequiredCookingTime(): number {
        return this.size === 'large' ? 15 : 12;
    }

    // Pizza-specific functionality
    addTopping(topping: string): string {
        this.toppings.push(topping);
        return `Added ${topping} to ${this.name}`;
    }
}

export class Salad extends Food {
    private dressing: string;
    private ingredients: string[] = [];

    constructor(name: string, dressing: string) {
        super(name, 'Healthy');
        this.dressing = dressing;
    }

    getRequiredCookingTime(): number {
        return 0; // No cooking required
    }

    // Salad-specific functionality
    addIngredient(ingredient: string): string {
        this.ingredients.push(ingredient);
        return `Added ${ingredient} to ${this.name}`;
    }
}
```

New food types like `Burger`, `Pasta`, or `Dessert` can be added by extending the `Food` class without modifying any existing code.

#### Dependency Inversion Principle (DIP):
High-level modules depend on abstractions rather than concrete implementations:

**Interface Abstractions:**
```typescript
export interface ICookingService {
    cookFood(food: Food): string;
    checkCookingStatus(food: Food): string;
}

export interface IServingService {
    serveFood(food: Food): string;
    checkTemperature(food: Food): string;
}

export interface IQualityControl {
    checkQuality(food: Food): string;
    getRecommendations(food: Food): string[];
}
```

**High-level Coordinator (Depends on abstractions):**
```typescript
export class CafeteriaOperationsCoordinator implements ICafeteriaCoordinator {
    constructor(
        private cookingService: ICookingService,       // Interface, not concrete class
        private servingService: IServingService,       // Interface, not concrete class
        private qualityControl: IQualityControl        // Interface, not concrete class
    ) {}

    processOrder(food: Food): string[] {
        const orderActions: string[] = [];
        
        // Uses abstractions - can work with any implementation
        const cookingResult = this.cookingService.cookFood(food);
        const qualityCheck = this.qualityControl.checkQuality(food);
        const servingResult = this.servingService.serveFood(food);
        
        return [cookingResult, qualityCheck, servingResult];
    }

    // Demonstrates dependency injection - can swap implementations at runtime
    updateCookingService(newCookingService: ICookingService): void {
        this.cookingService = newCookingService;
    }
}
```

**Usage Example:**
```typescript
// Different implementations can be injected
const ovenService = new OvenCookingService();
const stovetopService = new StovetopCookingService();
const servingService = new TableServingService();
const qualityControl = new FoodQualityControl();

// High-level module depends on abstractions
const coordinator = new CafeteriaOperationsCoordinator(
    ovenService,      // Can be swapped with stovetopService
    servingService,
    qualityControl
);

// Services can be swapped at runtime
coordinator.updateCookingService(stovetopService);
```

## Conclusion:

This cafeteria operations system demonstrates how proper application of SOLID principles creates a flexible, maintainable architecture. The Single Responsibility Principle ensures each class has a focused purpose, the Open/Closed Principle allows for easy extension without modification, and the Dependency Inversion Principle promotes loose coupling through abstraction-based design. These principles work together to create a robust foundation for scalable software systems.
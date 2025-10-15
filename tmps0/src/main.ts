import { Pizza } from './models/Pizza.js';
import { Salad } from './models/Salad.js';
import { Soup } from './models/Soup.js';
import { OvenCookingService } from './services/OvenCookingService.js';
import { StovetopCookingService } from './services/StovetopCookingService.js';
import { TableServingService } from './services/TableServingService.js';
import { FoodQualityControl } from './services/FoodQualityControl.js';
import { CafeteriaOperationsCoordinator } from './services/CafeteriaOperationsCoordinator.js';

async function demonstrateSOLIDPrinciples(): Promise<void> {
    console.log('\nCreating Food Items (Open/Closed Principle):');
    const pizza = new Pizza('Margherita Pizza', 'large');
    const salad = new Salad('Caesar Salad', 'ranch');
    const soup = new Soup('Tomato Soup', 'vegetable');

    pizza.displayInfo();
    salad.displayInfo();
    soup.displayInfo();

    const ovenService = new OvenCookingService();
    const stovetopService = new StovetopCookingService();
    const servingService = new TableServingService();
    const qualityControl = new FoodQualityControl();

    //Dependency Injection
    const coordinator = new CafeteriaOperationsCoordinator(
        ovenService,
        servingService,
        qualityControl
    );

    //Food-specific behaviors
    console.log('\nFood-Specific Behaviors (Open/Closed):');
    console.log(pizza.addTopping('pepperoni'));
    console.log(salad.addIngredient('croutons'));
    console.log(soup.addIngredient('herbs'));

    // Process orders
    console.log('\nProcessing Orders:');
    const foods = [pizza, salad, soup];
    
    for (const food of foods) {
        console.log(`\nProcessing ${food.name}:`);
        const actions = coordinator.processOrder(food);
        actions.forEach(action => console.log(`  ${action}`));
    }

    console.log('\nSwapping Services (Dependency Inversion):');
    coordinator.updateCookingService(stovetopService);
    console.log('Switched to stovetop cooking');
}

demonstrateSOLIDPrinciples().catch(console.error);
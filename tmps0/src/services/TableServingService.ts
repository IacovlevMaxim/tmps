import { Food } from '../models/Food.js';
import { OrderHistory } from '../models/OrderHistory.js';
import { IServingService } from '../interfaces/CafeteriaServices.js';

/**
 * Dependency Inversion - implements the abstraction
 */
export class TableServingService implements IServingService {
    private orderRecords: Map<Food, OrderHistory> = new Map();

    serveFood(food: Food): string {
        const orderRecord = this.getOrCreateOrderRecord(food);
        
        if (food.cookingTime < food.getRequiredCookingTime()) {
            return `${food.name} is not ready yet - still needs cooking!`;
        }
        
        orderRecord.recordServing(food.name);
        return `${food.name} served to table - ${food.portions} portions available`;
    }

    checkTemperature(food: Food): string {
        const optimalTemp = food.getOptimalTemperature();
        const currentTemp = food.temperature;
        
        if (Math.abs(currentTemp - optimalTemp) <= 5) {
            return `${food.name} is at optimal serving temperature (${currentTemp}°C)`;
        } else if (currentTemp < optimalTemp - 10) {
            return `${food.name} is too cold (${currentTemp}°C) - needs reheating`;
        } else if (currentTemp > optimalTemp + 10) {
            return `${food.name} is too hot (${currentTemp}°C) - let it cool down`;
        }
        
        return `${food.name} temperature is acceptable (${currentTemp}°C)`;
    }

    private getOrCreateOrderRecord(food: Food): OrderHistory {
        if (!this.orderRecords.has(food)) {
            this.orderRecords.set(food, new OrderHistory());
        }
        return this.orderRecords.get(food)!;
    }
}
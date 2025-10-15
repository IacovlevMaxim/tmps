import { Food } from '../models/Food.js';
import { OrderHistory } from '../models/OrderHistory.js';
import { ICookingService } from '../interfaces/CafeteriaServices.js';

/**
 * Dependency Inversion
 */
export class OvenCookingService implements ICookingService {
    private orderRecords: Map<Food, OrderHistory> = new Map();

    cookFood(food: Food): string {
        const orderRecord = this.getOrCreateOrderRecord(food);
        const requiredTime = food.getRequiredCookingTime();
        
        if (requiredTime === 0) {
            return `${food.name} doesn't need cooking - it's ready to serve!`;
        }
        
        food.cook(requiredTime);
        food.setTemperature(food.getOptimalTemperature());
        orderRecord.recordCooking(food.name);
        
        return `Oven cooked ${food.name} for ${requiredTime} minutes. Temperature: ${food.temperature}°C`;
    }

    checkCookingStatus(food: Food): string {
        const requiredTime = food.getRequiredCookingTime();
        const currentTime = food.cookingTime;
        
        if (requiredTime === 0) {
            return `${food.name} doesn't require cooking`;
        }
        
        if (currentTime >= requiredTime) {
            return `${food.name} is fully cooked (${currentTime}/${requiredTime} minutes)`;
        }
        
        return `${food.name} needs ${requiredTime - currentTime} more minutes of cooking`;
    }

    private getOrCreateOrderRecord(food: Food): OrderHistory {
        if (!this.orderRecords.has(food)) {
            this.orderRecords.set(food, new OrderHistory());
        }
        return this.orderRecords.get(food)!;
    }
}
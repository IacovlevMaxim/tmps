import { Food } from '../models/Food.js';
import { ICookingService } from '../interfaces/CafeteriaServices.js';

/**
 * Again Dependency Inversion
 */
export class StovetopCookingService implements ICookingService {
    private cookingLog: { food: Food; date: Date; method: string }[] = [];

    cookFood(food: Food): string {
        const requiredTime = food.getRequiredCookingTime();
        
        if (requiredTime === 0) {
            return `${food.name} doesn't need cooking - ready to serve!`;
        }
        
        const actualTime = requiredTime + Math.floor(Math.random() * 5) - 2; // ±2 minutes variation
        food.cook(actualTime);
        food.setTemperature(food.getOptimalTemperature() - 5);
        
        this.cookingLog.push({
            food,
            date: new Date(),
            method: 'stovetop'
        });

        return `Stovetop cooked ${food.name} for ${actualTime} minutes. Temperature: ${food.temperature}°C`;
    }

    checkCookingStatus(food: Food): string {
        const requiredTime = food.getRequiredCookingTime();
        const currentTime = food.cookingTime;
        
        if (requiredTime === 0) {
            return `${food.name} is ready - no cooking needed`;
        }
        
        if (currentTime >= requiredTime) {
            return `${food.name} is done cooking on stovetop`;
        }
        
        return `${food.name} needs more stovetop cooking time`;
    }
}
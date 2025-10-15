import { Food } from '../models/Food.js';
import { 
    ICafeteriaCoordinator, 
    ICookingService, 
    IServingService, 
    IQualityControl,
    FoodStatus
} from '../interfaces/CafeteriaServices.js';

/**
 * Demonstrates Dependency Inversion Principle
 * Depends on abstractions (interfaces) 
 */
export class CafeteriaOperationsCoordinator implements ICafeteriaCoordinator {
    constructor(
        private cookingService: ICookingService,
        private servingService: IServingService,
        private qualityControl: IQualityControl
    ) {
    }

    processOrder(food: Food): string[] {
        const orderActions: string[] = [];

        const cookingStatus = this.cookingService.checkCookingStatus(food);
        orderActions.push(cookingStatus);

        if (food.cookingTime < food.getRequiredCookingTime()) {
            const cookingResult = this.cookingService.cookFood(food);
            orderActions.push(cookingResult);
        }

        const qualityCheck = this.qualityControl.checkQuality(food);
        orderActions.push(qualityCheck);

        const recommendations = this.qualityControl.getRecommendations(food);
        if (recommendations.length > 0) {
            orderActions.push(`Recommendations: ${recommendations.join(', ')}`);
        }

        if (food.quality !== 'spoiled') {
            const servingResult = this.servingService.serveFood(food);
            orderActions.push(servingResult);
            
            const tempCheck = this.servingService.checkTemperature(food);
            orderActions.push(tempCheck);
        }

        return orderActions;
    }

    getFoodStatus(food: Food): FoodStatus {
        const requiredTime = food.getRequiredCookingTime();
        const currentTime = food.cookingTime;
        const temp = food.temperature;
        const optimalTemp = food.getOptimalTemperature();

        let cookingStatus: FoodStatus['cookingStatus'] = 'raw';
        if (requiredTime === 0) cookingStatus = 'ready';
        else if (currentTime >= requiredTime) cookingStatus = 'ready';
        else if (currentTime > 0) cookingStatus = 'cooking';
        else if (currentTime > requiredTime * 1.5) cookingStatus = 'overcooked';

        let temperature: FoodStatus['temperature'] = 'cold';
        if (Math.abs(temp - optimalTemp) <= 5) temperature = 'optimal';
        else if (temp >= optimalTemp - 10) temperature = 'warm';
        else if (temp >= optimalTemp + 10) temperature = 'hot';

        const readyToServe = cookingStatus === 'ready' && 
                           food.quality !== 'spoiled' && 
                           temperature !== 'cold';`iI`

        return {
            cookingStatus,
            temperature,
            quality: food.quality as FoodStatus['quality'],
            readyToServe
        };
    }

    updateCookingService(newCookingService: ICookingService): void {
        this.cookingService = newCookingService;
    }
}
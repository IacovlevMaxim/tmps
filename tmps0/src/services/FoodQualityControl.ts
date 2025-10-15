import { Food } from '../models/Food.js';
import { IQualityControl } from '../interfaces/CafeteriaServices.js';
import QualityAssessmentStrategy from '../interfaces/QualityAssessmentStrategy.js';
import { 
    ExcellentQualityStrategy,
    FreshQualityStrategy,
    GoodQualityStrategy,
    StaleQualityStrategy,
    SpoiledQualityStrategy,
    DefaultQualityStrategy 
} from '../strategies/Strategies.js';

/**
 * Dependency Inversion - implements the abstraction
 * Now follows Open/Closed Principle using Strategy pattern for quality assessment
 */
export class FoodQualityControl implements IQualityControl {
    private qualityStrategies: QualityAssessmentStrategy[] = [
        new ExcellentQualityStrategy(),
        new FreshQualityStrategy(),
        new GoodQualityStrategy(),
        new StaleQualityStrategy(),
        new SpoiledQualityStrategy(),
        new DefaultQualityStrategy() 
    ];
    checkQuality(food: Food): string {
        const temp = food.temperature;
        const quality = food.quality;
        const cookingTime = food.cookingTime;
        const requiredTime = food.getRequiredCookingTime();

        let assessment = `${food.name} Quality Check:\n`;
        assessment += `  Current quality: ${quality}\n`;
        assessment += `  Temperature: ${temp}°C\n`;
        assessment += `  Cooking status: ${cookingTime}/${requiredTime} minutes\n`;

        const strategy = this.qualityStrategies.find(s => s.canHandle(quality));
        assessment += `  ${strategy?.assess(food) || 'Overall: Unknown quality'}`;

        return assessment;
    }

    /**
     * Add method to register new quality strategies
     * Allows adding new quality types without modifying existing code
     */
    addQualityStrategy(strategy: QualityAssessmentStrategy): void {
        // Insert before the default strategy (which should always be last)
        this.qualityStrategies.splice(-1, 0, strategy);
    }

    getRecommendations(food: Food): string[] {
        const recommendations: string[] = [];
        const temp = food.temperature;
        const optimalTemp = food.getOptimalTemperature();
        const quality = food.quality;

        if (temp < optimalTemp - 10) {
            recommendations.push('Reheat food to optimal serving temperature');
        } else if (temp > optimalTemp + 15) {
            recommendations.push('Allow food to cool before serving');
        }

        if (quality === 'stale') {
            recommendations.push('Consider discarding - quality compromised');
        } else if (quality === 'spoiled') {
            recommendations.push('Do not serve - food is spoiled');
        }
        if (food.cookingTime < food.getRequiredCookingTime()) {
            recommendations.push('Continue cooking until fully done');
        }

        return recommendations;
    }
}
import { Food } from '../models/Food.js';
import QualityAssessmentStrategy from '../interfaces/QualityAssessmentStrategy.js';

export class ExcellentQualityStrategy implements QualityAssessmentStrategy {
    canHandle(quality: string): boolean {
        return quality === 'excellent';
    }

    assess(food: Food): string {
        return 'Overall: Outstanding quality - premium grade!';
    }
}

export class FreshQualityStrategy implements QualityAssessmentStrategy {
    canHandle(quality: string): boolean {
        return quality === 'fresh';
    }

    assess(food: Food): string {
        const temp = food.temperature;
        const optimalTemp = food.getOptimalTemperature();
        
        if (temp >= optimalTemp - 5) {
            return 'Overall: Excellent quality!';
        }
        return 'Overall: Fresh but temperature needs adjustment';
    }
}

export class GoodQualityStrategy implements QualityAssessmentStrategy {
    canHandle(quality: string): boolean {
        return quality === 'good';
    }

    assess(food: Food): string {
        return 'Overall: Good quality';
    }
}

export class StaleQualityStrategy implements QualityAssessmentStrategy {
    canHandle(quality: string): boolean {
        return quality === 'stale';
    }

    assess(food: Food): string {
        return 'Overall: Has quality issues';
    }
}

export class SpoiledQualityStrategy implements QualityAssessmentStrategy {
    canHandle(quality: string): boolean {
        return quality === 'spoiled';
    }

    assess(food: Food): string {
        return 'Overall: Poor quality - spoiled';
    }
}

export class DefaultQualityStrategy implements QualityAssessmentStrategy {
    canHandle(quality: string): boolean {
        return true;
    }

    assess(food: Food): string {
        return 'Overall: Unknown quality level';
    }
}
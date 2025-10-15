import { Food } from "../models/Food";

export default interface QualityAssessmentStrategy {
    assess(food: Food): string;
    canHandle(quality: string): boolean;
}

import { Food } from '../models/Food.js';

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

export interface ICafeteriaCoordinator {
    processOrder(food: Food): string[];
    getFoodStatus(food: Food): FoodStatus;
}

export interface FoodStatus {
    cookingStatus: 'raw' | 'cooking' | 'ready' | 'overcooked';
    temperature: 'cold' | 'warm' | 'hot' | 'optimal';
    quality: 'fresh' | 'good' | 'stale' | 'spoiled';
    readyToServe: boolean;
}
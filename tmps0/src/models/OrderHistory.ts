export class OrderHistory {
    private _orderHistory: OrderEvent[];

    constructor() {
        this._orderHistory = [];
    }

    get orderHistory(): OrderEvent[] {
        return [...this._orderHistory]; // Return copy to maintain encapsulation
    }

    recordCooking(foodName: string): void {
        this._orderHistory.push({
            type: 'cooking',
            date: new Date(),
            details: `${foodName} cooked`
        });
    }

    recordServing(foodName: string): void {
        this._orderHistory.push({
            type: 'serving',
            date: new Date(),
            details: `${foodName} served`
        });
    }
}

export interface OrderEvent {
    type: 'cooking' | 'serving';
    date: Date;
    details: string;
}
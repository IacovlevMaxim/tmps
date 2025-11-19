import { BaseSubject, Observer } from '../behavioral/Observer';
import { BehaviorContext, BehaviorStrategy, CalmBehavior } from '../behavioral/Strategy';

/**
 * Animal model that integrates Observer and Strategy patterns
 */
export abstract class Animal extends BaseSubject {
  protected name: string;
  protected species: string;
  protected health: number;
  protected hunger: number;
  protected location: string;
  protected behaviorContext: BehaviorContext;

  constructor(name: string, species: string, location: string = "Unknown", initialBehavior: BehaviorStrategy = new CalmBehavior()) {
    super();
    this.name = name;
    this.species = species;
    this.health = 100;
    this.hunger = 50;
    this.location = location;
    this.behaviorContext = new BehaviorContext(initialBehavior);
  }

  // Basic animal actions
  abstract makeSound(): string;

  feed(): void {
    const oldHunger = this.hunger;
    this.hunger = Math.max(0, this.hunger - 30);
    console.log(`${this.name} is eating. Hunger: ${oldHunger} → ${this.hunger}`);
    this.notify('fed', { hunger: this.hunger, previousHunger: oldHunger });
  }

  moveTo(newLocation: string): void {
    const oldLocation = this.location;
    this.location = newLocation;
    console.log(`${this.name} moved from ${oldLocation} to ${newLocation}`);
    this.notify('moved', { newLocation, oldLocation });
  }

  treat(treatment: string): void {
    const oldHealth = this.health;
    this.health = Math.min(100, this.health + 20);
    console.log(`${this.name} received treatment: ${treatment}. Health: ${oldHealth} → ${this.health}`);
    this.notify('treated', { health: this.health, treatment, previousHealth: oldHealth });
  }

  // Strategy pattern integration
  setBehavior(strategy: BehaviorStrategy): void {
    this.behaviorContext.setStrategy(strategy);
    console.log(`${this.name}'s behavior changed to: ${strategy.getStrategyName()}`);
    this.notify('behaviorChanged', { newBehavior: strategy.getStrategyName() });
  }

  performBehavior(): string {
    const result = this.behaviorContext.executeStrategy();
    console.log(`${this.name}: ${result}`);
    this.notify('behaviorExecuted', { behavior: this.behaviorContext.getStrategyName(), result });
    return result;
  }

  // Simulation methods
  simulateTimePass(): void {
    // Increase hunger over time
    const oldHunger = this.hunger;
    this.hunger = Math.min(100, this.hunger + 10);
    
    // Slightly decrease health if very hungry
    if (this.hunger > 80) {
      const oldHealth = this.health;
      this.health = Math.max(0, this.health - 5);
      if (oldHealth !== this.health) {
        console.log(`${this.name} is getting weak from hunger! Health: ${oldHealth} → ${this.health}`);
      }
    }

    if (oldHunger !== this.hunger) {
      this.notify('timePassedHunger', { hunger: this.hunger, previousHunger: oldHunger });
    }
  }

  // Getters
  getName(): string { return this.name; }
  getSpecies(): string { return this.species; }
  getHealth(): number { return this.health; }
  getHunger(): number { return this.hunger; }
  getLocation(): string { return this.location; }
  getCurrentBehavior(): string { return this.behaviorContext.getStrategyName(); }

  // Status methods
  getStatus(): string {
    const healthStatus = this.health > 80 ? "Excellent" : this.health > 60 ? "Good" : this.health > 40 ? "Fair" : this.health > 20 ? "Poor" : "Critical";
    const hungerStatus = this.hunger < 20 ? "Full" : this.hunger < 50 ? "Satisfied" : this.hunger < 80 ? "Hungry" : "Very Hungry";
    
    return `${this.name} (${this.species}) - Health: ${this.health}/100 (${healthStatus}), Hunger: ${this.hunger}/100 (${hungerStatus}), Location: ${this.location}, Behavior: ${this.getCurrentBehavior()}`;
  }

  toString(): string {
    return this.getStatus();
  }
}

/**
 * Concrete Animal implementations
 */
export class Lion extends Animal {
  constructor(name: string, location: string = "Savanna") {
    super(name, "Lion", location);
  }

  makeSound(): string {
    const sound = `${this.name} roars loudly! ROOOAAR!`;
    console.log(sound);
    this.notify('madeSound', { sound: 'roar' });
    return sound;
  }
}

export class Elephant extends Animal {
  constructor(name: string, location: string = "Plains") {
    super(name, "Elephant", location);
  }

  makeSound(): string {
    const sound = `${this.name} trumpets! PFFFFRRRRR!`;
    console.log(sound);
    this.notify('madeSound', { sound: 'trumpet' });
    return sound;
  }
}

export class Monkey extends Animal {
  constructor(name: string, location: string = "Forest") {
    super(name, "Monkey", location);
  }

  makeSound(): string {
    const sound = `${this.name} chatters excitedly! OOH OOH AH AH!`;
    console.log(sound);
    this.notify('madeSound', { sound: 'chatter' });
    return sound;
  }
}

export class Penguin extends Animal {
  constructor(name: string, location: string = "Arctic") {
    super(name, "Penguin", location);
  }

  makeSound(): string {
    const sound = `${this.name} makes penguin noises! SQUAWK SQUAWK!`;
    console.log(sound);
    this.notify('madeSound', { sound: 'squawk' });
    return sound;
  }
}
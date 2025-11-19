/**
 * Strategy Pattern Implementation
 * 
 * This pattern defines a family of algorithms, encapsulates each one, and makes them 
 * interchangeable. Strategy lets the algorithm vary independently from clients that use it.
 */

export interface BehaviorStrategy {
  execute(): string;
  getStrategyName(): string;
}

export class AggressiveBehavior implements BehaviorStrategy {
  execute(): string {
    return "Acting aggressively";
  }

  getStrategyName(): string {
    return "Aggressive";
  }
}

export class PlayfulBehavior implements BehaviorStrategy {
  execute(): string {
    return "Playing around";
  }

  getStrategyName(): string {
    return "Playful";
  }
}

export class CalmBehavior implements BehaviorStrategy {
  execute(): string {
    return "Staying calm and peaceful";
  }

  getStrategyName(): string {
    return "Calm";
  }
}

export class HuntingBehavior implements BehaviorStrategy {
  execute(): string {
    return "Hunting for food";
  }

  getStrategyName(): string {
    return "Hunting";
  }
}

export class SocialBehavior implements BehaviorStrategy {
  execute(): string {
    return "Socializing with others";
  }

  getStrategyName(): string {
    return "Social";
  }
}

export class DefensiveBehavior implements BehaviorStrategy {
  execute(): string {
    return "Being defensive";
  }

  getStrategyName(): string {
    return "Defensive";
  }
}

/**
 * Context class that uses different behavior strategies
 */
export class BehaviorContext {
  private strategy: BehaviorStrategy;

  constructor(strategy: BehaviorStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: BehaviorStrategy): void {
    this.strategy = strategy;
    console.log(`Behavior strategy changed to: ${strategy.getStrategyName()}`);
  }

  executeStrategy(): string {
    return this.strategy.execute();
  }

  getStrategyName(): string {
    return this.strategy.getStrategyName();
  }
}
# Topic: *Behavioral Design Patterns*
## Author: *Iacovlev Maxim*
------

## Introduction

This laboratory work demonstrates the implementation of **Behavioral Design Patterns** within an **Ecosystem Management System**. The system simulates a wildlife ecosystem where animals have different behaviors, managers observe and coordinate activities, commands can be executed with undo/redo functionality, and requests are handled through a chain of specialized handlers.

The implementation showcases real-world applications of behavioral patterns in a cohesive system that manages animal behaviors, ecosystem operations, and request processing.

## Objectives:
&ensp; &ensp; __1. Study and understand the Behavioral Design Patterns.__

&ensp; &ensp; __2. As a continuation of the previous laboratory work, think about what communication between software entities might be involed in your system.__

&ensp; &ensp; __3. Implement some additional functionalities using behavioral design patterns.__

## Theoretical Background:
&ensp; &ensp; In software engineering, behavioral design patterns have the purpose of identifying common communication patterns between different software entities. By doing so, these patterns increase flexibility in carrying out this communication.

&ensp; &ensp; Some examples from this category of design patterns are :

   * **Chain of Responsibility** - Pass requests along a chain of handlers
   * **Command** - Encapsulate requests as objects with undo/redo support
   * **Observer** - Define one-to-many dependencies between objects
   * **Strategy** - Define a family of interchangeable algorithms
   
## Implementation & Explanation

### **Pattern 1: Observer Pattern**
**Location:** `src/domain/behavioral/Observer.ts`, `src/domain/models/Animal.ts`

**Implementation:**
```typescript
export interface Observer {
  update(subject: Subject, event: string, data?: any): void;
  getId(): string;
}

export abstract class BaseSubject implements Subject {
  private observers: Observer[] = [];
  
  notify(event: string, data?: any): void {
    for (const observer of this.observers) {
      observer.update(this, event, data);
    }
  }
}
```

Animals in the ecosystem need to notify managers about important events (feeding, moving, health changes). The Observer pattern provides a clean way to decouple animals from their observers, allowing multiple managers to monitor different animals without tight coupling.

**Usage:** The `EcosystemManager` observes animals and automatically responds to events like high hunger levels or health changes.

### **Pattern 2: Strategy Pattern**
**Location:** `src/domain/behavioral/Strategy.ts`, `src/domain/models/Animal.ts`

**Implementation:**
```typescript
export interface BehaviorStrategy {
  execute(): string;
  getStrategyName(): string;
}

export class AggressiveBehavior implements BehaviorStrategy {
  execute(): string {
    return "🦁 Acting aggressively - growling, showing dominance";
  }
}

export class BehaviorContext {
  setStrategy(strategy: BehaviorStrategy): void {
    this.strategy = strategy;
  }
  
  executeStrategy(): string {
    return this.strategy.execute();
  }
}
```

**Motivation:** Animals exhibit different behaviors (aggressive, playful, calm, hunting, social, defensive) depending on various factors. The Strategy pattern allows runtime behavior changes without modifying the animal classes, making the system highly flexible and extensible.

**Usage:** Animals can dynamically switch between behaviors based on environmental conditions or management decisions.

### **Pattern 3: Command Pattern**
**Location:** `src/domain/behavioral/Command.ts`, `src/client/BehavioralPatternsClient.ts`

**Implementation:**
```typescript
export interface Command {
  execute(): void;
  undo(): void;
  getDescription(): string;
}

export class FeedAnimalCommand implements Command {
  execute(): void {
    this.receiver.performAction("feed", this.animalName);
    this.executed = true;
  }
  
  undo(): void {
    this.receiver.performAction("unfeed", this.animalName);
    this.executed = false;
  }
}

export class EcosystemCommandInvoker {
  executeCommand(command: Command): void {
    command.execute();
    this.commandHistory.push(command);
  }
}
```

**Motivation:** Ecosystem operations (feeding, moving, treating animals) need to be trackable and reversible. The Command pattern encapsulates operations as objects, enabling undo/redo functionality and command history tracking for audit purposes.

**Usage:** Managers can perform operations and undo them if needed, maintaining a complete history of ecosystem management actions.

### **Pattern 4: Chain of Responsibility Pattern**
**Location:** `src/domain/behavioral/ChainOfResponsibility.ts`

**Implementation:**
```typescript
export abstract class RequestHandler {
  protected nextHandler: RequestHandler | null = null;
  
  setNext(handler: RequestHandler): RequestHandler {
    this.nextHandler = handler;
    return handler;
  }
  
  handle(request: EcosystemRequest): string {
    if (this.canHandle(request)) {
      return this.processRequest(request);
    } else if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return "No handler available";
  }
}
```

**Motivation:** The ecosystem receives various types of requests (emergency, medical, feeding, maintenance, visitor) with different priorities. The Chain of Responsibility pattern ensures requests are handled by the most appropriate handler based on type and priority, creating a scalable request processing system.

**Usage:** Emergency handlers process high-priority requests first, while visitor requests are handled by basic support staff, creating an efficient triage system.

### **Unified Client Design**

The `BehavioralPatternsClient` serves as the single entry point that orchestrates all behavioral patterns:

```typescript
export class BehavioralPatternsClient {
  async run(): Promise<void> {
    await this.demonstrateObserverPattern();
    await this.demonstrateStrategyPattern();
    await this.demonstrateCommandPattern();
    await this.demonstrateChainOfResponsibilityPattern();
  }
}
```

This design ensures there's only one client managing the entire system, as required by the laboratory specifications.

## How to Run

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Execution
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Or build and run
npm run build
npm start
```

### Available Scripts
```bash
npm run build      # Compile TypeScript to JavaScript
npm run start      # Run the compiled application
npm run dev        # Run with ts-node for development
npm run clean      # Clean build artifacts
npm run watch      # Watch mode for development
```

## Results & Demonstration

When you run the application, you'll see a comprehensive demonstration of all four behavioral patterns:

### Observer Pattern Demo
- Animals notify the ecosystem manager about state changes
- Manager automatically responds to events like high hunger levels
- Real-time monitoring and logging of animal activities

### Strategy Pattern Demo  
- Animals dynamically change behaviors (aggressive → playful → calm → hunting)
- Runtime strategy switching without code modification
- Behavioral flexibility based on environmental factors

### ⚡ Command Pattern Demo
- Ecosystem operations with full undo/redo support
- Command history tracking for audit purposes
- Reversible operations for ecosystem management

### Chain of Responsibility Demo
- Request routing based on type and priority
- Emergency requests handled immediately
- Visitor requests processed by appropriate staff

## Conclusions

This implementation successfully demonstrates the power and flexibility of behavioral design patterns in a real-world scenario:

### **Pattern Benefits Achieved:**

1. **Observer Pattern**: Provides loose coupling between animals and their observers, enabling scalable monitoring systems.

2. **Strategy Pattern**: Offers runtime behavior flexibility, making the system adaptable to changing environmental conditions.

3. **Command Pattern**: Enables sophisticated operation management with undo/redo capabilities and audit trails.

4. **Chain of Responsibility**: Creates an efficient request processing pipeline that can be easily extended with new handlers.

### **System Advantages:**

- **Maintainability**: Each pattern encapsulates specific responsibilities, making code easier to modify and extend.
- **Scalability**: New behaviors, commands, and handlers can be added without changing existing code.
- **Flexibility**: Runtime configuration changes allow the system to adapt to different scenarios.
- **Testability**: Each pattern can be unit tested independently.

### **Future Extensions:**

The behavioral patterns foundation enables easy addition of:
- **Mediator Pattern** for complex animal interactions
- **State Pattern** for animal lifecycle management  
- **Visitor Pattern** for ecosystem analysis operations
- **Iterator Pattern** for traversing animal collections

This laboratory work demonstrates that behavioral design patterns are essential tools for creating flexible, maintainable, and scalable software systems that can adapt to changing requirements while maintaining clean architecture principles.
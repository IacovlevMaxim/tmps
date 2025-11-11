# Topic: *Structural Design Patterns*
## Author: *Iacovlev Maxim*
------
## Objectives:
__1. Study and understand the Structural Design Patterns.__

__2. As a continuation of the previous laboratory work, extend the organization management system with structural patterns.__

__3. Implement at least 4 structural design patterns to enhance system architecture and functionality.__

## Theoretical Background:
In software engineering, Structural Design Patterns are concerned with how classes and objects are composed to form larger, more complex structures. These patterns focus on simplifying relationships between entities and making the system more flexible and efficient.

Structural patterns solve problems by identifying relationships between entities and provide solutions for realizing these relationships. They use inheritance and composition to create larger structures from individual objects and classes.

The main categories of structural patterns include:
   * **Adapter** - Allows incompatible interfaces to work together
   * **Bridge** - Separates abstraction from implementation  
   * **Composite** - Composes objects into tree structures to represent part-whole hierarchies
   * **Decorator** - Adds new functionality to objects dynamically without altering structure
   * **Facade** - Provides a simplified interface to a complex subsystem
   * **Flyweight** - Minimizes memory usage by sharing efficiently among similar objects
   * **Proxy** - Provides a placeholder or surrogate for another object to control access

### 1. Composite Pattern Implementation

**Location**: `src/domain/models/Department.ts`, `src/domain/models/Employee.ts`

**Main Idea**: Create a tree structure where both individual employees and departments can be treated uniformly through a common interface.

```typescript
// Common interface for all organizational components
export interface OrganizationComponent {
  getName(): string;
  calculateSalary(): number;
  getEmployeeCount(): number;
  displayInfo(indent?: number): string;
  addComponent(component: OrganizationComponent): void;
  removeComponent(component: OrganizationComponent): void;
  getComponents(): OrganizationComponent[];
}

// Leaf implementation (Employee)
export abstract class Employee implements OrganizationComponent {
  // Leaf nodes don't support adding/removing components
  addComponent(component: OrganizationComponent): void {
    throw new Error('Cannot add components to individual employees');
  }
  
  getEmployeeCount(): number {
    return 1; // Leaf node has one employee
  }
}

// Composite implementation (Department)
export class Department implements OrganizationComponent {
  private components: OrganizationComponent[] = [];
  
  addComponent(component: OrganizationComponent): void {
    this.components.push(component);
  }
  
  // Aggregate operations across all children
  calculateSalary(): number {
    return this.components.reduce((total, component) => 
      total + component.calculateSalary(), 0);
  }
  
  getEmployeeCount(): number {
    return this.components.reduce((total, component) => 
      total + component.getEmployeeCount(), 0);
  }
}
```

This pattern enables building complex organizational hierarchies where departments can contain other departments and employees, allowing recursive operations like salary calculation across the entire structure.

### 2. Decorator Pattern Implementation  

In `src/domain/decorators/EmployeeDecorators.ts`

Dynamically add responsibilities and capabilities to employee objects without modifying their structure.

```typescript
// Base decorator
export abstract class EmployeeDecorator implements EmployeeComponent {
  protected employee: EmployeeComponent;

  constructor(employee: EmployeeComponent) {
    this.employee = employee;
  }

  getDescription(): string {
    return this.employee.getDescription();
  }

  calculateTotalCost(): number {
    return this.employee.calculateTotalCost();
  }
}

// Concrete decorators
export class CertificationDecorator extends EmployeeDecorator {
  private certification: string;
  private certificationBonus: number;

  getDescription(): string {
    return `${this.employee.getDescription()} + ${this.certification} Certified`;
  }

  calculateTotalCost(): number {
    return this.employee.calculateTotalCost() + this.certificationBonus;
  }
}

// Usage: Stack multiple decorators
let enhanced = new CertificationDecorator(employee, 'AWS Solutions Architect');
enhanced = new LeadershipDecorator(enhanced);
enhanced = new OvertimeDecorator(enhanced, 20);
```

Allows flexible enhancement of employee capabilities (certifications, leadership roles, overtime) without creating numerous subclasses, enabling dynamic composition of employee features.

### 3. Facade Pattern Implementation

In `src/domain/services/OrganizationFacade.ts`

Provide a simplified, unified interface to the complex organization management subsystem.

```typescript
export class OrganizationManagementFacade {
  private rootDepartment: Department;
  private notificationService: NotificationService;

  // Simplified employee creation that handles complex setup internally
  createEmployee(
    firstName: string, 
    lastName: string, 
    type: 'programmer' | 'manager',
    salary: number,
    departmentName?: string,
    options?: {...}
  ): Employee {
    // Internally uses Builder pattern
    const person = new PersonBuilder(firstName, lastName)
      .age(options?.age || 25)
      .address(options?.address || 'Unknown Address')
      .build();

    // Factory pattern for employee creation
    let employee = type === 'programmer' 
      ? new Programmer(...) 
      : new Manager(...);

    // Auto-assignment to department (Composite pattern)
    if (departmentName) {
      this.addEmployeeToDepartment(employee, departmentName);
    }

    // Notification (Bridge pattern)
    this.notificationService.send(`Welcome ${firstName}!`, email);

    return employee;
  }

  // Simplified enhanced employee creation
  createEnhancedEmployee(employee, enhancements): any {
    let enhanced = employee;
    
    // Apply decorators based on configuration
    if (enhancements.certifications) {
      enhancements.certifications.forEach(cert => {
        enhanced = new CertificationDecorator(enhanced, cert);
      });
    }
    
    if (enhancements.hasLeadership) {
      enhanced = new LeadershipDecorator(enhanced);
    }
    
    return enhanced;
  }
}
```

Hides the complexity of coordinating multiple patterns (Builder, Factory, Composite, Decorator, Bridge) behind a simple interface, making the system easier to use while maintaining flexibility.

### 4. Bridge Pattern Implementation

In `src/domain/services/NotificationServices.ts`

Separate notification abstraction from implementation, allowing independent variation of both.

```typescript
// Implementation side - different ways to send notifications
export interface NotificationSender {
  sendNotification(message: string, recipient: string): string;
}

export class EmailNotificationSender implements NotificationSender {
  sendNotification(message: string, recipient: string): string {
    return `📧 EMAIL sent to ${recipient}: ${message}`;
  }
}

export class SMSNotificationSender implements NotificationSender {
  sendNotification(message: string, recipient: string): string {
    return `📱 SMS sent to ${recipient}: ${message}`;
  }
}

// Abstraction side - different types of notification services
export abstract class NotificationService {
  protected sender: NotificationSender;

  constructor(sender: NotificationSender) {
    this.sender = sender;
  }

  abstract send(message: string, recipient: string): string;

  // Bridge: can change implementation at runtime
  setSender(sender: NotificationSender): void {
    this.sender = sender;
  }
}

export class UrgentNotificationService extends NotificationService {
  send(message: string, recipient: string): string {
    const urgentMessage = `🚨 URGENT: ${message}`;
    return this.sender.sendNotification(urgentMessage, recipient);
  }
}
```

Enables switching between different notification methods (Email, SMS, Slack) and notification types (Standard, Urgent, Broadcast) independently, providing flexibility for future extensions.

### Integration with Creational Patterns

The structural patterns seamlessly integrate with existing creational patterns:

- **Facade** internally uses **Factory** and **Abstract Factory** for employee creation
- **Composite** works with **Builder** pattern for constructing complex hierarchies  
- **Decorator** enhances objects created by **Factories**
- **Bridge** can be combined with **Singleton** configuration managers
- All patterns accessible through **single client interface**

### Single Client Implementation

In `src/client/OrganizationClient.ts`, `src/client/main.ts`

The system maintains a single client interface as required:

```typescript
export class OrganizationClient {
  private facade: OrganizationManagementFacade;

  public demonstrateStructuralPatterns(): void {
    this.demonstrateCompositePattern();    // Hierarchical organization
    this.demonstrateDecoratorPattern();    // Employee enhancement
    this.demonstrateFacadePattern();       // Simplified operations  
    this.demonstrateBridgePattern();       // Flexible notifications
  }
}

// Single entry point
function main(): void {
  const client = new OrganizationClient();
  client.demonstrateStructuralPatterns();
}
```

## Results & Conclusions:
Successfully creates hierarchical organization structure with recursive operations, ynamically enhances employee capabilities with stackable decorators, simplifies complex operations while maintaining system flexibility, provides flexible notification system with interchangeable implementations

Achieved benefits, such as composite pattern enables arbitrary organizational hierarchies, decorator pattern allows runtime capability addition without inheritance explosion, facade pattern reduces client complexity while preserving full functionality, bridge pattern enables changing notification methods without affecting client code, structural patterns work harmoniously with existing creational patterns

The architecture quality is high, since the entire system accessible through one client interface, clear separation between client, domain, and utilities, creational patterns embedded within structural functionalities, it is easy to add new employee types, decorators, or notification methods, and each pattern addresses specific architectural concerns

The implementation demonstrates how structural design patterns can significantly improve system architecture by providing flexible composition mechanisms, simplified interfaces, and clear separation of concerns while maintaining integration with creational patterns.
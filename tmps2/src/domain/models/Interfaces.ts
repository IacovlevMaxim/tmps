export interface Prototype<T> {
  copy(): T;
}

export interface PoolObject {
  reset(): void;
}

export interface ObjectFactory<T> {
  createObject(): T;
}

export interface Salary {
  calculateSalary(): number;
}

// Bridge Pattern - Abstraction for notification systems
export interface NotificationSender {
  sendNotification(message: string, recipient: string): string;
}

// Decorator Pattern - Component interface for enhanced employees
export interface EmployeeComponent {
  getDescription(): string;
  calculateTotalCost(): number;
  getResponsibilities(): string[];
}
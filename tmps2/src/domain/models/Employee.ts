import { Person } from './Person';
import { Salary, EmployeeComponent } from './Interfaces';
import { OrganizationComponent } from './OrganizationComponent';

// Base Employee class (Leaf in Composite pattern)
export abstract class Employee extends Person implements Salary, OrganizationComponent, EmployeeComponent {
  protected salary: number;
  protected position: string;

  constructor(firstName: string, lastName: string, age: number, address: string, phone: string, salary: number, position: string) {
    super(firstName, lastName, age, address, phone);
    this.salary = salary;
    this.position = position;
  }

  // Salary interface implementation
  calculateSalary(): number {
    return this.salary;
  }

  getSalary(): number {
    return this.salary;
  }

  // OrganizationComponent interface implementation (Leaf behavior)
  getName(): string {
    return `${this.getFirstName()} ${this.getLastName()} (${this.position})`;
  }

  getEmployeeCount(): number {
    return 1; // Leaf node has one employee
  }

  displayInfo(indent: number = 0): string {
    const spacing = '  '.repeat(indent);
    return `${spacing}Employee: ${this.getName()} - Salary: $${this.salary}`;
  }

  // Leaf nodes don't support adding/removing components
  addComponent(component: OrganizationComponent): void {
    throw new Error('Cannot add components to individual employees');
  }

  removeComponent(component: OrganizationComponent): void {
    throw new Error('Cannot remove components from individual employees');
  }

  getComponents(): OrganizationComponent[] {
    return []; // Leaf has no children
  }

  // EmployeeComponent interface implementation (for Decorator pattern)
  getDescription(): string {
    return `${this.getName()} - ${this.position}`;
  }

  calculateTotalCost(): number {
    return this.salary;
  }

  getResponsibilities(): string[] {
    return [`Basic ${this.position} responsibilities`];
  }
}
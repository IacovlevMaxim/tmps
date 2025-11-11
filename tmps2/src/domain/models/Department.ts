import { OrganizationComponent } from './OrganizationComponent';
import { Salary } from './Interfaces';

// Composite pattern implementation - Department can contain other departments and employees
export class Department implements OrganizationComponent, Salary {
  private name: string;
  private components: OrganizationComponent[] = [];
  private departmentBudget: number;

  constructor(name: string, departmentBudget: number = 0) {
    this.name = name;
    this.departmentBudget = departmentBudget;
  }

  getName(): string {
    return this.name;
  }

  addComponent(component: OrganizationComponent): void {
    this.components.push(component);
  }

  removeComponent(component: OrganizationComponent): void {
    const index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  getComponents(): OrganizationComponent[] {
    return [...this.components];
  }

  calculateSalary(): number {
    return this.components.reduce((total, component) => total + component.calculateSalary(), 0);
  }

  getEmployeeCount(): number {
    return this.components.reduce((total, component) => total + component.getEmployeeCount(), 0);
  }

  displayInfo(indent: number = 0): string {
    const spacing = '  '.repeat(indent);
    let result = `${spacing}Department: ${this.name} (Budget: $${this.departmentBudget})\n`;
    result += `${spacing}Total Employees: ${this.getEmployeeCount()}, Total Salary: $${this.calculateSalary()}\n`;
    
    // Recursively display all components
    this.components.forEach(component => {
      result += component.displayInfo(indent + 1) + '\n';
    });
    
    return result.trim();
  }

  // Department-specific methods
  getDepartmentBudget(): number {
    return this.departmentBudget;
  }

  setDepartmentBudget(budget: number): void {
    this.departmentBudget = budget;
  }

  // Check if department is within budget
  isWithinBudget(): boolean {
    return this.calculateSalary() <= this.departmentBudget;
  }

  getBudgetUtilization(): number {
    if (this.departmentBudget === 0) return 0;
    return (this.calculateSalary() / this.departmentBudget) * 100;
  }

  // Find components by type or name
  findEmployeesByName(name: string): OrganizationComponent[] {
    const results: OrganizationComponent[] = [];
    
    this.components.forEach(component => {
      if (component.getName().toLowerCase().includes(name.toLowerCase())) {
        results.push(component);
      }
      
      // If it's a department, search recursively
      if (component instanceof Department) {
        results.push(...component.findEmployeesByName(name));
      }
    });
    
    return results;
  }
}
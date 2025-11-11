import { Employee } from '../models/Employee';
import { Programmer } from '../models/Programmer';
import { Manager } from '../models/Manager';
import { EmployeeFactory, ProgrammerFactory, ManagerFactory } from '../factories/EmployeeFactories';

// Strategy Pattern - Encapsulates employee creation logic
export interface EmployeeCreationStrategy {
  canHandle(type: string): boolean;
  
  createEmployee(
    firstName: string,
    lastName: string,
    salary: number,
    options?: any
  ): Employee;
  
  getDefaultAge(): number;
  applySpecificOptions(employee: Employee, options?: any): void;
}

export class ProgrammerCreationStrategy implements EmployeeCreationStrategy {
  private factory: EmployeeFactory;

  constructor() {
    this.factory = new ProgrammerFactory();
  }

  canHandle(type: string): boolean {
    return type.toLowerCase() === 'programmer';
  }

  getDefaultAge(): number {
    return 25;
  }

  createEmployee(
    firstName: string,
    lastName: string,
    salary: number,
    options?: {
      age?: number;
      address?: string;
      phone?: string;
      languages?: string[];
    }
  ): Employee {
    const employee = this.factory.createEmployee(
      firstName,
      lastName,
      options?.age || this.getDefaultAge(),
      options?.address || 'Unknown Address',
      options?.phone || 'Unknown Phone',
      salary
    );

    this.applySpecificOptions(employee, options);
    return employee;
  }

  applySpecificOptions(employee: Employee, options?: { languages?: string[] }): void {
    if (options?.languages && employee instanceof Programmer) {
      options.languages.forEach(lang => employee.addProgrammingLanguage(lang));
    }
  }
}

export class ManagerCreationStrategy implements EmployeeCreationStrategy {
  private factory: EmployeeFactory;

  constructor() {
    this.factory = new ManagerFactory();
  }

  canHandle(type: string): boolean {
    return type.toLowerCase() === 'manager';
  }

  getDefaultAge(): number {
    return 30;
  }

  createEmployee(
    firstName: string,
    lastName: string,
    salary: number,
    options?: {
      age?: number;
      address?: string;
      phone?: string;
      teamSize?: number;
    }
  ): Employee {
    const employee = this.factory.createEmployee(
      firstName,
      lastName,
      options?.age || this.getDefaultAge(),
      options?.address || 'Unknown Address',
      options?.phone || 'Unknown Phone',
      salary
    );

    this.applySpecificOptions(employee, options);
    return employee;
  }

  applySpecificOptions(employee: Employee, options?: { teamSize?: number }): void {
    if (options?.teamSize !== undefined && employee instanceof Manager) {
      employee.setTeamSize(options.teamSize);
    }
  }
}

export class EmployeeCreationContext {
  private strategies: EmployeeCreationStrategy[];

  constructor() {
    this.strategies = [
      new ProgrammerCreationStrategy(),
      new ManagerCreationStrategy()
    ];
  }

  getStrategy(type: string): EmployeeCreationStrategy {
    const strategy = this.strategies.find(s => s.canHandle(type));
    if (!strategy) {
      throw new Error(`Unknown employee type: ${type}`);
    }
    return strategy;
  }
}
import { Employee } from '../models/Employee';
import { Programmer } from '../models/Programmer';
import { Manager } from '../models/Manager';

export abstract class EmployeeFactory {
  abstract createEmployee(
    firstName: string,
    lastName: string,
    age: number,
    address: string,
    phone: string,
    salary: number
  ): Employee;
}

export class ProgrammerFactory extends EmployeeFactory {
  createEmployee(
    firstName: string,
    lastName: string,
    age: number,
    address: string,
    phone: string,
    salary: number
  ): Programmer {
    return new Programmer(firstName, lastName, age, address, phone, salary, ['JavaScript', 'TypeScript']);
  }
}

export class ManagerFactory extends EmployeeFactory {
  createEmployee(
    firstName: string,
    lastName: string,
    age: number,
    address: string,
    phone: string,
    salary: number
  ): Manager {
    return new Manager(firstName, lastName, age, address, phone, salary, 5); // Default team size of 5
  }
}

// Abstract Factory for different employee categories
export interface EmployeeAbstractFactory {
  createJuniorEmployee(firstName: string, lastName: string): Employee;
  createSeniorEmployee(firstName: string, lastName: string): Employee;
}

export class TechDivisionFactory implements EmployeeAbstractFactory {
  createJuniorEmployee(firstName: string, lastName: string): Employee {
    return new Programmer(firstName, lastName, 24, "Tech City", "555-0000", 65000, ['JavaScript']);
  }

  createSeniorEmployee(firstName: string, lastName: string): Employee {
    return new Programmer(firstName, lastName, 32, "Tech City", "555-0001", 95000, ['JavaScript', 'Python', 'Go']);
  }
}

export class ManagementDivisionFactory implements EmployeeAbstractFactory {
  createJuniorEmployee(firstName: string, lastName: string): Employee {
    return new Manager(firstName, lastName, 28, "Business District", "555-0002", 75000, 2);
  }

  createSeniorEmployee(firstName: string, lastName: string): Employee {
    return new Manager(firstName, lastName, 38, "Business District", "555-0003", 120000, 10);
  }
}
import { Employee } from './Employee';

export class Manager extends Employee {
  private teamSize: number;

  constructor(firstName: string, lastName: string, age: number, address: string, phone: string, salary: number, teamSize: number = 0) {
    super(firstName, lastName, age, address, phone, salary, 'Manager');
    this.teamSize = teamSize;
  }

  getTeamSize(): number {
    return this.teamSize;
  }

  setTeamSize(size: number): void {
    this.teamSize = size;
  }

  // Manager bonus based on team size
  calculateSalary(): number {
    const baseBonus = this.teamSize * 1000; // $1000 bonus per team member
    return this.salary + baseBonus;
  }

  getDescription(): string {
    return `${super.getDescription()} (Team Size: ${this.teamSize})`;
  }

  getResponsibilities(): string[] {
    return [
      'Team leadership',
      'Project planning',
      'Performance reviews',
      'Resource allocation',
      'Stakeholder communication'
    ];
  }

  calculateTotalCost(): number {
    return this.calculateSalary(); // Includes bonus
  }
}
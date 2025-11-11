import { EmployeeComponent } from '../models/Interfaces';

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

  getResponsibilities(): string[] {
    return this.employee.getResponsibilities();
  }
}

export class CertificationDecorator extends EmployeeDecorator {
  private certification: string;
  private certificationBonus: number;

  constructor(employee: EmployeeComponent, certification: string, bonus: number = 5000) {
    super(employee);
    this.certification = certification;
    this.certificationBonus = bonus;
  }

  getDescription(): string {
    return `${this.employee.getDescription()} + ${this.certification} Certified`;
  }

  calculateTotalCost(): number {
    return this.employee.calculateTotalCost() + this.certificationBonus;
  }

  getResponsibilities(): string[] {
    return [
      ...this.employee.getResponsibilities(),
      `Maintain ${this.certification} certification`,
      'Share certification knowledge with team'
    ];
  }
}

export class LeadershipDecorator extends EmployeeDecorator {
  private leadershipBonus: number;

  constructor(employee: EmployeeComponent, leadershipBonus: number = 10000) {
    super(employee);
    this.leadershipBonus = leadershipBonus;
  }

  getDescription(): string {
    return `${this.employee.getDescription()} + Leadership Role`;
  }

  calculateTotalCost(): number {
    return this.employee.calculateTotalCost() + this.leadershipBonus;
  }

  getResponsibilities(): string[] {
    return [
      ...this.employee.getResponsibilities(),
      'Mentor junior team members',
      'Lead strategic initiatives',
      'Cross-team collaboration'
    ];
  }
}

export class OvertimeDecorator extends EmployeeDecorator {
  private overtimeHours: number;
  private overtimeRate: number;

  constructor(employee: EmployeeComponent, overtimeHours: number, overtimeRate: number = 50) {
    super(employee);
    this.overtimeHours = overtimeHours;
    this.overtimeRate = overtimeRate;
  }

  getDescription(): string {
    return `${this.employee.getDescription()} + ${this.overtimeHours}h Overtime`;
  }

  calculateTotalCost(): number {
    const overtimePay = this.overtimeHours * this.overtimeRate;
    return this.employee.calculateTotalCost() + overtimePay;
  }

  getResponsibilities(): string[] {
    return [
      ...this.employee.getResponsibilities(),
      `Work ${this.overtimeHours} overtime hours`,
      'Handle critical deadlines'
    ];
  }
}

export class SpecialProjectDecorator extends EmployeeDecorator {
  private projectName: string;
  private projectBonus: number;

  constructor(employee: EmployeeComponent, projectName: string, projectBonus: number = 7500) {
    super(employee);
    this.projectName = projectName;
    this.projectBonus = projectBonus;
  }

  getDescription(): string {
    return `${this.employee.getDescription()} + ${this.projectName} Project Lead`;
  }

  calculateTotalCost(): number {
    return this.employee.calculateTotalCost() + this.projectBonus;
  }

  getResponsibilities(): string[] {
    return [
      ...this.employee.getResponsibilities(),
      `Lead ${this.projectName} project`,
      'Coordinate project deliverables',
      'Report project status to management'
    ];
  }
}
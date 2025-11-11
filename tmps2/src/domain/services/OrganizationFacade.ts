import { Department } from '../models/Department';
import { Employee } from '../models/Employee';
import { Programmer } from '../models/Programmer';
import { Manager } from '../models/Manager';
import { PersonBuilder } from '../models/Person';
import { OrganizationComponent } from '../models/OrganizationComponent';
import { 
  CertificationDecorator, 
  LeadershipDecorator, 
  OvertimeDecorator, 
  SpecialProjectDecorator 
} from '../decorators/EmployeeDecorators';
import { 
  NotificationService, 
  UrgentNotificationService, 
  StandardNotificationService,
  EmailNotificationSender,
  SMSNotificationSender 
} from './NotificationServices';
import { EmployeeCreationContext } from './EmployeeCreationStrategies';

// Facade Pattern - Simplifies complex subsystem interactions
export class OrganizationManagementFacade {
  private rootDepartment: Department;
  private notificationService: NotificationService;
  private employeeCreationContext: EmployeeCreationContext;

  constructor(companyName: string = "Tech Corporation") {
    this.rootDepartment = new Department(companyName, 1_000_000);
    this.notificationService = new StandardNotificationService(new EmailNotificationSender());
    
    // Initialize employee creation context
    this.employeeCreationContext = new EmployeeCreationContext();
  }

  createEmployee(
    firstName: string, 
    lastName: string, 
    type: 'programmer' | 'manager',
    salary: number,
    departmentName?: string,
    options?: {
      age?: number;
      address?: string;
      phone?: string;
      languages?: string[];
      teamSize?: number;
    }
  ): Employee {
    // Get the appropriate creation strategy
    const strategy = this.employeeCreationContext.getStrategy(type);
    
    // Use strategy to create employee with type-specific logic and factory
    const employee = strategy.createEmployee(
      firstName,
      lastName,
      salary,
      options
    );

    if (departmentName) {
      this.addEmployeeToDepartment(employee, departmentName);
    }

    this.notificationService.send(
      `Welcome ${firstName} ${lastName} to the organization!`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`
    );

    return employee;
  }

  createEnhancedEmployee(
    baseEmployee: Employee,
    enhancements: {
      certifications?: string[];
      hasLeadership?: boolean;
      overtimeHours?: number;
      specialProject?: string;
    }
  ): any {
    let enhanced: any = baseEmployee;

    if (enhancements.certifications) {
      enhancements.certifications.forEach(cert => {
        enhanced = new CertificationDecorator(enhanced, cert);
      });
    }

    if (enhancements.hasLeadership) {
      enhanced = new LeadershipDecorator(enhanced);
    }

    if (enhancements.overtimeHours && enhancements.overtimeHours > 0) {
      enhanced = new OvertimeDecorator(enhanced, enhancements.overtimeHours);
    }

    if (enhancements.specialProject) {
      enhanced = new SpecialProjectDecorator(enhanced, enhancements.specialProject);
    }

    return enhanced;
  }

  createDepartment(name: string, budget: number = 100_000, parentDepartment?: string): Department {
    const department = new Department(name, budget);
    
    if (parentDepartment) {
      const parent = this.findDepartment(parentDepartment);
      if (parent) {
        parent.addComponent(department);
      } else {
        this.rootDepartment.addComponent(department);
      }
    } else {
      this.rootDepartment.addComponent(department);
    }

    this.notificationService.send(
      `New department '${name}' created with budget $${budget}`,
      'hr@company.com'
    );

    return department;
  }

  addEmployeeToDepartment(employee: Employee, departmentName: string): boolean {
    const department = this.findDepartment(departmentName);
    if (department) {
      department.addComponent(employee);
      return true;
    }
    return false;
  }

  getOrganizationReport(): string {
    return `
=== ORGANIZATION REPORT ===
${this.rootDepartment.displayInfo()}

=== SUMMARY ===
Total Employees: ${this.rootDepartment.getEmployeeCount()}
Total Salary Expense: $${this.rootDepartment.calculateSalary()}
Budget Utilization: ${this.rootDepartment.getBudgetUtilization().toFixed(2)}%
Within Budget: ${this.rootDepartment.isWithinBudget() ? 'YES' : 'NO'}
    `.trim();
  }

  findEmployees(name: string): OrganizationComponent[] {
    return this.rootDepartment.findEmployeesByName(name);
  }

  switchNotificationMethod(method: 'email' | 'sms' | 'urgent'): void {
    switch (method) {
      case 'email':
        this.notificationService.setSender(new EmailNotificationSender());
        break;
      case 'sms':
        this.notificationService.setSender(new SMSNotificationSender());
        break;
      case 'urgent':
        this.notificationService = new UrgentNotificationService(new EmailNotificationSender());
        break;
    }
  }

  sendAnnouncement(message: string): string[] {
    const results: string[] = [];
    
    const recipients = ['all@company.com', 'managers@company.com', 'developers@company.com'];
    
    recipients.forEach(recipient => {
      results.push(this.notificationService.send(message, recipient));
    });

    return results;
  }

  getDepartmentStats(): any {
    const stats = {
      totalDepartments: 0,
      totalEmployees: this.rootDepartment.getEmployeeCount(),
      totalSalaryCost: this.rootDepartment.calculateSalary(),
      budgetUtilization: this.rootDepartment.getBudgetUtilization(),
      isWithinBudget: this.rootDepartment.isWithinBudget()
    };

    const countDepartments = (component: OrganizationComponent): number => {
      let count = 0;
      if (component instanceof Department) {
        count = 1;
        component.getComponents().forEach(child => {
          count += countDepartments(child);
        });
      }
      return count;
    };

    stats.totalDepartments = countDepartments(this.rootDepartment);
    return stats;
  }

  // Private helper methods
  private findDepartment(name: string): Department | null {
    const searchInComponent = (component: OrganizationComponent): Department | null => {
      if (component instanceof Department && component.getName() === name) {
        return component;
      }
      
      if (component instanceof Department) {
        for (const child of component.getComponents()) {
          const found = searchInComponent(child);
          if (found) return found;
        }
      }
      
      return null;
    };

    return searchInComponent(this.rootDepartment);
  }

  getRootDepartment(): Department {
    return this.rootDepartment;
  }
}
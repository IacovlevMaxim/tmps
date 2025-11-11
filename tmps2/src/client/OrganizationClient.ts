import { OrganizationManagementFacade } from '../domain/services/OrganizationFacade';
import { Logger, ConfigurationManager } from '../utilities/Singletons';
import { 
  TechDivisionFactory, 
  ManagementDivisionFactory 
} from '../domain/factories/EmployeeFactories';
import { 
  CertificationDecorator, 
  LeadershipDecorator, 
  OvertimeDecorator, 
  SpecialProjectDecorator 
} from '../domain/decorators/EmployeeDecorators';

/**
 * Composite: Department/Employee hierarchy
 * Decorator: Employee enhancements
 * Facade: Simplified interface for complex operations
 * Bridge: Notification system abstraction
 */
export class OrganizationClient {
  private facade: OrganizationManagementFacade;
  private logger: Logger;
  private config: ConfigurationManager;

  constructor() {
    this.logger = Logger.getInstance();
    this.config = ConfigurationManager.getInstance();
    
    this.facade = new OrganizationManagementFacade(this.config.get('companyName'));
    
    this.logger.log('Organization Management System initialized');
  }

  public demonstrateStructuralPatterns(): void {
    this.demonstrateCompositePattern();
    this.demonstrateDecoratorPattern();  
    this.demonstrateFacadePattern();
    this.demonstrateBridgePattern();
    this.showFinalReport();
  }

  private demonstrateCompositePattern(): void {
    this.facade.createDepartment('Engineering', 500000);
    this.facade.createDepartment('Frontend Team', 200000, 'Engineering');
    this.facade.createDepartment('Backend Team', 250000, 'Engineering');
    this.facade.createDepartment('DevOps Team', 150000, 'Engineering');

    this.facade.createDepartment('Marketing', 300000);
    this.facade.createDepartment('Human Resources', 200000);

    // Use Abstract Factory to create employees
    const techFactory = new TechDivisionFactory();
    const mgmtFactory = new ManagementDivisionFactory();

    const employees = [
      this.facade.createEmployee('Alice', 'Johnson', 'programmer', 85000, 'Frontend Team', {
        age: 28, languages: ['React', 'TypeScript', 'CSS']
      }),
      this.facade.createEmployee('Bob', 'Smith', 'programmer', 90000, 'Backend Team', {
        age: 30, languages: ['Node.js', 'Python', 'PostgreSQL']
      }),
      this.facade.createEmployee('Charlie', 'Brown', 'manager', 110000, 'Engineering', {
        age: 35, teamSize: 12
      }),
      techFactory.createSeniorEmployee('Diana', 'Wilson'),
      mgmtFactory.createJuniorEmployee('Eve', 'Davis')
    ];

    // Add factory-created employees to departments
    this.facade.addEmployeeToDepartment(employees[3], 'DevOps Team');
    this.facade.addEmployeeToDepartment(employees[4], 'Human Resources');

    console.log('Composite structure created with departments and employees');
    console.log(`Total employees: ${this.facade.getRootDepartment().getEmployeeCount()}`);
    console.log(`Total salary cost: $${this.facade.getRootDepartment().calculateSalary()}`);
    console.log();

    this.logger.log('Composite pattern demonstrated - organizational hierarchy created');
  }

  private demonstrateDecoratorPattern(): void {
    console.log('Decorator pattern - Enhancing Employee Capabilities');
    console.log('====================================================');

    // Create a base employee
    const baseEmployee = this.facade.createEmployee('Frank', 'Miller', 'programmer', 75000);
    
    console.log(`Base Employee: ${baseEmployee.getDescription()}`);
    console.log(`Base Cost: $${baseEmployee.calculateTotalCost()}`);
    console.log(`Base Responsibilities: ${baseEmployee.getResponsibilities().length}`);

    let enhancedEmployee: any = new CertificationDecorator(baseEmployee, 'AWS Solutions Architect', 8000);
    enhancedEmployee = new LeadershipDecorator(enhancedEmployee, 12000);
    enhancedEmployee = new OvertimeDecorator(enhancedEmployee, 20, 75); // 20 hours at $75/hour
    enhancedEmployee = new SpecialProjectDecorator(enhancedEmployee, 'Cloud Migration', 10000);

    console.log('\nAfter applying decorators:');
    console.log(`Enhanced Employee: ${enhancedEmployee.getDescription()}`);
    console.log(`Enhanced Cost: $${enhancedEmployee.calculateTotalCost()}`);
    console.log(`Enhanced Responsibilities: ${enhancedEmployee.getResponsibilities().length}`);
    console.log('\nAll Responsibilities:');
    enhancedEmployee.getResponsibilities().forEach((resp: string, index: number) => {
      console.log(`  ${index + 1}. ${resp}`);
    });

    console.log(`\nCost increase: $${enhancedEmployee.calculateTotalCost() - baseEmployee.calculateTotalCost()}`);
    console.log();

    this.logger.log('Decorator pattern demonstrated - employee enhanced with multiple decorators');
  }

  private demonstrateFacadePattern(): void {
    console.log('Facade Pattern - Simplified Organization Management');
    console.log('===================================================');

    console.log('Creating enhanced employees through Facade:');
    const programmer = this.facade.createEmployee('Grace', 'Lee', 'programmer', 80000, 'Backend Team');
    const enhancedProgrammer = this.facade.createEnhancedEmployee(programmer, {
      certifications: ['Docker', 'Kubernetes'],
      hasLeadership: true,
      overtimeHours: 15,
      specialProject: 'Microservices Architecture'
    });

    console.log(`Created: ${enhancedProgrammer.getDescription()}`);
    console.log(`Total Cost: $${enhancedProgrammer.calculateTotalCost()}`);

    console.log('\nFinding employees:');
    const foundEmployees = this.facade.findEmployees('Alice');
    foundEmployees.forEach(emp => {
      console.log(`  Found: ${emp.getName()}`);
    });

    const stats = this.facade.getDepartmentStats();
    console.log('\nOrganization Statistics:');
    console.log(`  Departments: ${stats.totalDepartments}`);
    console.log(`  Employees: ${stats.totalEmployees}`);
    console.log(`  Total Cost: $${stats.totalSalaryCost}`);
    console.log(`  Budget Utilization: ${stats.budgetUtilization.toFixed(2)}%`);
    console.log();

    this.logger.log('Facade pattern demonstrated - complex operations simplified');
  }

  private demonstrateBridgePattern(): void {
    console.log('Bridge Pattern - Flexible Notification System');
    console.log('===============================================');

    console.log('📧 Testing different notification methods:');
    
    // Switch between different notification implementations
    console.log('\n1. Standard Email Notifications:');
    this.facade.switchNotificationMethod('email');
    const emailResults = this.facade.sendAnnouncement('Monthly team meeting scheduled for Friday');
    emailResults.forEach(result => console.log(`  ${result}`));

    console.log('\n2. SMS Notifications:');
    this.facade.switchNotificationMethod('sms');
    const smsResults = this.facade.sendAnnouncement('Emergency server maintenance tonight');
    smsResults.forEach(result => console.log(`  ${result}`));

    console.log('\n3. Urgent Email Notifications:');
    this.facade.switchNotificationMethod('urgent');
    const urgentResults = this.facade.sendAnnouncement('Security breach detected - immediate action required');
    urgentResults.forEach(result => console.log(`  ${result}`));

    this.logger.log('Bridge pattern demonstrated - notification methods switched dynamically');
  }

  private showFinalReport(): void {
    
    const report = this.facade.getOrganizationReport();
    console.log(report);

    console.log('\nSystem Logs:');
    const logs = this.logger.getLogs();
    logs.slice(-5).forEach(log => console.log(`  ${log}`));
  }

  public getFacade(): OrganizationManagementFacade {
    return this.facade;
  }
}
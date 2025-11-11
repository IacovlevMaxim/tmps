// Base interface for organizational components (Composite Pattern)
export interface OrganizationComponent {
  getName(): string;
  calculateSalary(): number;
  getEmployeeCount(): number;
  displayInfo(indent?: number): string;
  addComponent(component: OrganizationComponent): void;
  removeComponent(component: OrganizationComponent): void;
  getComponents(): OrganizationComponent[];
}
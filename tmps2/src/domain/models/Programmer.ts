import { Employee } from './Employee';

export class Programmer extends Employee {
  private programmingLanguages: string[];

  constructor(firstName: string, lastName: string, age: number, address: string, phone: string, salary: number, languages: string[] = []) {
    super(firstName, lastName, age, address, phone, salary, 'Programmer');
    this.programmingLanguages = languages;
  }

  getProgrammingLanguages(): string[] {
    return [...this.programmingLanguages];
  }

  addProgrammingLanguage(language: string): void {
    if (!this.programmingLanguages.includes(language)) {
      this.programmingLanguages.push(language);
    }
  }

  getDescription(): string {
    const langStr = this.programmingLanguages.length > 0 
      ? ` (Languages: ${this.programmingLanguages.join(', ')})` 
      : '';
    return `${super.getDescription()}${langStr}`;
  }

  getResponsibilities(): string[] {
    return [
      'Write and maintain code',
      'Debug applications',
      'Code reviews',
      'Technical documentation'
    ];
  }
}
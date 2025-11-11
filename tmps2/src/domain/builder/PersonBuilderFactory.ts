import { PersonBuilder } from '../models/Person';

export class PersonBuilderFactory {
  static createStandardEmployee(firstName: string, lastName: string): PersonBuilder {
    return new PersonBuilder(firstName, lastName)
      .age(25)
      .address("Standard Address")
      .phone("555-0000");
  }

  static createSeniorEmployee(firstName: string, lastName: string): PersonBuilder {
    return new PersonBuilder(firstName, lastName)
      .age(35)
      .address("Senior District")
      .phone("555-1000");
  }

  static createExecutive(firstName: string, lastName: string): PersonBuilder {
    return new PersonBuilder(firstName, lastName)
      .age(45)
      .address("Executive Plaza")
      .phone("555-9000");
  }
}
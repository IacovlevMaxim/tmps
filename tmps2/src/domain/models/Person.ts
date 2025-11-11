import { Prototype, PoolObject } from './Interfaces';

// Builder pattern implementation first
export class PersonBuilder {
  private readonly firstName: string;
  private readonly lastName: string;
  private personAge: number = 0;
  private personAddress: string | undefined;
  private personPhone: string | undefined;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  setAge(age: number): this {
    this.personAge = age;
    return this;
  }

  age(age: number): this {
    return this.setAge(age);
  }

  setAddress(address: string): this {
    this.personAddress = address;
    return this;
  }

  address(address: string): this {
    return this.setAddress(address);
  }

  setPhone(phone: string): this {
    this.personPhone = phone;
    return this;
  }

  phone(phone: string): this {
    return this.setPhone(phone);
  }

  build(): Person {
    return new Person(this.firstName, this.lastName, this.personAge, this.personAddress, this.personPhone);
  }
}

export class Person implements Prototype<Person>, PoolObject {
  private firstName: string | undefined;
  private lastName: string | undefined;
  private age: number = 0;
  private address: string | undefined;
  private phone: string | undefined;

  constructor();
  constructor(firstName: string, lastName: string, age?: number, address?: string, phone?: string);
  constructor(firstName?: string, lastName?: string, age: number = 0, address?: string, phone?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
    this.phone = phone;
  }

  // Getters
  getFirstName(): string | undefined {
    return this.firstName;
  }

  getLastName(): string | undefined {
    return this.lastName;
  }

  getAge(): number {
    return this.age;
  }

  getAddress(): string | undefined {
    return this.address;
  }

  getPhone(): string | undefined {
    return this.phone;
  }

  // Setters
  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  setAge(age: number): void {
    this.age = age;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  toString(): string {
    return `Person{firstName='${this.firstName}', lastName='${this.lastName}', age=${this.age}, address='${this.address}', phone='${this.phone}'}`;
  }

  // Prototype pattern implementation
  copy(): Person {
    const builder = new PersonBuilder(this.firstName!, this.lastName!);
    if (this.age !== 0) builder.setAge(this.age);
    if (this.address) builder.setAddress(this.address);
    if (this.phone) builder.setPhone(this.phone);
    return builder.build();
  }

  // PoolObject pattern implementation
  reset(): void {
    this.firstName = undefined;
    this.lastName = undefined;
    this.age = 0;
    this.address = undefined;
    this.phone = undefined;
  }
}


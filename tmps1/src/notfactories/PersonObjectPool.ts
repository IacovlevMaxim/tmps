import { Person } from './Person';
import { ObjectFactory } from './interfaces/ObjectFactory';

export class PersonObjectPool {
  private pool: Person[] = [];
  private maxPoolSize: number;
  private objectFactory: ObjectFactory<Person>;
  private static instance: PersonObjectPool | null = null;

  private constructor(maxPoolSize: number, objectFactory: ObjectFactory<Person>) {
    this.maxPoolSize = maxPoolSize;
    this.objectFactory = objectFactory;
  }

  static getInstance(maxPoolSize: number): PersonObjectPool {
    if (PersonObjectPool.instance === null) {
      PersonObjectPool.instance = new PersonObjectPool(maxPoolSize, {
        createObject: () => new Person()
      });
    }
    return PersonObjectPool.instance;
  }

  borrowObject(): Person {
    let person = this.pool.pop();
    if (!person) {
      person = this.objectFactory.createObject();
    }
    return person;
  }

  returnObject(obj: Person | null): void {
    if (!obj) {
      return;
    }

    obj.reset();
    if (this.pool.length < this.maxPoolSize) {
      this.pool.push(obj);
    }
  }
}
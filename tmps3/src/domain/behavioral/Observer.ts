/**
 * Observer Pattern Implementation
 * 
 * This pattern defines a one-to-many dependency between objects so that when one object 
 * changes state, all its dependents are notified and updated automatically.
 */

export interface Observer {
  update(subject: Subject, event: string, data?: any): void;
  getId(): string;
}

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(event: string, data?: any): void;
}

/**
 * Base implementation of Subject interface
 */
export abstract class BaseSubject implements Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    if (!this.observers.find(obs => obs.getId() === observer.getId())) {
      this.observers.push(observer);
      console.log(`Observer ${observer.getId()} attached to ${this.constructor.name}`);
    }
  }

  detach(observer: Observer): void {
    const index = this.observers.findIndex(obs => obs.getId() === observer.getId());
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log(`Observer ${observer.getId()} detached from ${this.constructor.name}`);
    }
  }

  notify(event: string, data?: any): void {
    console.log(`\nNotifying ${this.observers.length} observers about event: ${event}`);
    for (const observer of this.observers) {
      observer.update(this, event, data);
    }
  }

  protected getObserverCount(): number {
    return this.observers.length;
  }
}
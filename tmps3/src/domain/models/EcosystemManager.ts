import { Observer, Subject } from '../behavioral/Observer';
import { CommandReceiver } from '../behavioral/Command';
import { Animal } from './Animal';

/**
 * Ecosystem Manager that acts as both Observer and Command Receiver
 */
export class EcosystemManager implements Observer, CommandReceiver {
  private id: string;
  private managedAnimals: Map<string, Animal>;
  private activityLog: string[];

  constructor(id: string) {
    this.id = id;
    this.managedAnimals = new Map();
    this.activityLog = [];
  }

  // Observer pattern implementation
  update(subject: Subject, event: string, data?: any): void {
    if (subject instanceof Animal) {
      const animal = subject as Animal;
      const logEntry = `[${new Date().toLocaleTimeString()}] ${this.id} observed: ${animal.getName()} - ${event}`;
      
      switch (event) {
        case 'fed':
          console.log(`   ${logEntry} (Hunger reduced from ${data.previousHunger} to ${data.hunger})`);
          break;
        case 'moved':
          console.log(`   ${logEntry} (From ${data.oldLocation} to ${data.newLocation})`);
          break;
        case 'treated':
          console.log(`   ${logEntry} (${data.treatment}, Health: ${data.previousHealth} → ${data.health})`);
          break;
        case 'behaviorChanged':
          console.log(`   ${logEntry} (New behavior: ${data.newBehavior})`);
          break;
        case 'madeSound':
          console.log(`   ${logEntry} (Sound: ${data.sound})`);
          break;
        case 'timePassedHunger':
          if (data.hunger > 70) {
            console.log(`   ${logEntry} HIGH HUNGER ALERT! (${data.hunger})`);
          }
          break;
        default:
          console.log(`   ${logEntry} (${JSON.stringify(data)})`);
      }
      
      this.activityLog.push(logEntry);
      
      // Automatic responses to certain events
      this.autoRespond(animal, event, data);
    }
  }

  private autoRespond(animal: Animal, event: string, data?: any): void {
    // Auto-response logic based on observed events
    if (event === 'timePassedHunger' && data.hunger > 85) {
      console.log(`${this.id} initiating emergency feeding for ${animal.getName()}`);
    } else if (event === 'treated' && data.health > 95) {
      console.log(`${this.id} notes: ${animal.getName()} has fully recovered!`);
    }
  }

  getId(): string {
    return this.id;
  }

  // Command pattern implementation (CommandReceiver)
  performAction(action: string, target?: string): string {
    const timestamp = new Date().toLocaleTimeString();
    let result = "";

    switch (action) {
      case 'feed':
        result = `[${timestamp}] ${this.id} fed ${target}`;
        break;
      case 'unfeed':
        result = `[${timestamp}] ${this.id} undid feeding of ${target}`;
        break;
      case 'move':
        result = `[${timestamp}] ${this.id} moved ${target}`;
        break;
      case 'return':
        result = `[${timestamp}] ${this.id} returned ${target} to original location`;
        break;
      case 'treat':
        result = `[${timestamp}] ${this.id} treated ${target}`;
        break;
      case 'untreat':
        result = `[${timestamp}] ${this.id} undid treatment for ${target}`;
        break;
      default:
        result = `[${timestamp}] ${this.id} performed unknown action: ${action} on ${target}`;
    }

    console.log(`   ${result}`);
    this.activityLog.push(result);
    return result;
  }

  // Animal management
  addAnimal(animal: Animal): void {
    this.managedAnimals.set(animal.getName(), animal);
    animal.attach(this);
    console.log(`${this.id} now managing ${animal.getName()} (${animal.getSpecies()})`);
  }

  removeAnimal(animalName: string): void {
    const animal = this.managedAnimals.get(animalName);
    if (animal) {
      animal.detach(this);
      this.managedAnimals.delete(animalName);
      console.log(`${this.id} no longer managing ${animalName}`);
    }
  }

  getAnimal(name: string): Animal | undefined {
    return this.managedAnimals.get(name);
  }

  getAllAnimals(): Animal[] {
    return Array.from(this.managedAnimals.values());
  }

  // Utility methods
  generateStatusReport(): string {
    const report = [
      `\n === ECOSYSTEM STATUS REPORT by ${this.id} ===`,
      `Animals under management: ${this.managedAnimals.size}`,
      `Recent activities: ${this.activityLog.length}`,
      "",
      "ANIMAL STATUS:",
    ];

    this.managedAnimals.forEach(animal => {
      report.push(`   ${animal.getStatus()}`);
    });

    report.push("");
    report.push("RECENT ACTIVITY LOG (Last 10 entries):");
    const recentLogs = this.activityLog.slice(-10);
    recentLogs.forEach(log => {
      report.push(`   ${log}`);
    });

    report.push("=".repeat(50));
    return report.join("\n");
  }

  clearActivityLog(): void {
    this.activityLog = [];
    console.log(`${this.id} cleared activity log`);
  }

  simulateTimeForAllAnimals(): void {
    console.log(`\n${this.id} simulating time passage for all animals...`);
    this.managedAnimals.forEach(animal => {
      animal.simulateTimePass();
    });
  }
}
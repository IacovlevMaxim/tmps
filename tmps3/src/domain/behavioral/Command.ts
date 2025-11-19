/**
 * Command Pattern Implementation
 * 
 * This pattern encapsulates a request as an object, thereby letting you parameterize 
 * clients with different requests, queue or log requests, and support undoable operations.
 */

export interface Command {
  execute(): void;
  undo(): void;
  getDescription(): string;
}

export interface CommandReceiver {
  performAction(action: string, target?: string): string;
}

export class FeedAnimalCommand implements Command {
  private receiver: CommandReceiver;
  private animalName: string;
  private executed: boolean = false;

  constructor(receiver: CommandReceiver, animalName: string) {
    this.receiver = receiver;
    this.animalName = animalName;
  }

  execute(): void {
    if (!this.executed) {
      this.receiver.performAction("feed", this.animalName);
      this.executed = true;
      console.log(`Executed: Feed ${this.animalName}`);
    } else {
      console.log(`Command already executed: Feed ${this.animalName}`);
    }
  }

  undo(): void {
    if (this.executed) {
      this.receiver.performAction("unfeed", this.animalName);
      this.executed = false;
      console.log(`Undone: Feed ${this.animalName}`);
    } else {
      console.log(`Nothing to undo for: Feed ${this.animalName}`);
    }
  }

  getDescription(): string {
    return `Feed animal: ${this.animalName}`;
  }
}

export class MoveAnimalCommand implements Command {
  private receiver: CommandReceiver;
  private animalName: string;
  private location: string;
  private executed: boolean = false;

  constructor(receiver: CommandReceiver, animalName: string, location: string) {
    this.receiver = receiver;
    this.animalName = animalName;
    this.location = location;
  }

  execute(): void {
    if (!this.executed) {
      this.receiver.performAction("move", `${this.animalName} to ${this.location}`);
      this.executed = true;
      console.log(`Executed: Move ${this.animalName} to ${this.location}`);
    } else {
      console.log(`Command already executed: Move ${this.animalName}`);
    }
  }

  undo(): void {
    if (this.executed) {
      this.receiver.performAction("return", this.animalName);
      this.executed = false;
      console.log(`Undone: Move ${this.animalName} (returned to original location)`);
    } else {
      console.log(`Nothing to undo for: Move ${this.animalName}`);
    }
  }

  getDescription(): string {
    return `Move animal: ${this.animalName} to ${this.location}`;
  }
}

export class TreatAnimalCommand implements Command {
  private receiver: CommandReceiver;
  private animalName: string;
  private treatment: string;
  private executed: boolean = false;

  constructor(receiver: CommandReceiver, animalName: string, treatment: string) {
    this.receiver = receiver;
    this.animalName = animalName;
    this.treatment = treatment;
  }

  execute(): void {
    if (!this.executed) {
      this.receiver.performAction("treat", `${this.animalName} with ${this.treatment}`);
      this.executed = true;
      console.log(`Executed: Treat ${this.animalName} with ${this.treatment}`);
    } else {
      console.log(`Command already executed: Treat ${this.animalName}`);
    }
  }

  undo(): void {
    if (this.executed) {
      this.receiver.performAction("untreat", this.animalName);
      this.executed = false;
      console.log(`Undone: Treatment for ${this.animalName}`);
    } else {
      console.log(`Nothing to undo for: Treat ${this.animalName}`);
    }
  }

  getDescription(): string {
    return `Treat animal: ${this.animalName} with ${this.treatment}`;
  }
}

export class EcosystemCommandInvoker {
  private commandHistory: Command[] = [];
  private currentIndex: number = -1;

  executeCommand(command: Command): void {
    // Remove any commands after current position (for redo functionality)
    this.commandHistory = this.commandHistory.slice(0, this.currentIndex + 1);
    
    command.execute();
    this.commandHistory.push(command);
    this.currentIndex++;
  }

  undo(): void {
    if (this.currentIndex >= 0) {
      const command = this.commandHistory[this.currentIndex];
      command?.undo();
      this.currentIndex--;
      console.log(`Undo completed. Position: ${this.currentIndex + 1}/${this.commandHistory.length}`);
    } else {
      console.log("Nothing to undo");
    }
  }

  redo(): void {
    if (this.currentIndex < this.commandHistory.length - 1) {
      this.currentIndex++;
      const command = this.commandHistory[this.currentIndex];
      command?.execute();
      console.log(`Redo completed. Position: ${this.currentIndex + 1}/${this.commandHistory.length}`);
    } else {
      console.log("Nothing to redo");
    }
  }

  getCommandHistory(): string[] {
    return this.commandHistory.map((cmd, index) => 
      `${index + 1}. ${cmd.getDescription()} ${index === this.currentIndex ? '← Current' : ''}`
    );
  }

  clearHistory(): void {
    this.commandHistory = [];
    this.currentIndex = -1;
    console.log("Command history cleared");
  }
}
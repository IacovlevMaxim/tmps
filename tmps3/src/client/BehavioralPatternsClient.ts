/**
 * Main Client for Behavioral Design Patterns Demonstration
 * 
 * This is the unified client that demonstrates all implemented behavioral patterns:
 * - Observer Pattern
 * - Strategy Pattern  
 * - Command Pattern
 * - Chain of Responsibility Pattern
 */

import { Lion, Elephant, Monkey, Penguin } from '../domain/models/Animal';
import { EcosystemManager } from '../domain/models/EcosystemManager';
import { 
  AggressiveBehavior, 
  PlayfulBehavior, 
  CalmBehavior, 
  HuntingBehavior, 
  SocialBehavior, 
  DefensiveBehavior 
} from '../domain/behavioral/Strategy';
import { 
  FeedAnimalCommand, 
  MoveAnimalCommand, 
  TreatAnimalCommand, 
  EcosystemCommandInvoker 
} from '../domain/behavioral/Command';
import {
  EmergencyHandler,
  MedicalHandler,
  FeedingHandler,
  MaintenanceHandler,
  VisitorHandler,
  EcosystemRequestBuilder,
  RequestType
} from '../domain/behavioral/ChainOfResponsibility';
import { ConsoleFormatter, DelayUtil, RandomUtil } from '../utilities/Utils';

export class BehavioralPatternsClient {
  private ecosystemManager: EcosystemManager;
  private commandInvoker: EcosystemCommandInvoker;
  private requestHandlerChain!: EmergencyHandler;

  constructor() {
    this.ecosystemManager = new EcosystemManager("MainEcosystemManager");
    this.commandInvoker = new EcosystemCommandInvoker();
    this.setupRequestHandlerChain();
  }

  private setupRequestHandlerChain(): void {
    const emergencyHandler = new EmergencyHandler();
    const medicalHandler = new MedicalHandler();
    const feedingHandler = new FeedingHandler();
    const maintenanceHandler = new MaintenanceHandler();
    const visitorHandler = new VisitorHandler();

    // Set up the chain: Emergency -> Medical -> Feeding -> Maintenance -> Visitor
    emergencyHandler
      .setNext(medicalHandler)
      .setNext(feedingHandler)
      .setNext(maintenanceHandler)
      .setNext(visitorHandler);

    this.requestHandlerChain = emergencyHandler;
  }

  async run(): Promise<void> {
    ConsoleFormatter.printHeader("BEHAVIORAL DESIGN PATTERNS DEMONSTRATION");
    console.log("🎯 Demonstrating Observer, Strategy, Command, and Chain of Responsibility patterns");
    console.log("🌍 In an Ecosystem Management System\n");

    await this.demonstrateObserverPattern();
    await DelayUtil.wait(2000);

    await this.demonstrateStrategyPattern();
    await DelayUtil.wait(2000);

    await this.demonstrateCommandPattern();
    await DelayUtil.wait(2000);

    await this.demonstrateChainOfResponsibilityPattern();
    await DelayUtil.wait(2000);

    await this.generateFinalReport();
  }

  private async demonstrateObserverPattern(): Promise<void> {
    ConsoleFormatter.printHeader("OBSERVER PATTERN DEMONSTRATION");
    ConsoleFormatter.printInfo("Animals notify observers about state changes");

    const simba = new Lion("Simba", "Pride Rock");
    const dumbo = new Elephant("Dumbo", "Elephant Valley");
    const curious = new Monkey("Curious George", "Jungle");
    
    this.ecosystemManager.addAnimal(simba);
    this.ecosystemManager.addAnimal(dumbo);
    this.ecosystemManager.addAnimal(curious);

    console.log("\nStarting animal activities...\n");

    simba.makeSound();
    await DelayUtil.wait(500);

    dumbo.feed();
    await DelayUtil.wait(500);

    curious.moveTo("Tree House");
    await DelayUtil.wait(500);

    simba.treat("Vitamin supplements");
    await DelayUtil.wait(500);

    console.log("\nSimulating time passage...");
    this.ecosystemManager.simulateTimeForAllAnimals();

    ConsoleFormatter.printSuccess("Observer Pattern demonstration completed!");
  }

  private async demonstrateStrategyPattern(): Promise<void> {
    ConsoleFormatter.printHeader("STRATEGY PATTERN DEMONSTRATION");
    ConsoleFormatter.printInfo("Animals can dynamically change their behavior strategies");

    const animals = this.ecosystemManager.getAllAnimals();
    const strategies = [
      new AggressiveBehavior(),
      new PlayfulBehavior(),
      new CalmBehavior(),
      new HuntingBehavior(),
      new SocialBehavior(),
      new DefensiveBehavior()
    ];

    console.log("\nDemonstrating different behavior strategies...\n");

    for (const animal of animals) {
      // Show current behavior
      console.log(`\n${animal.getName()} demonstrations:`);
      animal.performBehavior();

      // Change to random strategies
      for (let i = 0; i < 2; i++) {
        const randomStrategy = RandomUtil.getRandomElement(strategies);
        animal.setBehavior(randomStrategy as DefensiveBehavior);
        animal.performBehavior();
        await DelayUtil.wait(300);
      }
    }

    ConsoleFormatter.printSuccess("Strategy Pattern demonstration completed!");
  }

  private async demonstrateCommandPattern(): Promise<void> {
    ConsoleFormatter.printHeader("COMMAND PATTERN DEMONSTRATION");
    ConsoleFormatter.printInfo("Ecosystem operations with undo/redo functionality");

    const animals = this.ecosystemManager.getAllAnimals();
    
    console.log("\nCreating and executing commands...\n");

    // Create various commands
    const commands = [
      new FeedAnimalCommand(this.ecosystemManager, "Simba"),
      new MoveAnimalCommand(this.ecosystemManager, "Dumbo", "Watering Hole"),
      new TreatAnimalCommand(this.ecosystemManager, "Curious George", "Health Check"),
      new FeedAnimalCommand(this.ecosystemManager, "Dumbo"),
      new MoveAnimalCommand(this.ecosystemManager, "Simba", "Hunting Grounds")
    ];

    // Execute commands
    for (const command of commands) {
      this.commandInvoker.executeCommand(command);
      await DelayUtil.wait(400);
    }

    console.log("\n📜 Command History:");
    const history = this.commandInvoker.getCommandHistory();
    history.forEach(entry => console.log(`   ${entry}`));

    // Demonstrate undo functionality
    console.log("\nDemonstrating undo operations...");
    for (let i = 0; i < 3; i++) {
      this.commandInvoker.undo();
      await DelayUtil.wait(300);
    }

    // Demonstrate redo functionality
    console.log("\nDemonstrating redo operations...");
    for (let i = 0; i < 2; i++) {
      this.commandInvoker.redo();
      await DelayUtil.wait(300);
    }

    ConsoleFormatter.printSuccess("Command Pattern demonstration completed!");
  }

  private async demonstrateChainOfResponsibilityPattern(): Promise<void> {
    ConsoleFormatter.printHeader("CHAIN OF RESPONSIBILITY DEMONSTRATION");
    ConsoleFormatter.printInfo("Different handlers process requests based on type and priority");

    console.log("\nProcessing various ecosystem requests...\n");

    // Create different types of requests
    const requests = [
      EcosystemRequestBuilder.createEmergencyRequest("Lion escaped from enclosure!", "Security Guard"),
      EcosystemRequestBuilder.createMedicalRequest("Elephant showing signs of illness", "Veterinarian", 4),
      EcosystemRequestBuilder.createFeedingRequest("Tigers need feeding", "Zookeeper"),
      EcosystemRequestBuilder.createMaintenanceRequest("Broken fence in monkey habitat", "Maintenance Staff", 3),
      EcosystemRequestBuilder.createVisitorRequest("Where is the gift shop?", "Tourist"),
      EcosystemRequestBuilder.createMedicalRequest("Routine health checkup for penguins", "Vet Tech", 2),
      EcosystemRequestBuilder.createMaintenanceRequest("Replace burnt light bulb", "Janitor", 1),
      EcosystemRequestBuilder.createEmergencyRequest("Visitor injury in lion area", "First Aid")
    ];

    // Process each request through the chain
    for (const request of requests) {
      console.log(`\nProcessing request: ${request.description}`);
      console.log(`Type: ${request.type}, Priority: ${request.priority}, From: ${request.requester}`);
      
      const result = this.requestHandlerChain.handle(request);
      console.log(`Result: ${result}`);
      
      await DelayUtil.wait(600);
    }

    ConsoleFormatter.printSuccess("Chain of Responsibility demonstration completed!");
  }

  private async generateFinalReport(): Promise<void> {
    ConsoleFormatter.printHeader("FINAL ECOSYSTEM REPORT");
    
    console.log(this.ecosystemManager.generateStatusReport());
    
    ConsoleFormatter.printSuccess("Behavioral Design Patterns demonstration completed successfully!");
  }
}
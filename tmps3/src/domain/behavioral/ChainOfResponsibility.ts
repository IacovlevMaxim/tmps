/**
 * Chain of Responsibility Pattern Implementation
 * 
 * This pattern lets you pass requests along a chain of handlers. Upon receiving a request, 
 * each handler decides either to process the request or to pass it to the next handler in the chain.
 */

export enum RequestType {
  EMERGENCY = "EMERGENCY",
  MEDICAL = "MEDICAL", 
  FEEDING = "FEEDING",
  MAINTENANCE = "MAINTENANCE",
  VISITOR = "VISITOR"
}

export interface EcosystemRequest {
  type: RequestType;
  priority: number; // 1-5
  description: string;
  requester: string;
  timestamp: Date;
}

export abstract class RequestHandler {
  protected nextHandler: RequestHandler | null = null;

  setNext(handler: RequestHandler): RequestHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: EcosystemRequest): string {
    if (this.canHandle(request)) {
      return this.processRequest(request);
    } else if (this.nextHandler) {
      console.log(`${this.getHandlerName()} passing request to next handler`);
      return this.nextHandler.handle(request);
    } else {
      return `No handler available for request: ${request.description}`;
    }
  }

  protected abstract canHandle(request: EcosystemRequest): boolean;
  protected abstract processRequest(request: EcosystemRequest): string;
  protected abstract getHandlerName(): string;
}

/**
 * Concrete handlers for different types of requests
 */
export class EmergencyHandler extends RequestHandler {
  protected canHandle(request: EcosystemRequest): boolean {
    return request.type === RequestType.EMERGENCY || request.priority >= 4;
  }

  protected processRequest(request: EcosystemRequest): string {
    const response = `EMERGENCY HANDLER: Immediately addressing "${request.description}" from ${request.requester}`;
    console.log(response);
    console.log("Alerting emergency services");
    console.log("Dispatching emergency team");
    console.log("Creating incident report");
    return response;
  }

  protected getHandlerName(): string {
    return "EmergencyHandler";
  }
}

export class MedicalHandler extends RequestHandler {
  protected canHandle(request: EcosystemRequest): boolean {
    return request.type === RequestType.MEDICAL && request.priority >= 2;
  }

  protected processRequest(request: EcosystemRequest): string {
    const response = `MEDICAL HANDLER: Treating "${request.description}" for ${request.requester}`;
    console.log(response);
    console.log("Conducting medical examination");
    console.log("Administering treatment");
    console.log("Updating medical records");
    return response;
  }

  protected getHandlerName(): string {
    return "MedicalHandler";
  }
}

export class FeedingHandler extends RequestHandler {
  protected canHandle(request: EcosystemRequest): boolean {
    return request.type === RequestType.FEEDING;
  }

  protected processRequest(request: EcosystemRequest): string {
    const response = `FEEDING HANDLER: Handling "${request.description}" for ${request.requester}`;
    console.log(response);
    console.log("Preparing appropriate food");
    console.log("Checking dietary requirements");
    console.log("Scheduling feeding time");
    return response;
  }

  protected getHandlerName(): string {
    return "FeedingHandler";
  }
}

export class MaintenanceHandler extends RequestHandler {
  protected canHandle(request: EcosystemRequest): boolean {
    return request.type === RequestType.MAINTENANCE;
  }

  protected processRequest(request: EcosystemRequest): string {
    const response = `MAINTENANCE HANDLER: Processing "${request.description}" from ${request.requester}`;
    console.log(response);
    console.log("Inspecting equipment/habitat");
    console.log("Performing necessary repairs");
    console.log("Updating maintenance log");
    return response;
  }

  protected getHandlerName(): string {
    return "MaintenanceHandler";
  }
}

export class VisitorHandler extends RequestHandler {
  protected canHandle(request: EcosystemRequest): boolean {
    return request.type === RequestType.VISITOR && request.priority <= 2;
  }

  protected processRequest(request: EcosystemRequest): string {
    const response = `VISITOR HANDLER: Assisting with "${request.description}" for ${request.requester}`;
    console.log(response);
    console.log("Providing information");
    console.log("Giving directions");
    console.log("Connecting to appropriate staff");
    return response;
  }

  protected getHandlerName(): string {
    return "VisitorHandler";
  }
}

/**
 * Request builder for creating ecosystem requests
 */
export class EcosystemRequestBuilder {
  static createEmergencyRequest(description: string, requester: string): EcosystemRequest {
    return {
      type: RequestType.EMERGENCY,
      priority: 5,
      description,
      requester,
      timestamp: new Date()
    };
  }

  static createMedicalRequest(description: string, requester: string, priority: number = 3): EcosystemRequest {
    return {
      type: RequestType.MEDICAL,
      priority: Math.max(1, Math.min(5, priority)),
      description,
      requester,
      timestamp: new Date()
    };
  }

  static createFeedingRequest(description: string, requester: string): EcosystemRequest {
    return {
      type: RequestType.FEEDING,
      priority: 2,
      description,
      requester,
      timestamp: new Date()
    };
  }

  static createMaintenanceRequest(description: string, requester: string, priority: number = 1): EcosystemRequest {
    return {
      type: RequestType.MAINTENANCE,
      priority: Math.max(1, Math.min(5, priority)),
      description,
      requester,
      timestamp: new Date()
    };
  }

  static createVisitorRequest(description: string, requester: string): EcosystemRequest {
    return {
      type: RequestType.VISITOR,
      priority: 1,
      description,
      requester,
      timestamp: new Date()
    };
  }
}
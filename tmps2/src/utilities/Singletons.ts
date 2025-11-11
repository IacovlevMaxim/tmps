export class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}`;
    this.logs.push(logEntry);
    console.log(logEntry);
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export class ConfigurationManager {
  private static instance: ConfigurationManager;
  private config: Map<string, any> = new Map();

  private constructor() {
    // Default configuration
    this.config.set('defaultSalary', 50000);
    this.config.set('defaultAge', 25);
    this.config.set('companyName', 'Tech Corporation');
    this.config.set('notificationMethod', 'email');
  }

  static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  get(key: string): any {
    return this.config.get(key);
  }

  set(key: string, value: any): void {
    this.config.set(key, value);
  }

  getAll(): Map<string, any> {
    return new Map(this.config);
  }
}
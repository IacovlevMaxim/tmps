/**
 * Utility functions and helpers for the behavioral patterns demonstration
 */

/**
 * Logging utility with different levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = LogLevel.INFO;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  debug(message: string): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.log(`🔍 [DEBUG] ${message}`);
    }
  }

  info(message: string): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.log(`ℹ️ [INFO] ${message}`);
    }
  }

  warn(message: string): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.log(`⚠️ [WARN] ${message}`);
    }
  }

  error(message: string): void {
    if (this.logLevel <= LogLevel.ERROR) {
      console.log(`❌ [ERROR] ${message}`);
    }
  }
}

/**
 * Delay utility for simulating async operations
 */
export class DelayUtil {
  static async wait(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static async waitWithMessage(milliseconds: number, message: string): Promise<void> {
    console.log(`${message} (waiting ${milliseconds}ms)`);
    await DelayUtil.wait(milliseconds);
  }
}

/**
 * Random utilities for demonstration purposes
 */
export class RandomUtil {
  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomElement<T>(array: T[]): T | undefined {
    return array[Math.floor(Math.random() * array.length)];
  }

  static getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }
}

/**
 * Console formatting utilities
 */
export class ConsoleFormatter {
  static printSeparator(char: string = "=", length: number = 60): void {
    console.log(char.repeat(length));
  }

  static printHeader(title: string): void {
    const padding = Math.max(0, (60 - title.length) / 2);
    const paddingStr = " ".repeat(Math.floor(padding));
    
    ConsoleFormatter.printSeparator("=");
    console.log(`${paddingStr}${title}`);
    ConsoleFormatter.printSeparator("=");
  }

  static printSubheader(subtitle: string): void {
    console.log(`\n--- ${subtitle} ---`);
  }

  static printSuccess(message: string): void {
    console.log(`Success: ${message}`);
  }

  static printError(message: string): void {
    console.log(`Error: ${message}`);
  }

  static printWarning(message: string): void {
    console.log(`Warning: ${message}`);
  }

  static printInfo(message: string): void {
    console.log(`Info: ${message}`);
  }
}
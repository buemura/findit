import { Injectable, LoggerService as NestLoggerService, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  private formatMessage(message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    return `[${timestamp}] [${ctx}] ${message}`;
  }

  log(message: string, context?: string) {
    console.log(`\x1b[32m${this.formatMessage(message, context)}\x1b[0m`);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(`\x1b[31m${this.formatMessage(message, context)}\x1b[0m`);
    if (trace) {
      console.error(`\x1b[31m${trace}\x1b[0m`);
    }
  }

  warn(message: string, context?: string) {
    console.warn(`\x1b[33m${this.formatMessage(message, context)}\x1b[0m`);
  }

  debug(message: string, context?: string) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`\x1b[36m${this.formatMessage(message, context)}\x1b[0m`);
    }
  }

  verbose(message: string, context?: string) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`\x1b[35m${this.formatMessage(message, context)}\x1b[0m`);
    }
  }
}

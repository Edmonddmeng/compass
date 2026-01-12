import { env } from '../config/env';

class Logger {
  private enabled: boolean;

  constructor() {
    this.enabled = env.enableDebug;
  }

  log(...args: unknown[]) {
    if (this.enabled) {
      console.log('[LOG]', ...args);
    }
  }

  error(...args: unknown[]) {
    if (this.enabled) {
      console.error('[ERROR]', ...args);
    }
  }

  warn(...args: unknown[]) {
    if (this.enabled) {
      console.warn('[WARN]', ...args);
    }
  }

  info(...args: unknown[]) {
    if (this.enabled) {
      console.info('[INFO]', ...args);
    }
  }
}

export const logger = new Logger();

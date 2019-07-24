import env from './environment';
import { frontendlogger } from './frontend-logger';
import { APP_NAME } from './constants';

export const log = (...args: any[]): void => {
    if (env.isDevelopment) {
        console.log(...args);
    }
};

export const warn = (...args: any[]): void => {
    if (env.isDevelopment) {
        console.warn(...args);
    }
};

export const info = (...args: any[]): void => {
    if (env.isDevelopment) {
        console.info(...args);
    }
};

export const error = (...args: any[]): void => {
    if (env.isDevelopment) {
        console.error(...args);
    } else if (env.isProduction) {
        frontendlogger.logEvent(`${APP_NAME}.error`, { error: JSON.stringify(args) });
    }
};


export const logger = {
    log,
    error,
    warn,
    info,
};

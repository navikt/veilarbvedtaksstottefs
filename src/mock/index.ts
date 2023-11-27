import { setupWorker } from 'msw/browser';
import { allHandlers } from './api';

export const DEFAULT_DELAY_MILLISECONDS: number = 100;
export const worker = setupWorker(...allHandlers);

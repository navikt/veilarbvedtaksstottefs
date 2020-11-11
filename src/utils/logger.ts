import env from './environment';
import {
	createFrontendLogger,
	createMockFrontendLogger,
	DEFAULT_FRONTENDLOGGER_API_URL
} from '@navikt/frontendlogger/lib';
import { APP_NAME } from './constants';

export const logger = env.isDevelopment
	? createMockFrontendLogger(APP_NAME)
	: createFrontendLogger(DEFAULT_FRONTENDLOGGER_API_URL, APP_NAME);

export const logError = (fields?: {}, tags?: {}): void => {
	logger.event(`${APP_NAME}.error`, fields, tags);
};

export const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
	logger.event(`${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags);
};

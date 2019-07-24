import { APP_NAME } from './constants';
import { logger } from './logger';

const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    const frontendlogger = (window as any).frontendlogger;

    if (frontendlogger && frontendlogger.event) {
        frontendlogger.event(logTag, fields ? fields : {}, tags ? tags : {});
    } else {
        logger.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
    }
};

const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
    logEvent(`${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags);
};

export const frontendlogger = {
    logEvent,
    logMetrikk
};

import { APP_NAME } from './constants';
import { sendEventTilVeilarbvedtaksstotte } from '../api/veilarbvedtaksstotte/utkast';
import env from './environment';

export interface FrontendEvent {
	name: string;
	fields?: object;
	tags?: object;
}

export const logMetrikk = (metrikkNavn: string, fields?: object, tags?: object): void => {
	if (env.isDemo) {
		// eslint-disable-next-line no-console
		console.log('Event', metrikkNavn, 'Fields:', fields, 'Tags:', tags);
	} else {
		sendEventTilVeilarbvedtaksstotte({ name: `${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags });
	}
};

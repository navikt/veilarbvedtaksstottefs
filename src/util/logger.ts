import { APP_NAME } from './constants';
import { sendEventTilVeilarbvedtaksstotte } from '../api/veilarbvedtaksstotte/utkast';

export interface FrontendEvent {
	name: string;
	fields?: {};
	tags?: {};
}

export const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
	if (process.env.REACT_APP_DEV === 'true') {
		// tslint:disable-next-line:no-console
		console.log('Event', name, 'Fields:', fields, 'Tags:', tags);
	} else {
		sendEventTilVeilarbvedtaksstotte({ name: `${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags });
	}
};

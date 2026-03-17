import { RequestHandler } from 'msw';
import { utkastHandlers } from './utkast';
import { beslutterHandlers } from './beslutter';
import { meldingerHandlers } from './meldinger';
import { vedtakHandlers } from './vedtak';
import { klagebehandlingHandlers } from './klagebehandling';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
	...beslutterHandlers,
	...klagebehandlingHandlers,
	...meldingerHandlers,
	...utkastHandlers,
	...vedtakHandlers
];

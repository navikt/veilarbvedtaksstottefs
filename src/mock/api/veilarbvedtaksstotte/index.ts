import { RequestHandler } from 'msw';
import { utkastHandlers } from './utkast';
import { beslutterHandlers } from './beslutter';
import { meldingerHandlers } from './meldinger';
import { vedtakHandlers } from './vedtak';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
	...beslutterHandlers,
	...meldingerHandlers,
	...utkastHandlers,
	...vedtakHandlers
];

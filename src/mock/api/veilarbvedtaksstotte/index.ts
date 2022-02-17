import { RequestHandler } from 'msw';
import { utkastHandlers } from './utkast';
import { beslutterHandlers } from './beslutter';
import { meldingerHandlers } from './meldinger';
import { vedtakHandlers } from './vedtak';
import { utrullingHandlers } from './utrulling';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
	...beslutterHandlers,
	...meldingerHandlers,
	...utkastHandlers,
	...vedtakHandlers,
	...utrullingHandlers
];

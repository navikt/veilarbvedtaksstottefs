import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { utkastHandlers } from './utkast';
import { beslutterHandlers } from './beslutter';
import { meldingerHandlers } from './meldinger';
import { vedtakHandlers } from './vedtak';

export const veilarbvedtaksstotteHandlers: RequestHandlersList = [
	...beslutterHandlers,
	...meldingerHandlers,
	...utkastHandlers,
	...vedtakHandlers
];

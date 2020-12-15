import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbpersonflatefsHandlers } from './veilarbpersonflatefs';
import { veilarbveilederHandlers } from './veilarbveileder';
import { frontendloggerHandlers } from './frontendlogger';

export const allHandlers: RequestHandlersList = [
	...veilarbvedtaksstotteHandlers,
	...frontendloggerHandlers,
	...veilarboppfolgingHandlers,
	...veilarbpersonHandlers,
	...veilarbpersonflatefsHandlers,
	...veilarbveilederHandlers
];

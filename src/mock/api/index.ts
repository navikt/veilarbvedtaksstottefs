import { RequestHandler } from 'msw';
import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbpersonflatefsHandlers } from './veilarbpersonflatefs';
import { veilarbveilederHandlers } from './veilarbveileder';

export const allHandlers: RequestHandler[] = [
	...veilarbvedtaksstotteHandlers,
	...veilarboppfolgingHandlers,
	...veilarbpersonHandlers,
	...veilarbpersonflatefsHandlers,
	...veilarbveilederHandlers
];

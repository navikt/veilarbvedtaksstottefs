import { RequestHandler } from 'msw';
import { oboUnleashHandlers } from './obo-unleash';
import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbveilederHandlers } from './veilarbveileder';

export const allHandlers: RequestHandler[] = [
	...oboUnleashHandlers,
	...veilarbvedtaksstotteHandlers,
	...veilarboppfolgingHandlers,
	...veilarbpersonHandlers,
	...veilarbveilederHandlers
];

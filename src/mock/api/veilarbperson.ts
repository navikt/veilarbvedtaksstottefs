import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { hentMalform, hentMalformV2 } from '../api-data';

export const veilarbpersonHandlers: RequestHandlersList = [
	rest.get('/veilarbperson/api/person/:fnr/malform', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMalform()));
	})
];

export const veilarbpersonHandlersV2: RequestHandlersList = [
	rest.get('/veilarbperson/api/v2/person/:fnr/malformV2', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMalformV2()));
	})
];

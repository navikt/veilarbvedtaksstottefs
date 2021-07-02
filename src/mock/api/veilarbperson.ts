import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { hentMalformFraTps, hentMalformFraPdl } from '../api-data';

export const veilarbpersonHandlers: RequestHandlersList = [
	rest.get('/veilarbperson/api/person/*/malform', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMalformFraTps()));
	}),
	rest.get('/veilarbperson/api/v2/person/malform', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMalformFraPdl()));
	})
];

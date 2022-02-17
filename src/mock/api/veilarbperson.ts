import { RequestHandler, rest } from 'msw';
import { hentMalformFraPdl } from '../api-data';

export const veilarbpersonHandlers: RequestHandler[] = [
	rest.get('/veilarbperson/api/v2/person/malform', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMalformFraPdl()));
	})
];

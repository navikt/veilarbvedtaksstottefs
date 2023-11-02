import { RequestHandler, rest } from 'msw';
import { hentMalformFraPdl } from '../api-data';

export const veilarbpersonHandlers: RequestHandler[] = [
	rest.post('/veilarbperson/api/v3/person/hent-malform', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMalformFraPdl()));
	})
];

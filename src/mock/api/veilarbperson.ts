import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { hentMalform, hentMalformV2 } from '../api-data';

export const veilarbpersonHandlers: RequestHandlersList = [
	rest.get('/veilarbperson/api/person/malform?fnr=${fnr}', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMalform()));
	}),
	rest.get('/veilarbperson/api/v2/person/malform?fnr=${fnr}', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMalformV2()));
	})
];

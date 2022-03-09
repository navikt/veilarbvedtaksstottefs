import { RequestHandler, rest } from 'msw';
import { hentInnloggetVeileder } from '../api-data';

export const veilarbveilederHandlers: RequestHandler[] = [
	rest.get('/veilarbveileder/api/veileder/me', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentInnloggetVeileder()));
	})
];

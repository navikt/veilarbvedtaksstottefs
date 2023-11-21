import { RequestHandler, rest } from 'msw';
import { hentFeatures } from '../api-data';

export const veilarbpersonflatefsHandlers: RequestHandler[] = [
	rest.get('/obo-unleash/api/feature', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentFeatures()));
	})
];

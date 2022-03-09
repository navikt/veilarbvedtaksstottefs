import { RequestHandler, rest } from 'msw';

import { hentOppfolgingData, hentTilgangTilBrukersKontor } from '../api-data';

export const veilarboppfolgingHandlers: RequestHandler[] = [
	rest.get('/veilarboppfolging/api/oppfolging/veilederTilgang', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentTilgangTilBrukersKontor()));
	}),
	rest.get('/veilarboppfolging/api/oppfolging', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentOppfolgingData()));
	})
];

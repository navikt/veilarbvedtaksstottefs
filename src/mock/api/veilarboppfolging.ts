import { RequestHandler, rest } from 'msw';

import { hentOppfolgingData, hentTilgangTilBrukersKontor } from '../api-data';

export const veilarboppfolgingHandlers: RequestHandler[] = [
	rest.post('/veilarboppfolging/api/v3/oppfolging/hent-veilederTilgang', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentTilgangTilBrukersKontor()));
	}),
	rest.post('/veilarboppfolging/api/v3/oppfolging/hent-status', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentOppfolgingData()));
	})
];

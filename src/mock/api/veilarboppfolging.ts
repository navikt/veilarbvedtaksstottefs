import { delay, http, HttpResponse, RequestHandler } from 'msw';

import { hentOppfolgingData, hentTilgangTilBrukersKontor } from '../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../index';

export const veilarboppfolgingHandlers: RequestHandler[] = [
	http.post('/veilarboppfolging/api/v3/oppfolging/hent-veilederTilgang', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentTilgangTilBrukersKontor());
	}),
	http.post('/veilarboppfolging/api/v3/oppfolging/hent-status', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentOppfolgingData());
	})
];

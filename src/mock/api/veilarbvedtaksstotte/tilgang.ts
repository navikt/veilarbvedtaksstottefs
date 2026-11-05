import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { hentTilgangTilBrukersKontor } from '../../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../../index';

export const tilgangHandlers: RequestHandler[] = [
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/v1/tilgang/hent-tilgang`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentTilgangTilBrukersKontor());
	})
];

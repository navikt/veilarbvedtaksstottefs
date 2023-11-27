import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { hentMalformFraPdl } from '../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../index';

export const veilarbpersonHandlers: RequestHandler[] = [
	http.post('/veilarbperson/api/v3/person/hent-malform', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentMalformFraPdl());
	})
];

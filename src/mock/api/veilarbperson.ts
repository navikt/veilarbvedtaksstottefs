import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { hentAktivArbeidssokerperiode, hentMalformFraPdl, hentNavn } from '../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../index';

export const veilarbpersonHandlers: RequestHandler[] = [
	http.post('/veilarbperson/api/v3/person/hent-malform', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentMalformFraPdl());
	}),
	http.post('/veilarbperson/api/v3/person/hent-siste-aktiv-arbeidssoekerperiode', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentAktivArbeidssokerperiode());
	}),
	http.post('/veilarbperson/api/v3/person/hent-navn', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentNavn());
	})
];

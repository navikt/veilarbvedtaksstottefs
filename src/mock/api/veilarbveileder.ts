import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { hentInnloggetVeileder } from '../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../index';

export const veilarbveilederHandlers: RequestHandler[] = [
	http.get('/veilarbveileder/api/veileder/me', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentInnloggetVeileder());
	})
];

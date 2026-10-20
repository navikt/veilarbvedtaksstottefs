import { RequestHandler } from 'msw';
import { http, HttpResponse } from 'msw/http';
import { delay } from 'msw/utils/delay';
import { hentInnloggetVeileder } from '../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../index';

export const veilarbveilederHandlers: RequestHandler[] = [
	http.get('/veilarbveileder/api/veileder/me', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentInnloggetVeileder());
	})
];

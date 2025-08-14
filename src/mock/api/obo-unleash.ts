import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { hentFeatures } from '../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../index';

export const oboUnleashHandlers: RequestHandler[] = [
	http.get('/obo-unleash/api/feature', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentFeatures());
	})
];

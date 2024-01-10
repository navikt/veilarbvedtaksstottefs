import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { DEFAULT_DELAY_MILLISECONDS } from '../../index';

export const utrullingHandlers: RequestHandler[] = [
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/utrulling/hent-tilhorerBrukerUtrulletKontor`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(true);
	})
];

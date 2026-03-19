import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from '../../index';

export const klagebehandlingHandlers: RequestHandler[] = [
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/opprett-klage`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/formkrav`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/fullfor-avvisning`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/avvis`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	})
];

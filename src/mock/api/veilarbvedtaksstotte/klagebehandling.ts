import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { RequestHandler } from 'msw';
import { http, HttpResponse } from 'msw/http';
import { delay } from 'msw/utils/delay';
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

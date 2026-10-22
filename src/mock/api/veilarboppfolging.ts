import { RequestHandler } from 'msw';
import { http, HttpResponse } from 'msw/http';
import { delay } from 'msw/utils/delay';

import { hentOppfolgingData } from '../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../index';

export const veilarboppfolgingHandlers: RequestHandler[] = [
	http.post('/veilarboppfolging/api/graphql', async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		const { reservasjonKRR, underOppfolging } = hentOppfolgingData();
		return HttpResponse.json({
			data: {
				brukerStatus: {
					krr: { reservertIKrr: reservasjonKRR }
				},
				oppfolging: { erUnderOppfolging: underOppfolging }
			}
		});
	})
];

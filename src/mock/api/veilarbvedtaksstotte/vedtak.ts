import { bypass, delay, http, HttpResponse, RequestHandler } from 'msw';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { lagVedtakBrevMockUrl, mockUrlPrefix } from '../../utils';
import { hentArenaVedtak, hentFattedeVedtak, hentOyeblikksbilder } from '../../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../../index';

export const vedtakHandlers: RequestHandler[] = [
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/vedtak/hent-fattet`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentFattedeVedtak());
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/vedtak/hent-arena`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentArenaVedtak());
	}),
	http.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/:vedtakId/oyeblikksbilde`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentOyeblikksbilder());
	}),
	http.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/arena/pdf`, async () => {
		const arenaVedtakBrevMockUrl = `${mockUrlPrefix()}/test-brev/arenabrev.pdf`;
		const arenaVedtakBrevRespons = await fetch(arenaVedtakBrevMockUrl);
		const arenaVedtakBrevBlob = await arenaVedtakBrevRespons.blob();

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(arenaVedtakBrevBlob);
	}),
	http.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/:vedtakId/pdf`, async ({ params }) => {
		const vedtakId = parseInt(params.vedtakId.toString(), 10);

		const vedtak = hentFattedeVedtak().find(v => v.id === vedtakId);

		if (!vedtak?.innsatsgruppe) {
			throw new Error('Mangler innsatsgruppe for brev mock');
		}

		const vedtakBrevMockUrl = lagVedtakBrevMockUrl(vedtak.innsatsgruppe, vedtak.hovedmal);
		const vedtakBrevResponse = await fetch(bypass(vedtakBrevMockUrl));
		const vedtakBrevBlob = await vedtakBrevResponse.blob();

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(vedtakBrevBlob);
	})
];

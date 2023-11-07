import { RequestHandler, rest } from 'msw';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { lagVedtakBrevMockUrl, mockUrlPrefix } from '../../utils';
import { hentArenaVedtak, hentFattedeVedtak, hentOyeblikksbilder } from '../../api-data';

export const vedtakHandlers: RequestHandler[] = [
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/vedtak/hent-fattet`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentFattedeVedtak()));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/vedtak/hent-arena`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentArenaVedtak()));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/:vedtakId/oyeblikksbilde`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentOyeblikksbilder()));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/:vedtakId/pdf`, async (req, res, ctx) => {
		const vedtakId = parseInt(req.params.vedtakId.toString(), 10);

		const vedtak = hentFattedeVedtak().find(v => v.id === vedtakId);

		if (!vedtak?.innsatsgruppe) {
			throw new Error('Mangler innsatsgruppe for brev mock');
		}

		const brevBlob = await (
			ctx.fetch(lagVedtakBrevMockUrl(vedtak.innsatsgruppe, vedtak.hovedmal)) as Promise<Response>
		).then(brevRes => brevRes.blob());

		return res(ctx.delay(500), ctx.body(brevBlob));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/arena/pdf`, async (req, res, ctx) => {
		const brevBlob = await (ctx.fetch(`${mockUrlPrefix()}/test-brev/arenabrev.pdf`) as Promise<Response>).then(
			brevRes => brevRes.blob()
		);

		return res(ctx.delay(500), ctx.body(brevBlob));
	})
];

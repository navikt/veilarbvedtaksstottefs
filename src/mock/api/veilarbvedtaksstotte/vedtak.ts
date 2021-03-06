import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { rest } from 'msw';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { lagVedtakBrevMockUrl, mockUrlPrefix } from '../../utils';
import { hentArenaVedtak, hentFattedeVedtak, hentOyeblikksbilder } from '../../api-data';

export const vedtakHandlers: RequestHandlersList = [
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/fattet`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentFattedeVedtak()));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/arena`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentArenaVedtak()));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/:vedtakId/oyeblikksbilde`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentOyeblikksbilder()));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/:vedtakId/pdf`, async (req, res, ctx) => {
		const vedtakId = parseInt(req.params.vedtakId, 10);

		const vedtak = hentFattedeVedtak().find(v => v.id === vedtakId);

		if (!vedtak?.innsatsgruppe) {
			throw new Error('Mangler innsatsgruppe for brev mock');
		}

		const brevBlob = await (ctx.fetch(
			lagVedtakBrevMockUrl(vedtak.innsatsgruppe, vedtak.hovedmal)
		) as Promise<Response>).then(brevRes => brevRes.blob());

		return res(ctx.delay(500), ctx.body(brevBlob));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/arena/pdf`, async (req, res, ctx) => {
		const brevBlob = await (ctx.fetch(
			`${mockUrlPrefix()}/test-brev/arenabrev.pdf`
		) as Promise<Response>).then(brevRes => brevRes.blob());

		return res(ctx.delay(500), ctx.body(brevBlob));
	})
];

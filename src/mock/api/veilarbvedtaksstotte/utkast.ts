import { enhetId, enhetNavn } from '../../data';
import { Utkast, Vedtak, VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { SkjemaData } from '../../../util/skjema-utils';
import { RequestHandler, rest } from 'msw';
import { lagVedtakBrevMockUrl } from '../../utils';
import {
	byttUtUtkast,
	fjernAlleMockMeldinger,
	hentFattedeVedtak,
	hentInnloggetVeileder,
	hentUtkast,
	leggTilFattetVedtak,
	leggTilMockSystemMelding,
	oppdaterUtkast,
	oppdaterVedtakUtkastMockFraSkjema
} from '../../api-data';

export const utkastHandlers: RequestHandler[] = [
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/hent-utkast`, (req, res, ctx) => {
		if (!hentUtkast()) {
			return res(ctx.delay(500), ctx.status(404));
		}

		return res(ctx.delay(500), ctx.json(hentUtkast()));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast`, (req, res, ctx) => {
		const nyId =
			hentFattedeVedtak().length > 0 ? hentFattedeVedtak().sort((fv1, fv2) => fv2.id - fv1.id)[0].id + 1 : 1;

		const nyttUtkast = {
			id: nyId,
			utkastSistOppdatert: '2019-05-07T10:22:32.98982+02:00',
			opplysninger: [],
			veilederNavn: hentInnloggetVeileder().navn,
			veilederIdent: hentInnloggetVeileder().ident,
			oppfolgingsenhetId: enhetId,
			oppfolgingsenhetNavn: enhetNavn,
			beslutterNavn: null,
			sendtTilBeslutter: false,
			beslutterIdent: null
		} as unknown as Utkast;

		byttUtUtkast(nyttUtkast);

		fjernAlleMockMeldinger();

		leggTilMockSystemMelding(SystemMeldingType.UTKAST_OPPRETTET);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.put(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`, (req, res, ctx) => {
		const skjemaData = req.body as SkjemaData;
		oppdaterVedtakUtkastMockFraSkjema(skjemaData);
		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.delete(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`, (req, res, ctx) => {
		byttUtUtkast(null);
		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/overta`, (req, res, ctx) => {
		oppdaterUtkast({
			veilederIdent: hentInnloggetVeileder().ident,
			veilederNavn: hentInnloggetVeileder().navn
		});

		leggTilMockSystemMelding(SystemMeldingType.TATT_OVER_SOM_VEILEDER);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/beslutterprosessStatus`, (req, res, ctx) => {
		const data = { status: hentUtkast()?.beslutterProsessStatus || null };
		return res(ctx.delay(500), ctx.json(data));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/fattVedtak`, (req, res, ctx) => {
		const gjeldendeVedtak = hentFattedeVedtak().find(v => v.gjeldende);

		if (gjeldendeVedtak) {
			gjeldendeVedtak.gjeldende = false;
		}

		if (!hentUtkast()) throw new Error('Fant ikke utkast til kvalitetssikrer');

		const fattetVedtak = { ...hentUtkast() } as Vedtak;

		fattetVedtak.gjeldende = true;

		leggTilFattetVedtak(fattetVedtak);
		byttUtUtkast(null);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/pdf`, async (req, res, ctx) => {
		if (!hentUtkast()?.innsatsgruppe) {
			throw new Error('Mangler innsatsgruppe for brev mock');
		}

		const brevMockUrl = lagVedtakBrevMockUrl(hentUtkast()!.innsatsgruppe!, hentUtkast()?.hovedmal);

		const brevBlob = await (ctx.fetch(brevMockUrl) as Promise<Response>).then(brevRes => brevRes.blob());

		return res(ctx.delay(500), ctx.body(brevBlob));
	})
];

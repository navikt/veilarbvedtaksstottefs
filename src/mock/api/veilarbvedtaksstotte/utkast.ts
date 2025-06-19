import { enhetId, enhetNavn } from '../../data';
import { Utkast, Vedtak, VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { SkjemaData } from '../../../util/skjema-utils';
import { bypass, delay, http, HttpResponse, RequestHandler } from 'msw';
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
import { DEFAULT_DELAY_MILLISECONDS } from '../../index';

export const utkastHandlers: RequestHandler[] = [
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/hent-utkast`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);

		if (!hentUtkast()) {
			return new HttpResponse(null, { status: 204 });
		}

		return HttpResponse.json(hentUtkast());
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast`, async () => {
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

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.put(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`, async ({ request }) => {
		const skjemaData = (await request.json()) as SkjemaData;
		oppdaterVedtakUtkastMockFraSkjema(skjemaData);

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.delete(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`, async () => {
		byttUtUtkast(null);
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/overta`, async () => {
		oppdaterUtkast({
			veilederIdent: hentInnloggetVeileder().ident,
			veilederNavn: hentInnloggetVeileder().navn
		});

		leggTilMockSystemMelding(SystemMeldingType.TATT_OVER_SOM_VEILEDER);

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/beslutterprosessStatus`, async () => {
		const data = { status: hentUtkast()?.beslutterProsessStatus || null };

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(data);
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/fattVedtak`, async () => {
		const gjeldendeVedtak = hentFattedeVedtak().find(v => v.gjeldende);

		if (gjeldendeVedtak) {
			gjeldendeVedtak.gjeldende = false;
		}

		if (!hentUtkast()) throw new Error('Fant ikke utkast til kvalitetssikrer');

		const fattetVedtak = { ...hentUtkast() } as Vedtak;

		fattetVedtak.gjeldende = true;

		leggTilFattetVedtak(fattetVedtak);
		byttUtUtkast(null);

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/pdf`, async () => {
		if (!hentUtkast()?.innsatsgruppe) {
			throw new Error('Mangler innsatsgruppe for brev mock');
		}

		const brevMockUrl = lagVedtakBrevMockUrl(hentUtkast()!.innsatsgruppe!, hentUtkast()?.hovedmal);
		const brevBlob = await fetch(bypass(brevMockUrl)).then(brevRes => brevRes.blob());

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(brevBlob, { status: 200 });
	})
];

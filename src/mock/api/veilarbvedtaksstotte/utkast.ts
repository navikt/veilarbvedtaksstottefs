import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { enhetId, enhetNavn, veileder1 } from '../../data';
import {
	HovedmalType,
	InnsatsgruppeType,
	Vedtak,
	VedtakStatus,
	VEILARBVEDTAKSSTOTTE_API
} from '../../../api/veilarbvedtaksstotte';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { SkjemaData } from '../../../util/skjema-utils';
import env from '../../../util/environment';
import { rest } from 'msw';
import { fjernAlleMockMeldinger, leggTilMockSystemMelding } from './meldinger';
import { innloggetVeilederMock } from '../veilarbveileder';
import { fattedeVedtakMock } from './vedtak';
import { lagVedtakBrevMockUrl } from '../../utils';

const utkast: Vedtak = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS,
	vedtakStatus: VedtakStatus.UTKAST,
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: veileder1.navn,
	veilederIdent: veileder1.ident,
	oppfolgingsenhetId: enhetId,
	oppfolgingsenhetNavn: enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	dokumentInfoId: null,
	journalpostId: null,
	beslutterIdent: null,
	beslutterNavn: null,
	beslutterProsessStatus: null
};

export let vedtakUtkastMock: Vedtak | null = env.isRunningOnGhPages ? null : utkast;

export const oppdaterVedtakUtkastMockFraSkjema = (skjemaData: SkjemaData) => {
	if (vedtakUtkastMock) {
		vedtakUtkastMock.begrunnelse = skjemaData.begrunnelse;
		vedtakUtkastMock.hovedmal = skjemaData.hovedmal;
		vedtakUtkastMock.innsatsgruppe = skjemaData.innsatsgruppe;
		vedtakUtkastMock.opplysninger = skjemaData.opplysninger ? skjemaData.opplysninger : [];
	}
};

export const utkastHandlers: RequestHandlersList = [
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast`, (req, res, ctx) => {
		if (!vedtakUtkastMock) {
			return res(ctx.delay(500), ctx.status(404));
		}

		return res(ctx.delay(500), ctx.json(vedtakUtkastMock));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast`, (req, res, ctx) => {
		const nyId = fattedeVedtakMock.length > 0 ? fattedeVedtakMock.sort((fv1, fv2) => fv2.id - fv1.id)[0].id + 1 : 1;

		const nyttUtkast = ({
			id: nyId,
			vedtakStatus: 'UTKAST',
			sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
			gjeldende: false,
			opplysninger: [],
			veilederNavn: innloggetVeilederMock.navn,
			veilederIdent: innloggetVeilederMock.ident,
			oppfolgingsenhetId: enhetId,
			oppfolgingsenhetNavn: enhetNavn,
			beslutterNavn: null,
			dokumentInfoId: null,
			journalpostId: null,
			sendtTilBeslutter: false,
			beslutterIdent: null
		} as unknown) as Vedtak;

		vedtakUtkastMock = nyttUtkast as Vedtak;

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
		vedtakUtkastMock = null;
		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/overta`, (req, res, ctx) => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å overta');

		vedtakUtkastMock.veilederIdent = innloggetVeilederMock.ident;
		vedtakUtkastMock.veilederNavn = innloggetVeilederMock.navn;

		leggTilMockSystemMelding(SystemMeldingType.TATT_OVER_SOM_VEILEDER);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/beslutterprosessStatus`, (req, res, ctx) => {
		const data = { status: vedtakUtkastMock ? vedtakUtkastMock.beslutterProsessStatus : null };
		return res(ctx.delay(500), ctx.json(data));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/fattVedtak`, (req, res, ctx) => {
		const gjeldendeVedtak = fattedeVedtakMock.find(v => v.gjeldende);

		if (gjeldendeVedtak) {
			gjeldendeVedtak.gjeldende = false;
		}

		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast til beslutter');

		const fattetVedtak = { ...vedtakUtkastMock };

		fattetVedtak.vedtakStatus = VedtakStatus.SENDT;
		fattetVedtak.gjeldende = true;
		fattetVedtak.dokumentInfoId = '123';
		fattetVedtak.journalpostId = '456';

		fattedeVedtakMock.push(fattetVedtak);
		vedtakUtkastMock = null;

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/pdf`, async (req, res, ctx) => {
		if (!vedtakUtkastMock?.innsatsgruppe) {
			throw new Error('Mangler innsatsgruppe for brev mock');
		}

		const brevMockUrl = lagVedtakBrevMockUrl(vedtakUtkastMock!.innsatsgruppe!, vedtakUtkastMock?.hovedmal);

		const brevBlob = await (ctx.fetch(brevMockUrl) as Promise<Response>).then(brevRes => brevRes.blob());

		return res(ctx.delay(500), ctx.body(brevBlob));
	})
];

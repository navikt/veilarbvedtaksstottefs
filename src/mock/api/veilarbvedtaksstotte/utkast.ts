import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { Mock } from '../../utils';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/api';
import { MockRequest, ResponseData } from 'yet-another-fetch-mock';
import { enhetId, enhetNavn } from '../../data';
import { Vedtak } from '../../../api/veilarbvedtaksstotte';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { SkjemaData } from '../../../util/skjema-utils';
import { vedtakUtkastMock } from '../../vedtak-mock';
import env from '../../../util/environment';
import utkast from '../../api-data/vedtak/utkast';

export let vedtakUtkastMock: Vedtak | null = env.isRunningOnGhPages ? null : utkast;

export const mockHentUtkast: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast`,
	handler: async (): Promise<ResponseData> => {
		if (vedtakUtkastMock) {
			return { body: JSON.stringify(vedtakUtkastMock) };
		}
		return { status: 404 };
	}
};

export const mockLagUtkast: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast`,
	handler: async (): Promise<ResponseData> => {
		const nyId = fattedeVedtak.length > 0 ? fattedeVedtak.sort((fv1, fv2) => fv2.id - fv1.id)[0].id + 1 : 1;

		const nyttUtkast = ({
			id: nyId,
			vedtakStatus: 'UTKAST',
			sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
			gjeldende: false,
			opplysninger: [],
			veilederNavn: innloggetVeileder.navn,
			veilederIdent: innloggetVeileder.ident,
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

		return { status: 204 };
	}
};

export const mockOppdaterUtkast: Mock = {
	method: 'PUT',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`,
	handler: async (args: MockRequest): Promise<ResponseData> => {
		const skjemaData: SkjemaData = args.body;
		oppdaterVedtakUtkastMockFraSkjema(skjemaData);
		return { status: 204 };
	}
};

export const oppdaterVedtakUtkastMockFraSkjema = (skjemaData: SkjemaData) => {
	if (vedtakUtkastMock) {
		vedtakUtkastMock.begrunnelse = skjemaData.begrunnelse;
		vedtakUtkastMock.hovedmal = skjemaData.hovedmal;
		vedtakUtkastMock.innsatsgruppe = skjemaData.innsatsgruppe;
		vedtakUtkastMock.opplysninger = skjemaData.opplysninger ? skjemaData.opplysninger : [];
	}
};

export const mockSlettUtkast: Mock = {
	method: 'DELETE',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`,
	handler: async (): Promise<ResponseData> => {
		vedtakUtkastMock = null;
		return { status: 204 };
	}
};

export const mockOvertaUtkast: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/overta`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å overta');

		vedtakUtkastMock.veilederIdent = innloggetVeileder.ident;
		vedtakUtkastMock.veilederNavn = innloggetVeileder.navn;

		leggTilMockSystemMelding(SystemMeldingType.TATT_OVER_SOM_VEILEDER);

		return { status: 204 };
	}
};

export const mockErUtkastGodkjent: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/beslutterprosessStatus`,
	handler: async (): Promise<ResponseData> => {
		const data = { status: vedtakUtkastMock ? vedtakUtkastMock.beslutterProsessStatus : null };
		return { status: 200, body: JSON.stringify(data) };
	}
};

export const veilarbvedtaksstotteUtkastHandlers: RequestHandlersList = [];

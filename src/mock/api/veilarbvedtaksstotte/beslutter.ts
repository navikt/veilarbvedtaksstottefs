import { Mock } from '../../utils';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/api';
import { ResponseData } from 'yet-another-fetch-mock';
import { BeslutterProsessStatus } from '../../../api/veilarbvedtaksstotte';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { vedtakUtkastMock } from '../../vedtak-mock';

export const mockStartBeslutterprosess: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/start`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		vedtakUtkastMock.beslutterProsessStatus = BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);

		return { status: 200 };
	}
};

export const mockAvbrytBeslutterprosess: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/avbryt`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å avbrute beslutterprosess på');

		vedtakUtkastMock.beslutterProsessStatus = null;
		vedtakUtkastMock.beslutterIdent = null;
		vedtakUtkastMock.beslutterNavn = null;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT);

		return { status: 200 };
	}
};

export const mockBliBeslutter: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å bli beslutter for');

		vedtakUtkastMock.beslutterIdent = innloggetVeileder.ident;
		vedtakUtkastMock.beslutterNavn = innloggetVeileder.navn;

		leggTilMockSystemMelding(SystemMeldingType.BLITT_BESLUTTER);

		return { status: 204 };
	}
};

export const mockGodkjennVedtak: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/godkjenn`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å godkjenne');

		vedtakUtkastMock.beslutterProsessStatus = BeslutterProsessStatus.GODKJENT_AV_BESLUTTER;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_HAR_GODKJENT);

		return { status: 204 };
	}
};

export const mockOppdaterBeslutterProsessStatus: Mock = {
	method: 'PUT',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/status`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å oppdatere status på');

		const erBeslutter = vedtakUtkastMock.beslutterIdent === innloggetVeileder.ident;

		vedtakUtkastMock.beslutterProsessStatus = erBeslutter
			? BeslutterProsessStatus.KLAR_TIL_VEILEDER
			: BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

		leggTilMockSystemMelding(
			erBeslutter ? SystemMeldingType.SENDT_TIL_VEILEDER : SystemMeldingType.SENDT_TIL_BESLUTTER
		);

		return { status: 204 };
	}
};

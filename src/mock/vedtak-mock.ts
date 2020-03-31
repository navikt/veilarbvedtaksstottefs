import { HandlerArgument, ResponseData } from 'yet-another-fetch-mock';
import { BeslutterProsessStatus, Vedtak } from '../rest/data/vedtak';
import { Mock } from './mock-utils';
import utkast from './api-data/vedtak/utkast';
import { SkjemaData } from '../pages/utkast/utkast-side';
import { finnUtkast } from '../utils';
import historisk from './api-data/vedtak/tidligere-vedtak';
import { ansvarligVeileder, beslutter } from './personer';
import { innloggetVeileder } from './api-data/innlogget-veileder';
import { VEILARBVEDTAKSSTOTTE_API } from '../rest/api';

let vedtak: Vedtak[] = [
	utkast, ...historisk
];

export const mockHentVedtak: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/vedtak`,
	handler: async (): Promise<ResponseData> => {
		return { body: JSON.stringify(vedtak) };
	}
};

export const mockLagUtkast: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/utkast`,
	handler: async (): Promise<ResponseData> => {
		const nyttUtkast = {
			id: vedtak.length,
			vedtakStatus: 'UTKAST',
			sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
			gjeldende: false,
			opplysninger: [],
			veilederNavn: ansvarligVeileder.navn,
			veilederIdent: ansvarligVeileder.ident,
			oppfolgingsenhetId: ansvarligVeileder.enhetId,
			oppfolgingsenhetNavn: ansvarligVeileder.enhetNavn,
			beslutterNavn: null,
			dokumentInfoId: null,
			journalpostId: null,
			sendtTilBeslutter: false,
			beslutterIdent: null
		} as unknown as Vedtak;

		vedtak.push(nyttUtkast);


		return { status: 204 };
	}
};

export const mockOppdaterUtkast: Mock = {
	method: 'PUT',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/utkast`,
	handler: async (args: HandlerArgument): Promise<ResponseData> => {
		const skjemaData: SkjemaData = args.body;
		const gammeltUtkast = finnUtkast(vedtak);
		const oppdatertUtkast = Object.assign(gammeltUtkast, skjemaData);

		if (!gammeltUtkast) throw new Error('Fant ikke et utkast å oppdatere');

		vedtak = vedtak.filter(v => v.id !== gammeltUtkast.id);
		vedtak.push(oppdatertUtkast);

		return { status: 204 };
	}
};

export const mockSlettUtkast: Mock = {
	method: 'DELETE',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/utkast`,
	handler: async (): Promise<ResponseData> => {
		vedtak = vedtak.filter(v => v.vedtakStatus !== 'UTKAST');
		return { status: 204 };
	}
};

export const mockSendVedtak: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/vedtak/send`,
	handler: async (): Promise<ResponseData> => {
		const gjeldendeVedtak = vedtak.find(v => v.gjeldende);

		if (gjeldendeVedtak) {
			gjeldendeVedtak.gjeldende = false;
		}

		const utkastTilUtsending = finnUtkast(vedtak);

		if (!utkastTilUtsending) throw new Error('Fant ikke utkast til beslutter');

		utkastTilUtsending.vedtakStatus = 'SENDT';
		utkastTilUtsending.gjeldende = true;
		utkastTilUtsending.dokumentInfoId = '123';
		utkastTilUtsending.journalpostId = '456';

		return { status: 204 };
	}
};

export const mockOvertaUtkast: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/utkast/overta`,
	handler: async (): Promise<ResponseData> => {
		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å overta');

		gjeldendeUtkast.oppfolgingsenhetNavn = ansvarligVeileder.enhetNavn;
		gjeldendeUtkast.oppfolgingsenhetId = ansvarligVeileder.enhetId;

		return { status: 204 };
	}
};

export const mockKlarTilBeslutter: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/beslutter/start`,
	handler: async (): Promise<ResponseData> => {

		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		gjeldendeUtkast.beslutterProsessStartet = true;

		return { status: 200 };
	}
};

export const mockBliBeslutter: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/beslutter/bliBeslutter`,
	handler: async (): Promise<ResponseData> => {

		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å bli beslutter for');

		gjeldendeUtkast.beslutterIdent = innloggetVeileder.ident;
		gjeldendeUtkast.beslutterIdent = innloggetVeileder.navn;

		return { status: 204 };
	}
};

export const mockGodkjennVedtak: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/beslutter/godkjenn`,
	handler: async (): Promise<ResponseData> => {
		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å godkjenne');

		gjeldendeUtkast.godkjentAvBeslutter= true;

		return { status: 204 };
	}
};

export const mockOppdaterBeslutterProsessStatus: Mock = {
	method: 'PUT',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/beslutter/status`,
	handler: async (): Promise<ResponseData> => {
		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å oppdatere status på');

		const erBeslutter = gjeldendeUtkast.beslutterIdent === beslutter.ident;

		gjeldendeUtkast.beslutterProsessStatus = erBeslutter
			? BeslutterProsessStatus.KLAR_TIL_VEILEDER
			: BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

		return { status: 204 };
	}
};

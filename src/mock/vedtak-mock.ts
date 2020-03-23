import { HandlerArgument, ResponseData } from 'yet-another-fetch-mock';
import { Vedtak } from '../rest/data/vedtak';
import { Mock } from './mock-utils';
import utkast from './api-data/vedtak/utkast';
import innloggetVeileder from './api-data/innlogget-veileder';
import { ansvarligVeileder } from './personer';
import { SkjemaData } from '../pages/vedtakskjema/vedtakskjema-side';
import { finnUtkast } from '../utils';
import historisk from './api-data/vedtak/tidligere-vedtak';
import gjeldendeVedtak from "./api-data/vedtak/gjeldende-vedtak";

let vedtak: Vedtak[] = [
	utkast, ...historisk
];

export const mockHentVedtak: Mock = {
	method: 'GET',
	url: '/veilarbvedtaksstotte/api/:fnr/vedtak',
	handler: async (): Promise<ResponseData> => {
		return { body: JSON.stringify(vedtak) };
	}
};

export const mockLagUtkast: Mock = {
	method: 'POST',
	url: '/veilarbvedtaksstotte/api/:fnr/utkast',
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
	url: '/veilarbvedtaksstotte/api/:fnr/utkast',
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
	url: '/veilarbvedtaksstotte/api/:fnr/utkast',
	handler: async (): Promise<ResponseData> => {
		vedtak = vedtak.filter(v => v.vedtakStatus !== 'UTKAST');
		return { status: 204 };
	}
};

export const mockSendVedtak: Mock = {
	method: 'POST',
	url: '/veilarbvedtaksstotte/api/:fnr/vedtak/send',
	handler: async (args: HandlerArgument): Promise<ResponseData> => {
		const gjeldendeVedtak = vedtak.find(v => v.gjeldende);

		if (gjeldendeVedtak) {
			gjeldendeVedtak.gjeldende = false;
		}

		const sendVedtakData = args.body as { beslutterNavn: string };
		const utkastTilUtsending = finnUtkast(vedtak);

		if (!utkastTilUtsending) throw new Error('Fant ikke utkast til beslutter');

		utkastTilUtsending.vedtakStatus = 'SENDT';
		utkastTilUtsending.gjeldende = true;
		utkastTilUtsending.dokumentInfoId = '123';
		utkastTilUtsending.journalpostId = '456';
		utkastTilUtsending.beslutterNavn = sendVedtakData.beslutterNavn || utkastTilUtsending.beslutterNavn;

		return { status: 204 };
	}
};

export const mockOvertaUtkast: Mock = {
	method: 'POST',
	url: '/veilarbvedtaksstotte/api/:fnr/utkast/overta/:taOverFor',
	handler: async (): Promise<ResponseData> => {

		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å overta');

		if (gjeldendeUtkast.taOverFor === 'veileder') {
			gjeldendeUtkast.veilederNavn = innloggetVeileder.navn;
			gjeldendeUtkast.veilederIdent = innloggetVeileder.ident;
		}

		if (gjeldendeUtkast.taOverFor === 'beslutter') {
			gjeldendeUtkast.beslutterIdent = innloggetVeileder.ident;
			gjeldendeUtkast.beslutterNavn = innloggetVeileder.navn;
		}

		gjeldendeUtkast.oppfolgingsenhetNavn = ansvarligVeileder.enhetNavn;
		gjeldendeUtkast.oppfolgingsenhetId = ansvarligVeileder.enhetId;

		return { status: 204 };
	}
};

export const mockKlarTilBeslutter: Mock = {
	method: 'POST',
	url: '/veilarbvedtaksstotte/api/:fnr/beslutter/start',
	handler: async (): Promise<ResponseData> => {

		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		gjeldendeUtkast.beslutterProsessStartet = true;
		gjeldendeUtkast.beslutterIdent = null;
		innloggetVeileder.ident = 'Z150561';
		return { status: 200 };
	}
};

export const mockBliBeslutter: Mock = {
	method: 'POST',
	url: '/veilarbvedtaksstotte/api/:fnr/beslutter/bliBeslutter',
	handler: async (): Promise<ResponseData> => {

		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å overta');

		gjeldendeUtkast.beslutterIdent = innloggetVeileder.ident;
		gjeldendeUtkast.beslutterIdent = innloggetVeileder.navn;
		gjeldendeUtkast.beslutterProsessStartet = true;
		return { status: 204 };
	}
};

export const mockGodkjennVedtak: Mock = {
	method: 'POST',
	url: '/veilarbvedtaksstotte/api/:fnr/beslutter/godkjenn',
	handler: async (): Promise<ResponseData> => {

		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å overta');

		gjeldendeUtkast.godkjentAvBeslutter= true;
		return { status: 204 };
	}
};
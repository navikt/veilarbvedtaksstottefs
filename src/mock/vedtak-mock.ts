import { HandlerArgument, ResponseData } from 'yet-another-fetch-mock';
import { Vedtak } from '../rest/data/vedtak';
import { Mock } from './mock-utils';
import utkast from './api-data/vedtak/utkast';
import { innloggetVeileder } from './personer';
import { SkjemaData } from '../pages/utkast/utkast-side';
import { finnUtkast } from '../utils';
import historisk from './api-data/vedtak/tidligere-vedtak';

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
			veilederNavn: innloggetVeileder.navn,
			veilederIdent: innloggetVeileder.ident,
			oppfolgingsenhetId: innloggetVeileder.enhetId,
			oppfolgingsenhetNavn: innloggetVeileder.enhetNavn,
			beslutterNavn: null,
			dokumentInfoId: null,
			journalpostId: null,
			sendtTilBeslutter: false
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
	url: '/veilarbvedtaksstotte/api/:fnr/utkast/overta',
	handler: async (): Promise<ResponseData> => {

		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å overta');

		gjeldendeUtkast.veilederNavn = innloggetVeileder.navn;
		gjeldendeUtkast.veilederIdent = innloggetVeileder.ident;
		gjeldendeUtkast.oppfolgingsenhetNavn = innloggetVeileder.enhetNavn;
		gjeldendeUtkast.oppfolgingsenhetId = innloggetVeileder.enhetId;

		return { status: 204 };
	}
};

export const mockStartBeslutterProsess: Mock = {
	method: 'POST',
	url: '/veilarbvedtaksstotte/api/:fnr/beslutter/start',
	handler: async (): Promise<ResponseData> => {

		const gjeldendeUtkast = finnUtkast(vedtak);

		if (!gjeldendeUtkast) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		gjeldendeUtkast.beslutterProsessStartet = true;

		return { status: 200 };
	}
};

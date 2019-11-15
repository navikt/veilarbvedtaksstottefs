import { HandlerArgument, ResponseData } from 'yet-another-fetch-mock';
import { VedtakData } from '../rest/data/vedtak';
import { innloggetVeileder } from './api-data/innlogget-veileder';
import { Mock } from './mock-utils';
import utkast from './api-data/vedtak/utkast';
import historisk from './api-data/vedtak/tidligere-vedtak';
import { BeslutterOppgaveData } from '../components/modal/beslutter-oppgave-modal/beslutter-oppgave-modal-innhold';
import veiledere from './api-data/veiledere';
import { SkjemaData } from '../pages/vedtakskjema/vedtakskjema-side';
import { finnUtkast } from '../utils';

let vedtak: VedtakData[] = [
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
			veilederEnhetId: innloggetVeileder.enhetId,
			veilederEnhetNavn: innloggetVeileder.enhetNavn,
			beslutterNavn: null,
			dokumentInfoId: null,
			journalpostId: null,
			sendtTilBeslutter: false
		} as unknown as VedtakData;

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

export const mockSendTilBeslutter: Mock = {
	method: 'POST',
	url: '/veilarbvedtaksstotte/api/:fnr/beslutter/send',
	handler: async (args: HandlerArgument): Promise<ResponseData> => {
		const utkastTilBeslutter = finnUtkast(vedtak);

		if (!utkastTilBeslutter) throw new Error('Fant ikke utkast til beslutter');

		const beslutterData = args.body as BeslutterOppgaveData;
		const valgtBeslutter = veiledere.veilederListe
			.find(v => v.ident === beslutterData.beslutterIdent);

		utkastTilBeslutter.sendtTilBeslutter = true;
		utkastTilBeslutter.beslutterNavn = valgtBeslutter ? valgtBeslutter.navn : null;

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

		console.log('utkastTilUtsending', utkastTilUtsending); // tslint:disable-line

		utkastTilUtsending.vedtakStatus = 'SENDT';
		utkastTilUtsending.gjeldende = true;
		utkastTilUtsending.dokumentInfoId = '123';
		utkastTilUtsending.journalpostId = '456';

		return { status: 204 };
	}
};

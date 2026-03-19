import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { VEILARBVEDTAKSSTOTTE_API } from './index';

type JaNei = 'JA' | 'NEI';

export enum KlagefristUnntakSvar {
	JA_KLAGER_KAN_IKKE_LASTES = 'JA_KLAGER_KAN_IKKE_LASTES',
	JA_SAERLIGE_GRUNNER = 'JA_SAERLIGE_GRUNNER',
	NEI = 'NEI'
}

export interface KlagebehandlingFormkrav {
	klagefristOverholdt: boolean;
	klagefristOverstyres?: KlagefristUnntakSvar;
	klagerPartISaken: boolean;
	klagePaaKonkreteElementer: boolean;
	erKlagenSignert: boolean;
	avvisningsAarsak?: string;
}

export interface KlagebehandlingFormkravUtkast {
	klagefristOverholdt?: boolean;
	klagefristOverstyres?: KlagefristUnntakSvar;
	klagerPartISaken?: boolean;
	klagePaaKonkreteElementer?: boolean;
	erKlagenSignert?: boolean;
	avvisningsAarsak?: string;
}

interface KlagebehandlingFormkravRequest {
	vedtakId: number;
	signert: JaNei | null;
	part: JaNei | null;
	konkret: JaNei | null;
	klagefristOpprettholdt: JaNei | null;
	klagefristUnntak: KlagefristUnntakSvar | null;
	formkravBegrunnelseIntern: string | null;
	formkravBegrunnelseBrev: string | null;
}

interface FullforAvvisningRequest {
	journalpostId: string;
	vedtakId: number;
}

export interface Klagebehandling {
	vedtakId: number;
	fnr: string;
	veilederIdent: string;
	klagedato: Date;
	klageJournalpostid: string;
}

function boolskTilJaNei(verdi: boolean): JaNei {
	return verdi ? 'JA' : 'NEI';
}

function boolskTilJaNeiEllerNull(verdi: boolean | undefined): JaNei | null {
	if (verdi === undefined) {
		return null;
	}

	return boolskTilJaNei(verdi);
}

export function lagreKlagebehandling(klagebehandling: Klagebehandling): AxiosPromise<Response> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/opprett-klage`, klagebehandling);
}

export function lagreKlagebehandlingFormkrav(
	vedtakId: number,
	formkrav: KlagebehandlingFormkravUtkast
): AxiosPromise<Response> {
	const payload: KlagebehandlingFormkravRequest = {
		vedtakId,
		signert: boolskTilJaNeiEllerNull(formkrav.erKlagenSignert),
		part: boolskTilJaNeiEllerNull(formkrav.klagerPartISaken),
		konkret: boolskTilJaNeiEllerNull(formkrav.klagePaaKonkreteElementer),
		klagefristOpprettholdt: boolskTilJaNeiEllerNull(formkrav.klagefristOverholdt),
		klagefristUnntak: formkrav.klagefristOverholdt === true ? null : formkrav.klagefristOverstyres || null,
		formkravBegrunnelseIntern: formkrav.avvisningsAarsak?.trim() || null,
		formkravBegrunnelseBrev: null
	};

	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/formkrav`, payload);
}

export function avvisKlagebehandling(
	vedtakId: number,
	formkrav: KlagebehandlingFormkravUtkast
): AxiosPromise<Response> {
	const payload: KlagebehandlingFormkravRequest = {
		vedtakId,
		signert: boolskTilJaNeiEllerNull(formkrav.erKlagenSignert),
		part: boolskTilJaNeiEllerNull(formkrav.klagerPartISaken),
		konkret: boolskTilJaNeiEllerNull(formkrav.klagePaaKonkreteElementer),
		klagefristOpprettholdt: boolskTilJaNeiEllerNull(formkrav.klagefristOverholdt),
		klagefristUnntak: formkrav.klagefristOverholdt === true ? null : formkrav.klagefristOverstyres || null,
		formkravBegrunnelseIntern: formkrav.avvisningsAarsak?.trim() || null,
		formkravBegrunnelseBrev: null
	};

	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/avvis`, payload);
}

export function fullforAvvisningKlagebehandling(journalpostId: string, vedtakId: number): AxiosPromise<Response> {
	const payload: FullforAvvisningRequest = {
		journalpostId,
		vedtakId
	};

	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/fullfor-avvisning`, payload);
}

export function hentKlagebehandling(klagebehandling: Klagebehandling): AxiosPromise<Response> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/hent-klage`, klagebehandling);
}

import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { VEILARBVEDTAKSSTOTTE_API } from './index';

type JaNei = 'JA' | 'NEI';

export interface KlagebehandlingFormkrav {
	klagefristOverholdt: boolean;
	klagefristOverstyres?: boolean;
	klagerPartISaken: boolean;
	klagePaaKonkreteElementer: boolean;
	erKlagenSignert: boolean;
	avvisningsAarsak?: string;
}

interface KlagebehandlingFormkravRequest {
	vedtakId: number;
	signert: JaNei;
	part: JaNei;
	konkret: JaNei;
	klagefristOpprettholdt: JaNei;
	klagefristUnntak: JaNei | null;
	formkravBegrunnelseIntern: string | null;
	formkravBegrunnelseBrev: string | null;
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

export function lagreKlagebehandling(klagebehandling: Klagebehandling): AxiosPromise<Response> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/opprett-klage`, klagebehandling);
}

export function lagreKlagebehandlingFormkrav(
	vedtakId: number,
	formkrav: KlagebehandlingFormkrav
): AxiosPromise<Response> {
	const payload: KlagebehandlingFormkravRequest = {
		vedtakId,
		signert: boolskTilJaNei(formkrav.erKlagenSignert),
		part: boolskTilJaNei(formkrav.klagerPartISaken),
		konkret: boolskTilJaNei(formkrav.klagePaaKonkreteElementer),
		klagefristOpprettholdt: boolskTilJaNei(formkrav.klagefristOverholdt),
		klagefristUnntak:
			formkrav.klagefristOverholdt || formkrav.klagefristOverstyres === undefined
				? null
				: boolskTilJaNei(formkrav.klagefristOverstyres),
		formkravBegrunnelseIntern: formkrav.avvisningsAarsak?.trim() || null,
		formkravBegrunnelseBrev: null
	};

	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/formkrav`, payload);
}

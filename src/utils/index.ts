import { ArenaVedtak, ModiaVedtak } from '../rest/data/vedtak';
import { OrNothing } from './types/ornothing';

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export const finnGjeldendeArenaVedtak = (vedtakListe: OrNothing<ArenaVedtak[]>): ArenaVedtak | undefined => {
	return vedtakListe ? vedtakListe.find(v => v.erGjeldende) : undefined;
};

export const finnGjeldendeModiaVedtak = (vedtakListe: OrNothing<ModiaVedtak[]>): ModiaVedtak | undefined => {
	return vedtakListe ? vedtakListe.find(v => v.gjeldende) : undefined;
};

export const finnUtkastAlltid = (vedtakListe: ModiaVedtak[]): ModiaVedtak => {
	return finnUtkast(vedtakListe) as ModiaVedtak;
};

export const finnVedtakAlltid = (vedtakListe: ModiaVedtak[], vedtakId: number): ModiaVedtak => {
	return vedtakListe.find(v => v.id === vedtakId) as ModiaVedtak;
};

export const finnUtkast = (vedtakListe: ModiaVedtak[]): ModiaVedtak | undefined => {
	return vedtakListe.find(v => v.vedtakStatus === 'UTKAST');
};

/*
	Navn på vedtak fra Arena kommer på formatet 'Etternavn, Fornavn'.
	Dette skal være på formen 'Fornavn Etternavn'
*/
export const fiksVeilederNavn = (veilederNavn: string): string => {
	if (veilederNavn.includes(',')) {
		const navn = veilederNavn.split(',');
		return navn[1].trim() + ' ' + navn[0].trim();
	}

	return veilederNavn;
};

// If the checkboxes/radios does not swallow enter, then it will for some reason propagate to the first button and trigger onClick
export function swallowEnterKeyPress(e: any) {
	if (e.charCode === 13) {
		e.preventDefault();
	}
}
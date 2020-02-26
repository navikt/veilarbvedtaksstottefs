import { VedtakData } from '../rest/data/vedtak';

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export const finnUtkastAlltid = (vedtakListe: VedtakData[]): VedtakData => {
	return finnUtkast(vedtakListe) as VedtakData;
};

export const finnVedtakAlltid = (vedtakListe: VedtakData[], vedtakId: number): VedtakData => {
	return vedtakListe.find(v => v.id === vedtakId) as VedtakData;
};

export const finnUtkast = (vedtakListe: VedtakData[]): VedtakData | undefined => {
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
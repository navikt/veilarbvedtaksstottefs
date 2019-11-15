import { VedtakData } from '../rest/data/vedtak';

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export const finnUtkastAlltid = (vedtakListe: VedtakData[]): VedtakData => {
	return finnUtkast(vedtakListe) as VedtakData;
};

export const finnUtkast = (vedtakListe: VedtakData[]): VedtakData | undefined => {
	return vedtakListe.find(v => v.vedtakStatus === 'UTKAST');
};
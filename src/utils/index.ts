import { VedtakData } from '../rest/data/vedtak';

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export const finnUtkast = (vedtakListe: VedtakData[]): VedtakData => {
	return vedtakListe.find(v => v.vedtakStatus === 'UTKAST') as VedtakData;
};

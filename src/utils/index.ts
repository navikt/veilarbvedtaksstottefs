import { ModiaVedtak } from '../rest/data/vedtak';
import { OrNothing } from './types/ornothing';

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export const finnGjeldendeVedtak = (vedtakListe: OrNothing<ModiaVedtak[]>): ModiaVedtak | undefined => {
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

// If the checkboxes/radios does not swallow enter, then it will for some reason propagate to the first button and trigger onClick
export function swallowEnterKeyPress(e: any) {
	if (e.charCode === 13) {
		e.preventDefault();
	}
}
import { Vedtak } from '../rest/data/vedtak';
import { OrNothing } from './types/ornothing';

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export const finnGjeldendeVedtak = (vedtakListe: OrNothing<Vedtak[]>): Vedtak | undefined => {
	return vedtakListe ? vedtakListe.find(v => v.gjeldende) : undefined;
};

export const finnUtkastAlltid = (vedtakListe: Vedtak[]): Vedtak => {
	return finnUtkast(vedtakListe) as Vedtak;
};

export const finnVedtakAlltid = (vedtakListe: Vedtak[], vedtakId: number): Vedtak => {
	return vedtakListe.find(v => v.id === vedtakId) as Vedtak;
};

export const finnUtkast = (vedtakListe: Vedtak[]): Vedtak | undefined => {
	return vedtakListe.find(v => v.vedtakStatus === 'UTKAST');
};

// If the checkboxes/radios does not swallow enter, then it will for some reason propagate to the first button and trigger onClick
export function swallowEnterKeyPress(e: any) {
	if (e.charCode === 13) {
		e.preventDefault();
	}
}
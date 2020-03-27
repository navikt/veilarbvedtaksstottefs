import { BeslutterProsessStatus, Vedtak } from '../rest/data/vedtak';
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

export const erKlarTilBeslutter = (vedtak: Vedtak): boolean => {
	return vedtak.beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_BESLUTTER;
};

export const erKlarTilVeileder = (vedtak: Vedtak): boolean => {
	return vedtak.beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_VEILEDER;
};

// If the checkboxes/radios does not swallow enter, then it will for some reason propagate to the first button and trigger onClick
export const swallowEnterKeyPress = (e: any) => {
	if (e.charCode === 13) {
		e.preventDefault();
	}
};

export const isNothing = (str: OrNothing<string>): boolean => {
	return str == null || str.trim().length === 0;
};



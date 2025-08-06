import { OrNothing } from './type/ornothing';
import { BeslutterProsessStatus, Utkast, Vedtak } from '../api/veilarbvedtaksstotte';

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export const scrollToBottom = (elem: Element | null) => {
	if (elem) {
		elem.scrollTop = elem.scrollHeight;
	}
};

export const finnGjeldendeVedtak = (vedtakListe: OrNothing<Vedtak[]>): Vedtak | undefined => {
	return vedtakListe ? vedtakListe.find(v => v.gjeldende) : undefined;
};

export const hentId = (utkast: Utkast | null): number => {
	return utkast ? utkast.id : -1;
};

export const erBeslutterProsessStartet = (beslutterProsessStatus: OrNothing<BeslutterProsessStatus>): boolean => {
	return beslutterProsessStatus != null;
};

export const erKlarTilBeslutter = (beslutterProsessStatus: OrNothing<BeslutterProsessStatus>): boolean => {
	return beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_BESLUTTER;
};

export const erKlarTilVeileder = (beslutterProsessStatus: OrNothing<BeslutterProsessStatus>): boolean => {
	return beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_VEILEDER;
};

export const erGodkjentAvBeslutter = (beslutterProsessStatus: OrNothing<BeslutterProsessStatus>): boolean => {
	return beslutterProsessStatus === BeslutterProsessStatus.GODKJENT_AV_BESLUTTER;
};

// If the checkboxes/radios does not swallow enter, then it will propagate to the first button and trigger onClick
export const swallowEnterKeyPress = (e: React.KeyboardEvent) => {
	if (e.key === 'Enter') {
		e.preventDefault();
	}
};

export const isNothing = (str: OrNothing<string>): boolean => {
	return str == null || str.trim().length === 0;
};

export const hasHashParam = (parameterName: string): boolean => {
	return window.location.hash.includes(parameterName);
};

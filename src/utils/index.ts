import { BeslutterProsessStatus, Vedtak } from '../rest/data/vedtak';
import { OrNothing } from './types/ornothing';
import { SkjemaLagringStatus } from './types/skjema-lagring-status';

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

export const erBeslutterProsessStartet = (beslutterProsessStatus:  OrNothing<BeslutterProsessStatus>): boolean => {
	return beslutterProsessStatus != null;
};

export const erKlarTilBeslutter = (beslutterProsessStatus:  OrNothing<BeslutterProsessStatus>): boolean => {
	return beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_BESLUTTER;
};

export const erKlarTilVeileder = (beslutterProsessStatus: OrNothing<BeslutterProsessStatus>): boolean => {
	return beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_VEILEDER;
};

export const erGodkjentAvBeslutter = (beslutterProsessStatus:  OrNothing<BeslutterProsessStatus>): boolean => {
	return beslutterProsessStatus === BeslutterProsessStatus.GODKJENT_AV_BESLUTTER;
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

export function mapSkjemaLagringStatusTilTekst(skjemaLagringStatus: SkjemaLagringStatus): string {
	switch (skjemaLagringStatus) {
		case SkjemaLagringStatus.LAGRER:
			return 'Lagrer...';
		case SkjemaLagringStatus.ENDRING_IKKE_LAGRET:
			return 'Lagrer...';
		case SkjemaLagringStatus.ALLE_ENDRINGER_LAGRET:
			return 'Alle endringer lagret';
		case SkjemaLagringStatus.LAGRING_FEILET:
			return 'Lagring feilet';
	}

	return '';
}



import { BeslutterProsessStatus, Vedtak } from '../rest/data/vedtak';
import { OrNothing } from './types/ornothing';
import { SkjemaLagringStatus } from './types/skjema-lagring-status';
import React from 'react';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export const lagSkjemaelementFeilmelding = (muligFeil: string | undefined): React.ReactNode => {
	return muligFeil ? <SkjemaelementFeilmelding>{muligFeil}</SkjemaelementFeilmelding> : null;
};

export const finnGjeldendeVedtak = (vedtakListe: OrNothing<Vedtak[]>): Vedtak | undefined => {
	return vedtakListe ? vedtakListe.find(v => v.gjeldende) : undefined;
};

export const hentId = (utkast: Vedtak | null): number => {
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

import { AlertProps } from '@navikt/ds-react';

export interface VarselConfig {
	type: AlertProps['variant'];
	tekst: string;
}

export const vedtakSendt: VarselConfig = {
	type: 'success',
	tekst: 'Oppfølgingsvedtaket er sendt til bruker.'
};

export const tattOverSomVeileder: VarselConfig = {
	type: 'success',
	tekst: 'Du har nå tatt over ansvaret for vedtaket.'
};

export const tattOverSomBeslutter: VarselConfig = {
	type: 'success',
	tekst: 'Du har nå tatt over som kvalitetssikrer for vedtaket.'
};

export const utkastOppdatert: VarselConfig = {
	type: 'info',
	tekst: 'Utkastet har blitt oppdatert.'
};
export const beslutterprosessTilVeileder: VarselConfig = {
	type: 'info',
	tekst: 'Trenger respons fra veileder.'
};

export const beslutterprosessTilBeslutter: VarselConfig = {
	type: 'info',
	tekst: 'Trenger tilbakemelding fra kvalitetssikrer.'
};

export const beslutterprosessGodkjent: VarselConfig = {
	type: 'info',
	tekst: 'Vedtaket er kvalitetsikret.'
};

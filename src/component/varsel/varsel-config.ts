import { AlertStripeType } from 'nav-frontend-alertstriper';

export interface VarselConfig {
	type: AlertStripeType;
	tekst: string;
}

export const vedtakSendt: VarselConfig = {
	type: 'suksess',
	tekst: 'Oppfølgingsvedtaket er sendt til bruker.'
};

export const tattOverSomVeileder: VarselConfig = {
	type: 'suksess',
	tekst: 'Du har nå tatt over som veileder.'
};

export const tattOverSomBeslutter: VarselConfig = {
	type: 'suksess',
	tekst: 'Du har nå tatt over som beslutter.'
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
	tekst: 'Trenger tilbakemelding fra beslutter.'
};

export const beslutterprosessGodkjent: VarselConfig = {
	type: 'info',
	tekst: 'Kvalitetsikret av beslutter.'
};

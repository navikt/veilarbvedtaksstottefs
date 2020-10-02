import { AlertStripeType } from 'nav-frontend-alertstriper';

export interface VarselConfig {
    type: AlertStripeType
    tekst: string
}

export const vedtakSendt: VarselConfig = {
    type: 'suksess',
    tekst: 'Oppfølgingsvedtaket er sendt til bruker.'
}

export const tattOverSomVeileder: VarselConfig = {
    type: 'info',
    tekst: 'Du har nå tatt over som veileder.'
}

export const tattOverSomBeslutter: VarselConfig = {
    type: 'info',
    tekst: 'Du har nå tatt over som beslutter.'
}

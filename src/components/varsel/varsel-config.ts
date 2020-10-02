import { AlertStripeType } from 'nav-frontend-alertstriper';

export interface VarselConfig {
    type: AlertStripeType
    tekst: string
}

export const vedtakSendt: VarselConfig = {
    type: 'suksess',
    tekst: 'Oppfølgingsvedtaket er sendt til bruker.'
}

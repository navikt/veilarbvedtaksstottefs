import { View } from '../../stores/view-store';

export interface FeilmodalConfig {
    tittel: string;
    beskrivelse: string;
    viewAction: View;
    knappeTekst?: string;
}

export const feilVedSendningConfig: FeilmodalConfig = {
    tittel: 'Problemer med å sende',
    beskrivelse: 'Vedtaksbrevet kan dessverre ikke sendes for øyeblikket. Vennligst prøv igjen senere.',
    viewAction: View.UTKAST,
    knappeTekst: 'Tilbake til vedtakskjema'
};

export const stoppeInnsendingFeatureToggleConfig: FeilmodalConfig = {
    tittel: 'Problemer med å sende',
    beskrivelse: 'Det er problemer med å sende vedtak for øyeblikket. Vi jobber med å løse saken',
    viewAction: View.UTKAST,
    knappeTekst: 'Tilbake til vedtakskjema'
};

export const feilVedForhandsvisnigConfig: FeilmodalConfig = {
    tittel: 'Problemer med forhåndsvisning',
    beskrivelse: 'Vi får dessverre ikke forhåndsvist vedtaksbrevet for øyeblikket. Vennligst gå tilbake til utkastet og prøv igjen senere.',
    viewAction: View.UTKAST,
    knappeTekst: 'Tilbake til vedtakskjema'
};

export const feilVedVisningConfig: FeilmodalConfig = {
    tittel: 'Kan ikke vise vedtaksbrev',
    beskrivelse: 'Det er problemer med å vise vedtaksbrev for øyeblikket. Vi jobber med å løse saken.',
    viewAction: View.HOVEDSIDE, // TODO: Bytt med VEDTAK?
    knappeTekst: 'Tilbake til vedtak'
};

export const feilVedLagringConfig: FeilmodalConfig = {
    tittel: 'Problemer med å lagre',
    beskrivelse: 'Lagring feilet. Vennligst prøv igjen senere.',
    viewAction: View.HOVEDSIDE,
};

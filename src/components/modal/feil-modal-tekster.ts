import { View } from '../../stores/view-store';

export const feilVidSendningProps = {
    tittel: 'Problemer med å sende',
    beskrivelse: 'Vedtaksbrevet kan dessverrre ikke sendes for øyeblikket. Vennligst prøv igjen senare.',
    viewAction: View.UTKAST,
    knappeTekst : 'Tilbake til vedtakskjema'
};

export const stoppeInnsendingFeatureToggleProps = {
    tittel: 'Problemer med å sende',
    beskrivelse: 'Det er problemer med å sende vedtak for øyeblikket. Vi jobber med å løse saken',
    viewAction: View.UTKAST,
    knappeTekst : 'Tilbake til vedtakskjema'
};

export const feilVidForhandsvisnigProps = {
    tittel: 'Problemer med forhåndsvisning',
    beskrivelse: 'Vi får dessverre ikke forhåndsvist vedtaksbrevet for øyeblikket. Vennligst gå tilbake til utkastet og prøv igjen senare.',
    viewAction: View.UTKAST,
    knappeTekst : 'Tilbake til vedtakskjema'
};

export const feilVedVisningProps = (vedtakId: number) => ({
        tittel: 'Kan ikke vise vedtaksbrev',
        beskrivelse: 'Det er problemer med å vise vedtaksbrev for øyeblikket. Vi jobber med å løse saken.',
        viewAction: {view: View.VEDTAK, props: {id: vedtakId}},
        knappeTekst : 'Tilbake til vedtak'
});

export const feilVidLagring = {
        tittel: 'Problemer med å lagre',
        beskrivelse: 'Lagring feilet. Vennligst prøv igjen senare.',
        viewAction: View.HOVEDSIDE,
};

import { ViewType } from '../../../stores/view-store';

export interface FeilModalConfig {
	tittel: string;
	beskrivelse: string;
	viewAction?: ViewType;
	knappeTekst?: string;
}

export const feilVedOpprettingAvUtkast: FeilModalConfig = {
	tittel: 'Klarte ikke å opprette nytt utkast',
	beskrivelse: 'En feil oppstod under opprettingen av et nytt utkast. Vennligst prøv igjen senere.'
};

export const feilVedSendningConfig: FeilModalConfig = {
	tittel: 'Problemer med å sende',
	beskrivelse: 'Vedtaksbrevet kan dessverre ikke sendes for øyeblikket. Vennligst prøv igjen senere.',
	viewAction: ViewType.UTKAST,
	knappeTekst: 'Tilbake til vedtakskjema'
};

export const stoppeInnsendingFeatureToggleConfig: FeilModalConfig = {
	tittel: 'Problemer med å sende',
	beskrivelse: 'Det er problemer med å sende vedtak for øyeblikket. Vi jobber med å løse saken',
	viewAction: ViewType.UTKAST,
	knappeTekst: 'Tilbake til vedtakskjema'
};

export const feilVedForhandsvisnigConfig: FeilModalConfig = {
	tittel: 'Problemer med forhåndsvisning',
	beskrivelse:
		'Vi får dessverre ikke forhåndsvist vedtaksbrevet for øyeblikket. Vennligst gå tilbake til utkastet og prøv igjen senere.',
	viewAction: ViewType.UTKAST,
	knappeTekst: 'Tilbake til vedtakskjema'
};

export const feilVedVisningConfig: FeilModalConfig = {
	tittel: 'Kan ikke vise vedtaksbrev',
	beskrivelse: 'Det er problemer med å vise vedtaksbrev for øyeblikket. Vi jobber med å løse saken.',
	viewAction: ViewType.HOVEDSIDE,
	knappeTekst: 'Tilbake til hovedside'
};

export const feilVedLagringConfig: FeilModalConfig = {
	tittel: 'Problemer med å lagre',
	beskrivelse: 'Lagring feilet. Vennligst prøv igjen senere.'
};

export const feilVedSlettingAvUtkastConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å slette utkast',
	beskrivelse: 'En feil oppstod under slettingen av utkastet. Vennligst prøv igjen senere.'
};

export const feilVedOpprettingAvBeslutterOppgave: FeilModalConfig = {
	tittel: 'Problemer med å sende oppgave til beslutter',
	beskrivelse: 'Det kan dessverre ikke sendes oppgave til beslutter for øyeblikket. Vennligst prøv igjen senere.',
};

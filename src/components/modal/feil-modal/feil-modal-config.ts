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

export const stoppeUtsendingFeatureToggleConfig: FeilModalConfig = {
	tittel: 'Problemer med å sende',
	beskrivelse: 'Det er problemer med å sende vedtak for øyeblikket. Vi jobber med å løse saken.',
	viewAction: ViewType.UTKAST,
	knappeTekst: 'Tilbake til utkast'
};

export const feilVedForhandsvisnigConfig: FeilModalConfig = {
	tittel: 'Problemer med forhåndsvisning',
	beskrivelse:
		'Vi får dessverre ikke forhåndsvist vedtaksbrevet for øyeblikket. Vennligst gå tilbake til utkastet og prøv igjen senere.',
	viewAction: ViewType.UTKAST,
	knappeTekst: 'Tilbake til utkast'
};

export const feilVedVisningConfig: FeilModalConfig = {
	tittel: 'Kan ikke vise vedtaksbrev',
	beskrivelse: 'Det er problemer med å vise vedtaksbrev for øyeblikket. Vi jobber med å løse saken.',
	viewAction: ViewType.HOVEDSIDE,
	knappeTekst: 'Tilbake til hovedside'
};

export const feilVedLagringConfig: FeilModalConfig = {
	tittel: 'Problemer med å lagre',
	beskrivelse: 'Feil oppstod under lagring. Vennligst prøv igjen senere.'
};

export const feilVedSlettingAvUtkastConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å slette utkast',
	beskrivelse: 'En feil oppstod under slettingen av utkastet. Vennligst prøv igjen senere.'
};

export const feilVedOvertakelseAvUtkastConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å ta over utkast',
	beskrivelse: 'En feil oppstod under overtakelse av utkast. Vennligst prøv igjen senere.'
};

export const feilVedStartBeslutterProsessConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å klargjøre utkastet for beslutter',
	beskrivelse: 'En feil oppstod under klargjøring av utkastet for beslutter. Vennligst prøv igjen senere.'
};

export const feilVedBliBeslutterConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å bli beslutter',
	beskrivelse: 'En feil oppstod under overtakselse som beslutter. Vennligst prøv igjen senere.'
};

export const feilVedUtsendingAvDialogMelding: FeilModalConfig = {
	tittel: 'Klarte ikke å sende meldingen',
	beskrivelse: 'En feil oppstod under utsendingen av meldingen. Vennligst prøv igjen senere.'
};

export const feilVedOppdaterBeslutterProsessStatus: FeilModalConfig = {
	tittel: 'Klarte ikke å oppdatere status',
	beskrivelse: 'En feil oppstod under oppdatering av status. Vennligst prøv igjen senere.'
};
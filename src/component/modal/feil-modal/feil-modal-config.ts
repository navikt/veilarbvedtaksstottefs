import { ViewType } from '../../../store/view-store';

export interface FeilModalConfig {
	tittel: string;
	beskrivelse: string;
	viewAction?: ViewType;
	knappeTekst?: string;
}

export const feilVedOpprettingAvUtkastConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å opprette nytt utkast',
	beskrivelse: 'En feil oppstod under opprettingen av et nytt utkast. Vennligst prøv igjen senere.'
};

export const feilVedSendingConfig: FeilModalConfig = {
	tittel: 'Problemer med å sende',
	beskrivelse: 'Vedtaksbrevet kan dessverre ikke sendes for øyeblikket. Vennligst prøv igjen senere.',
	viewAction: ViewType.UTKAST,
	knappeTekst: 'Tilbake til vedtakskjema'
};

export const stoppeUtsendingFeatureToggleConfig: FeilModalConfig = {
	tittel: 'Problemer med å sende',
	beskrivelse: 'Det er problemer med å sende vedtak for øyeblikket. Vennligst prøv igjen senere.',
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
	beskrivelse: 'Det er problemer med å vise vedtaksbrev for øyeblikket. Vennligst prøv igjen senere.',
	viewAction: ViewType.HOVEDSIDE,
	knappeTekst: 'Tilbake til hovedside'
};

export const feilVedLagringConfig: FeilModalConfig = {
	tittel: 'Problemer med å lagre',
	beskrivelse: 'Feil oppstod under lagring. Vennligst prøv igjen senere.'
};

export const feilVedSlettingAvUtkastConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å slette utkast',
	beskrivelse: 'En feil oppstod under sletting av utkastet. Vennligst prøv igjen senere.'
};

export const feilVedOvertakelseAvUtkastConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å ta over utkast',
	beskrivelse: 'En feil oppstod under overtakelse av utkast. Vennligst prøv igjen senere.'
};

export const feilVedStartBeslutterProsessConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å klargjøre utkastet for kvalitetssikrer',
	beskrivelse: 'En feil oppstod under klargjøring av utkastet for kvalitetssikrer. Vennligst prøv igjen senere.'
};

export const feilVedAvbrytBeslutterProsessConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å avbryte kvalitetssikrerprosessen',
	beskrivelse: 'En feil oppstod under avbryting av kvalitetssikrerprosessen. Innsatsgruppe vil ikke bli endret.'
};

export const feilVedBliBeslutterConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å bli kvalitetssikrer',
	beskrivelse: 'En feil oppstod under overtakelse som kvalitetssikrer. Vennligst prøv igjen senere.'
};

export const feilVedUtsendingAvDialogMeldingConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å sende meldingen',
	beskrivelse: 'En feil oppstod under utsending av meldingen. Vennligst prøv igjen senere.'
};

export const feilVedOppdaterBeslutterProsessStatusConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å oppdatere status',
	beskrivelse: 'En feil oppstod under oppdatering av status. Vennligst prøv igjen senere.'
};

export const feilVedGodkjenningAvBeslutterConfig: FeilModalConfig = {
	tittel: 'Klarte ikke å godkjenne vedtaket',
	beskrivelse: 'En feil oppstod under godkjenning av vedtaket. Vennligst prøv igjen senere.'
};

export const feilVedValideringAvUtkastConfig: FeilModalConfig = {
	tittel: 'Utkastet kan ikke forhåndsvises',
	beskrivelse:
		'Det er mangelfull data i utkastet som gjør at det ikke kan forhåndsvises. Vennligst prøv igjen senere.'
};

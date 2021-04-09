import React from 'react';
import AlertStripe, { AlertStripeType } from 'nav-frontend-alertstriper';
import { BeslutterProsessStatus, InnsatsgruppeType, Utkast } from '../../../api/veilarbvedtaksstotte';
import { OrNothing } from '../../../util/type/ornothing';
import { VeilederTilgang } from '../../../util/tilgang';
import { trengerKvalitetssikrer } from '../../../util/skjema-utils';

interface UtkastStatusMeldingProps {
	utkast: Utkast;
	skjemaInnsatsgruppe: OrNothing<InnsatsgruppeType>;
	veilederTilgang: VeilederTilgang;
	minified?: boolean;
}

function utledStatusVerdier(props: UtkastStatusMeldingProps): { type: AlertStripeType; tekst: string } | null {
	const { utkast, skjemaInnsatsgruppe, veilederTilgang } = props;

	if (!utkast.beslutterProsessStatus && trengerKvalitetssikrer(skjemaInnsatsgruppe)) {
		const type = veilederTilgang === VeilederTilgang.ANSVARLIG_VEILEDER ? 'advarsel' : 'info';

		return { type, tekst: 'Trenger kvalitetssikring' };
	}

	if (utkast.beslutterProsessStatus && !utkast.beslutterIdent) {
		if (
			veilederTilgang === VeilederTilgang.ANSVARLIG_VEILEDER ||
			veilederTilgang === VeilederTilgang.IKKE_ANSVARLIG_VEILEDER
		) {
			return { type: 'info', tekst: 'Venter på tilbakemelding' };
		}

		return { type: 'advarsel', tekst: 'Trenger kvalitetssikring' };
	}

	if (utkast.beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_BESLUTTER) {
		if (
			veilederTilgang === VeilederTilgang.ANSVARLIG_VEILEDER ||
			veilederTilgang === VeilederTilgang.IKKE_ANSVARLIG_VEILEDER
		) {
			return { type: 'info', tekst: 'Venter på tilbakemelding' };
		}

		return { type: 'advarsel', tekst: 'Gi tilbakemelding' };
	}

	if (utkast.beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_VEILEDER) {
		if (
			veilederTilgang === VeilederTilgang.BESLUTTER ||
			veilederTilgang === VeilederTilgang.IKKE_ANSVARLIG_VEILEDER
		) {
			return { type: 'info', tekst: 'Venter på veileder' };
		}

		return { type: 'advarsel', tekst: 'Vurder tilbakemelding' };
	}

	if (utkast.beslutterProsessStatus === BeslutterProsessStatus.GODKJENT_AV_BESLUTTER) {
		return { type: 'suksess', tekst: 'Klar til utsendelse' };
	}

	return null;
}

export function UtkastStatusMelding(props: UtkastStatusMeldingProps) {
	const alertStripeVerdier = utledStatusVerdier(props);

	if (!alertStripeVerdier) {
		return null;
	}

	const ariaLive = ['advarsel', 'feil'].includes(alertStripeVerdier.type) ? 'assertive' : 'polite';

	const ariaLabel = props.minified ? alertStripeVerdier.tekst : undefined;

	return (
		<AlertStripe type={alertStripeVerdier.type} form="inline">
			<span aria-live={ariaLive} aria-label={ariaLabel}>
				{props.minified ? '' : alertStripeVerdier.tekst}
			</span>
		</AlertStripe>
	);
}

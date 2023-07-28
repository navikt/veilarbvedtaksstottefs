import { BeslutterProsessStatus, InnsatsgruppeType, Utkast } from '../../../api/veilarbvedtaksstotte';
import { OrNothing } from '../../../util/type/ornothing';
import { VeilederTilgang } from '../../../util/tilgang';
import { trengerKvalitetssikrer } from '../../../util/skjema-utils';
import { Alert, AlertProps } from '@navikt/ds-react';

interface UtkastStatusMeldingProps {
	utkast: Utkast;
	skjemaInnsatsgruppe: OrNothing<InnsatsgruppeType>;
	veilederTilgang: VeilederTilgang;
	minified?: boolean;
}

function utledStatusVerdier(props: UtkastStatusMeldingProps): { type: AlertProps['variant']; tekst: string } | null {
	const { utkast, skjemaInnsatsgruppe, veilederTilgang } = props;

	if (!utkast.beslutterProsessStatus && trengerKvalitetssikrer(skjemaInnsatsgruppe)) {
		const type = veilederTilgang === VeilederTilgang.ANSVARLIG_VEILEDER ? 'warning' : 'info';

		return { type, tekst: 'Trenger kvalitetssikring' };
	}

	if (utkast.beslutterProsessStatus && !utkast.beslutterIdent) {
		if (
			veilederTilgang === VeilederTilgang.ANSVARLIG_VEILEDER ||
			veilederTilgang === VeilederTilgang.IKKE_ANSVARLIG_VEILEDER
		) {
			return { type: 'info', tekst: 'Venter på tilbakemelding' };
		}

		return { type: 'warning', tekst: 'Trenger kvalitetssikring' };
	}

	if (utkast.beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_BESLUTTER) {
		if (
			veilederTilgang === VeilederTilgang.ANSVARLIG_VEILEDER ||
			veilederTilgang === VeilederTilgang.IKKE_ANSVARLIG_VEILEDER
		) {
			return { type: 'info', tekst: 'Venter på tilbakemelding' };
		}

		return { type: 'warning', tekst: 'Gi tilbakemelding' };
	}

	if (utkast.beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_VEILEDER) {
		if (
			veilederTilgang === VeilederTilgang.BESLUTTER ||
			veilederTilgang === VeilederTilgang.IKKE_ANSVARLIG_VEILEDER
		) {
			return { type: 'info', tekst: 'Venter på veileder' };
		}

		return { type: 'warning', tekst: 'Vurder tilbakemelding' };
	}

	if (utkast.beslutterProsessStatus === BeslutterProsessStatus.GODKJENT_AV_BESLUTTER) {
		return { type: 'success', tekst: 'Klar til utsendelse' };
	}

	return null;
}

export function UtkastStatusMelding(props: UtkastStatusMeldingProps) {
	const alertStripeVerdier = utledStatusVerdier(props);

	if (!alertStripeVerdier) {
		return null;
	}

	const ariaLive = ['warning', 'error'].includes(alertStripeVerdier.type) ? 'assertive' : 'polite';

	const ariaLabel = props.minified ? alertStripeVerdier.tekst : undefined;

	return (
		<Alert size="small" variant={alertStripeVerdier.type} inline aria-live={ariaLive} aria-label={ariaLabel}>
			{props.minified ? '' : alertStripeVerdier.tekst}
		</Alert>
	);
}

import { OrNothing } from '../../../util/type/ornothing';
import utkastIkon from './utkast.svg';
import utkastTilBeslutterIkon from './utkast-til-beslutter.svg';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../store/view-store';
import { useTilgangStore } from '../../../store/tilgang-store';
import { useSkjemaStore } from '../../../store/skjema-store';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	erKlarTilVeileder,
	isNothing
} from '../../../util';
import { Utkast } from '../../../api/veilarbvedtaksstotte';
import { formatDateTime } from '../../../util/date-utils';
import { Button, Detail } from '@navikt/ds-react';
import './utkast-panel.css';

export function UtkastPanel(props: { utkast: OrNothing<Utkast> }) {
	const { changeView } = useViewStore();
	const { kanEndreUtkast } = useTilgangStore();
	const { sistOppdatert } = useSkjemaStore();

	if (!props.utkast) {
		return null;
	}

	const { veilederNavn, beslutterNavn, beslutterProsessStatus } = props.utkast;

	const lagUtkastUnderTittle = () => {
		if (erGodkjentAvBeslutter(beslutterProsessStatus)) {
			return 'Klar for utsendelse';
		} else if (erBeslutterProsessStartet(beslutterProsessStatus) && isNothing(beslutterNavn)) {
			return 'Utkast trenger kvalitetssikrer';
		} else if (erKlarTilBeslutter(beslutterProsessStatus)) {
			return 'Trenger tilbakemelding fra kvalitetssikrer';
		} else if (erKlarTilVeileder(beslutterProsessStatus)) {
			return 'Trenger respons fra veileder';
		} else {
			return 'Utkast';
		}
	};

	return (
		<VedtaksstottePanel
			tittel="Utkast til oppfølgingsvedtak"
			undertittel={lagUtkastUnderTittle()}
			panelKlasse="utkast-panel"
			imgSrc={beslutterNavn ? utkastTilBeslutterIkon : utkastIkon}
			tekstKomponent={
				<>
					{beslutterNavn && (
						<Detail>
							<b>Kvalitetssikrer:</b> {beslutterNavn}
						</Detail>
					)}
					<Detail>
						<b>Sist endret:</b> {formatDateTime(sistOppdatert || props.utkast.utkastSistOppdatert)}
					</Detail>
					<Detail>
						<b>Ansvarlig:</b> {veilederNavn}
					</Detail>
				</>
			}
			knappKomponent={
				<Button size="small" onClick={() => changeView(ViewType.UTKAST)}>
					{kanEndreUtkast ? 'Fortsett' : 'Åpne'}
				</Button>
			}
		/>
	);
}

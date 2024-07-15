import { OrNothing } from '../../../util/type/ornothing';
import { DatoLabel } from '../dato-label';
import utkastIkon from './utkast.svg';
import utkastTilBeslutterIkon from './utkast-til-beslutter.svg';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../store/view-store';
import { KvalitetssikrerLabel } from '../kvalitetssikrer-label';
import Show from '../../show';
import { useTilgangStore } from '../../../store/tilgang-store';
import { useSkjemaStore } from '../../../store/skjema-store';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	erKlarTilVeileder,
	isNothing
} from '../../../util';
import { Label, LabelType } from '../../label/label';
import { Utkast } from '../../../api/veilarbvedtaksstotte';
import { Button } from '@navikt/ds-react';
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
			imgSrc={beslutterNavn ? utkastTilBeslutterIkon : utkastIkon}
			panelKlasse="utkast-panel"
			knappKomponent={
				<Button size="small" onClick={() => changeView(ViewType.UTKAST)}>
					{kanEndreUtkast ? 'Fortsett' : 'Åpne'}
				</Button>
			}
			tekstKomponent={
				<>
					<Show if={beslutterNavn}>
						<KvalitetssikrerLabel
							className="utkast-panel__beslutter"
							beslutterNavn={beslutterNavn as string}
						/>
					</Show>
					<DatoLabel
						className="utkast-panel__dato"
						sistOppdatert={sistOppdatert || props.utkast.utkastSistOppdatert}
						formatType="long"
						text="Sist endret"
					/>
					<Label titleText="Ansvarlig" valueText={veilederNavn} labelType={LabelType.SMALL} />
				</>
			}
		/>
	);
}

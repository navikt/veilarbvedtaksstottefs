import React from 'react';
import { Vedtak } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import { DatoLabel } from '../dato-label';
import { Hovedknapp } from 'nav-frontend-knapper';
import utkastIkon from './utkast.svg';
import utkastTilBeslutterIkon from './utkast-til-beslutter.svg';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { Beslutter } from '../beslutter';
import Show from '../../show';
import { useTilgangStore } from '../../../stores/tilgang-store';
import './utkast-panel.less';
import { useSkjemaStore } from '../../../stores/skjema-store';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	erKlarTilVeileder,
	isNothing
} from '../../../utils';
import { Label, LabelType } from '../../label/label';

export function UtkastPanel(props: { utkast: OrNothing<Vedtak> }) {
	const { changeView } = useViewStore();
	const { kanEndreUtkast } = useTilgangStore();
	const { sistOppdatert } = useSkjemaStore();

	if (!props.utkast) {
		return null;
	}

	const {veilederNavn, beslutterNavn, beslutterProsessStatus} = props.utkast;

	const lagUtkastUnderTittle = () => {

		if (erGodkjentAvBeslutter(beslutterProsessStatus)) {
			return 'Klar for utsendelse';
		} else if (erBeslutterProsessStartet(beslutterProsessStatus) && isNothing(beslutterNavn)) {
			return 'Utkast trenger beslutter';
		} else if (erKlarTilBeslutter(beslutterProsessStatus)) {
			return 'Trenger tilbakemelding fra beslutter';
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
			knappKomponent={<Hovedknapp onClick={() => changeView(ViewType.UTKAST)}>{ kanEndreUtkast ? 'Fortsett' : 'Åpne' }</Hovedknapp>}
			tekstKomponent={
				<>
					<Show if={beslutterNavn}>
						<Beslutter className="utkast-panel__beslutter" beslutterNavn={beslutterNavn as string}/>
					</Show>
					<DatoLabel className="utkast-panel__dato" sistOppdatert={sistOppdatert || props.utkast.sistOppdatert} formatType="long" text="Sist endret" />
					<Label titleText="Ansvarlig" valueText={veilederNavn} labelType={LabelType.SMALL} />
				</>
			}
		/>
	);
}

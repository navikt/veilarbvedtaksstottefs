import React from 'react';
import { Vedtak } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import { Dato } from '../dato';
import { Veileder } from '../veileder';
import { Hovedknapp } from 'nav-frontend-knapper';
import utkastIkon from './utkast.svg';
import utkastTilBeslutterIkon from './utkast-til-beslutter.svg';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { Beslutter } from '../beslutter';
import Show from '../../show';
import { useInnloggetVeilederStore } from '../../../stores/innlogget-veileder-store';
import './utkast-panel.less';

export function UtkastPanel(props: { utkast: OrNothing<Vedtak> }) {
	const { changeView } = useViewStore();
	const { kanEndreUtkast } = useInnloggetVeilederStore();

	if (!props.utkast) {
		return null;
	}

	const {
		sistOppdatert, veilederIdent, veilederNavn,
		oppfolgingsenhetId, oppfolgingsenhetNavn, beslutterNavn
	} = props.utkast;

	return (
		<VedtaksstottePanel
			tittel="Utkast til oppfølgingsvedtak"
			undertittel="Utkast"
			imgSrc={beslutterNavn ? utkastTilBeslutterIkon : utkastIkon}
			panelKlasse="utkast-panel"
			knappKomponent={<Hovedknapp onClick={() => changeView(ViewType.UTKAST)}>{ kanEndreUtkast ? 'Fortsett' : 'Åpne' }</Hovedknapp>}
			tekstKomponent={
				<>
					<Show if={beslutterNavn}>
						<Beslutter beslutterNavn={beslutterNavn as string}/>
					</Show>
					<Dato className="utkast-panel__dato" sistOppdatert={sistOppdatert} formatType="long" text="Sist endret" />
					<Veileder
						enhetId={oppfolgingsenhetId}
						veilederNavn={veilederNavn || veilederIdent}
						enhetNavn={oppfolgingsenhetNavn}
						text="Ansvarlig"
					/>
				</>
			}
		/>
	);
}

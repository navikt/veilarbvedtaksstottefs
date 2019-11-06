import React from 'react';
import { VedtakData } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import { Dato } from '../dato';
import { Veileder } from '../veileder';
import { Hovedknapp } from 'nav-frontend-knapper';
import utkastIkon from './utkast.svg';
import utkastTilBeslutterIkon from './utkast-til-beslutter.svg';
import './utkast-panel.less';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { Beslutter } from '../beslutter';
import Show from '../../show';

export function UtkastPanel(props: { utkast: OrNothing<VedtakData> }) {
	const { changeView } = useViewStore();

	if (!props.utkast) {
		return null;
	}

	const {
		sistOppdatert, veilederIdent, veilederNavn, veilederEnhetId,
		veilederEnhetNavn, sendtTilBeslutter, beslutterNavn
	} = props.utkast;
	const beslutterTekst = beslutterNavn || veilederEnhetId + ' ' + veilederEnhetNavn;

	let undertittel;
	let img;

	if (sendtTilBeslutter) {
		undertittel = 'Utkast sendt til beslutter';
		img = utkastTilBeslutterIkon;
	} else {
		undertittel = 'Utkast';
		img = utkastIkon;
	}

	return (
		<VedtaksstottePanel
			tittel="Utkast til oppfølgingsvedtak"
			undertittel={undertittel}
			imgSrc={img}
			panelKlasse="utkast-panel"
			knappKomponent={<Hovedknapp onClick={() => changeView(ViewType.UTKAST)}>Fortsett</Hovedknapp>}
			tekstKomponent={
				<>
					<Show if={sendtTilBeslutter}>
						<Beslutter beslutterNavn={beslutterTekst}/>
					</Show>
					<Dato sistOppdatert={sistOppdatert} formatType="long" text="Sist endret" />
					<Veileder
						enhetId={veilederEnhetId}
						veilederNavn={veilederNavn || veilederIdent}
						enhetNavn={veilederEnhetNavn}
						text="Endret av"
					/>
				</>
			}
		/>
	);
}

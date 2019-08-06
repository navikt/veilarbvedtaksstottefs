import React from 'react';
import { VedtakData } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import { Dato } from '../dato';
import { Veileder } from '../veileder';
import { Hovedknapp } from 'nav-frontend-knapper';
import utkastIkon from './utkast.svg';
import './utkast-panel.less';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import { useViewStore, ViewType } from '../../../stores/view-store';

export function UtkastPanel(props: { utkast: OrNothing<VedtakData> }) {
	const { changeView } = useViewStore();

	if (!props.utkast) {
		return null;
	}

	const { sistOppdatert, veilederIdent, veilederEnhetId, veilederEnhetNavn } = props.utkast;

	return (
		<VedtaksstottePanel
			tittel="Utkast til oppfølgingsvedtak"
			undertittel="Utkast"
			imgSrc={utkastIkon}
			panelKlasse="utkast-panel"
			tekstKomponent={
				<>
					<Dato sistOppdatert={sistOppdatert} formatType="long" text="Sist endret" />
					<Veileder
						enhetId={veilederEnhetId}
						ident={veilederIdent}
						enhetNavn={veilederEnhetNavn}
						text="Endret av"
					/>
				</>
			}
			knappKomponent={<Hovedknapp onClick={() => changeView(ViewType.UTKAST)}>Fortsett</Hovedknapp>}
		/>
	);
}

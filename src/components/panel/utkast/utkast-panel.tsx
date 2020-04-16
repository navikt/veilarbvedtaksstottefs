import React from 'react';
import { BeslutterProsessStatus, Vedtak } from '../../../rest/data/vedtak';
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
import { useTilgangStore } from '../../../stores/tilgang-store';
import './utkast-panel.less';
import { isNothing } from '../../../utils';

export function UtkastPanel(props: { utkast: OrNothing<Vedtak> }) {
	const { changeView } = useViewStore();
	const { kanEndreUtkast } = useTilgangStore();

	if (!props.utkast) {
		return null;
	}

	const {
		sistOppdatert, veilederIdent, veilederNavn,
		oppfolgingsenhetId, oppfolgingsenhetNavn, beslutterNavn,
		beslutterProsessStartet, beslutterProsessStatus, godkjentAvBeslutter
	} = props.utkast;

	const lagUtkastUnderTittle = ()=> {

		if (godkjentAvBeslutter) {
			return 'Klar for utsendelse';
		} else if (beslutterProsessStartet && isNothing(beslutterNavn)) {
			return 'Utkast trenger beslutter';
		} else if (beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_BESLUTTER) {
			return 'Trenger tilbakemelding fra beslutter';
		} else if (beslutterProsessStatus === BeslutterProsessStatus.KLAR_TIL_VEILEDER) {
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

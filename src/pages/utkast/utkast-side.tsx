import React from 'react';
import { EndreUtkastSkjema } from './endre-utkast-skjema';
import './utkast-side.less';
import { useSkjemaStore } from '../../stores/skjema-store';
import { DialogPanelInnhold } from './dialog-panel/dialog-panel-innhold';
import { DialogPanelHeader } from './dialog-panel/dialog-panel-header';
import { UtkastFooter } from './footer/utkast-footer';
import { DialogPanel } from './dialog-panel/dialog-panel';

export function UtkastSide() {
	// const { erAnsvarligVeileder } = useTilgangStore();
	// return erAnsvarligVeileder
	// 	? <EndreUtkastSkjema />
	// 	: <LesUtkastSkjema />;
	const {
		opplysninger,
		hovedmal,
		innsatsgruppe,
		begrunnelse,
		sistOppdatert,
		setSistOppdatert,
		validerSkjema,
		validerBegrunnelseLengde,
		lagringStatus,
		setLagringStatus
	} = useSkjemaStore();

	const vedtakskjema = { opplysninger, begrunnelse, innsatsgruppe, hovedmal };

	return (
		<div className="utkast-side-grid">
			<div className="utkast-side-grid-innhold">
				<div className="utkast-skjema-panel">
					<EndreUtkastSkjema />
				</div>
				<DialogPanel />
			</div>
			<div className="utkast-side-grid-footer">
				<UtkastFooter />
			</div>
		</div>
	);
}

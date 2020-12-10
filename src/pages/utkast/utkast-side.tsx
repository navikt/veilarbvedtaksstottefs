import React from 'react';
import { UtkastFooter } from './footer/utkast-footer';
import SkjemaHeader from './skjema/header/skjema-header';
import { useDataStore } from '../../stores/data-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { useTilgangStore } from '../../stores/tilgang-store';
import { DialogPanelHeader } from './dialog-panel/dialog-panel-header';
import { DialogPanelInnhold } from './dialog-panel/dialog-panel-innhold';
import { EndreUtkastSkjema } from './skjema/endre-utkast-skjema';
import { LesUtkastSkjema } from './skjema/les-utkast-skjema';
import './utkast-side.less';

export function UtkastSide() {
	const { utkast } = useDataStore();
	const { sistOppdatert } = useSkjemaStore();
	const { erAnsvarligVeileder } = useTilgangStore();

	const utkastSkjema = erAnsvarligVeileder ? <EndreUtkastSkjema /> : <LesUtkastSkjema />;

	return (
		<div className="utkast-side">
			<div className="utkast-side__hovedinnhold">
				<div className="utkast-side__skjema-panel">
					<SkjemaHeader utkast={utkast!} sistOppdatert={sistOppdatert} />
					{utkastSkjema}
				</div>
				<div className="utkast-side__dialog-panel">
					<DialogPanelHeader beslutterNavn={utkast?.beslutterNavn} />
					<DialogPanelInnhold />
				</div>
			</div>
			<div className="utkast-side__footer">
				<UtkastFooter />
			</div>
		</div>
	);
}

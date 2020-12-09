import React from 'react';
import { EndreUtkastSkjema } from './endre-utkast-skjema';
import './utkast-side.less';
import { UtkastFooter } from './footer/utkast-footer';
import { DialogPanel } from './dialog-panel/dialog-panel';

export function UtkastSide() {
	// const { erAnsvarligVeileder } = useTilgangStore();
	// return erAnsvarligVeileder
	// 	? <EndreUtkastSkjema />
	// 	: <LesUtkastSkjema />;

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

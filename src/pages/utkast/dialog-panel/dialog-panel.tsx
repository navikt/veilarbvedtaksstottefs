import React from 'react';
import { DialogPanelHeader } from './dialog-panel-header';
import { DialogPanelInnhold } from './dialog-panel-innhold';

export function DialogPanel() {
	return (
		<div className="dialog-panel">
			<DialogPanelHeader />
			<DialogPanelInnhold />
		</div>
	);
}

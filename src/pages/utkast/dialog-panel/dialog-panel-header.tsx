import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Label } from '../../../components/label/label';

export function DialogPanelHeader() {
	return (
		<div className="dialog-panel-header">
			<Undertittel className="dialog-panel-header__tittel">Kollegaveiledning</Undertittel>
			<Label titleText="Ansvarlig" valueText="TODO" />
		</div>
	);
}

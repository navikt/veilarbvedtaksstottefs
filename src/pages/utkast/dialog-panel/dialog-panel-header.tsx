import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Label } from '../../../components/label/label';
import './dialog-panel.less';
import Show from '../../../components/show';
import { OrNothing } from '../../../utils/types/ornothing';

interface DialogPanelHeaderProps {
	beslutterNavn?: OrNothing<string>;
}

export function DialogPanelHeader(props: DialogPanelHeaderProps) {
	return (
		<header className="dialog-panel-header">
			<Undertittel className="dialog-panel-header__tittel">Kollegaveiledning</Undertittel>
			<Show if={props.beslutterNavn}>
				<Label titleText="Ansvarlig" valueText={props.beslutterNavn} />
			</Show>
		</header>
	);
}

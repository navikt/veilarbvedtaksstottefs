import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Label } from '../../../components/label/label';
import Show from '../../../components/show';
import { OrNothing } from '../../../utils/types/ornothing';
import './dialog-section.less';

interface DialogPanelHeaderProps {
	beslutterNavn?: OrNothing<string>;
}

export function DialogSectionHeader(props: DialogPanelHeaderProps) {
	return (
		<header className="dialog-section-header">
			<Undertittel className="dialog-section-header__tittel">Kollegaveiledning</Undertittel>
			<Show if={props.beslutterNavn}>
				<Label titleText="Ansvarlig" valueText={props.beslutterNavn} />
			</Show>
		</header>
	);
}

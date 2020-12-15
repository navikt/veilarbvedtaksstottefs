import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Label } from '../../../components/label/label';
import Show from '../../../components/show';
import { OrNothing } from '../../../utils/types/ornothing';
import './dialog-section.less';
import { TipsPopover } from '../../../components/tips-popover/tips-popover';
import { DialogTipsInnhold } from './dialog-tips-innhold';
import { PopoverOrientering } from 'nav-frontend-popover';

interface DialogPanelHeaderProps {
	beslutterNavn?: OrNothing<string>;
}

export function DialogSectionHeader(props: DialogPanelHeaderProps) {
	return (
		<header className="dialog-section-header">
			<Undertittel className="dialog-section-header__tittel">Kollegaveiledning</Undertittel>
			<TipsPopover
				id="dialog-tips"
				className="dialog-section-header__tips"
				tipsInnhold={<DialogTipsInnhold />}
				ariaLabel="Tips for kollegaveiledning"
				orientering={PopoverOrientering.UnderHoyre}
			/>
			<Show if={props.beslutterNavn}>
				<Label titleText="Ansvarlig" valueText={props.beslutterNavn} />
			</Show>
		</header>
	);
}

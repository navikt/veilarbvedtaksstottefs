import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { DialogTipsInnhold } from './dialog-tips-innhold';
import { PopoverOrientering } from 'nav-frontend-popover';
import './dialog-section.less';
import { OrNothing } from '../../../util/type/ornothing';
import { TipsPopover } from '../../../component/tips-popover/tips-popover';
import Show from '../../../component/show';
import { Label } from '../../../component/label/label';

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

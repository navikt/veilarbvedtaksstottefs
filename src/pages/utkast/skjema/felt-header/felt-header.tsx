import React from 'react';
import cls from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import { TipsPopover } from '../../../../components/tips-popover/tips-popover';
import Show from '../../../../components/show';
import './felt-header.less';

interface FeltHeaderProps {
	id?: string;
	tittel: string;
	tittelId?: string;
	className?: string;
	tipsId?: string;
	tipsInnhold?: React.ReactNode;
	tipsAriaLabel?: string;
}

function FeltHeader(props: FeltHeaderProps) {
	return (
		<div id={props.id} className={cls('felt-header', props.className)}>
			<Undertittel id={props.tittelId} className="felt-header__tittel">
				{props.tittel}
			</Undertittel>
			<Show if={props.tipsInnhold}>
				<TipsPopover id={props.tipsId} tipsInnhold={props.tipsInnhold} ariaLabel={props.tipsAriaLabel} />
			</Show>
		</div>
	);
}

export default FeltHeader;

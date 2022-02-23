import React from 'react';
import cls from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import './felt-header.less';
import { TipsPopover } from '../../../../component/tips-popover/tips-popover';
import Show from '../../../../component/show';
import { ExternalLink } from '@navikt/ds-icons';
import { logMetrikk } from '../../../../util/logger';

interface FeltHeaderProps {
	id?: string;
	tittel: string;
	tittelId?: string;
	className?: string;
	tipsId?: string;
	tipsInnhold?: React.ReactNode;
	tipsAriaLabel?: string;
	eksternLenke?: string;
}

function FeltHeader(props: FeltHeaderProps) {
	const loggAapnet = () => {
		logMetrikk('veileder-aapnet');
	};
	return (
		<div id={props.id} className={cls('felt-header', props.className)}>
			<Undertittel id={props.tittelId} className="felt-header__tittel">
				{props.tittel}
			</Undertittel>
			<Show if={props.tipsInnhold}>
				<TipsPopover id={props.tipsId} tipsInnhold={props.tipsInnhold} ariaLabel={props.tipsAriaLabel} />
			</Show>
			<Show if={props.eksternLenke}>
				<a
					className="felt-header__lenke"
					href={props.eksternLenke}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={props.eksternLenke}
					onClick={loggAapnet}
				>
					Nye retningslinjer for NAV-loven § 14 a <ExternalLink fr={undefined} />
				</a>
			</Show>
		</div>
	);
}

export default FeltHeader;

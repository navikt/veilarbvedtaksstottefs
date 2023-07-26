import React from 'react';
import cls from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import { TipsPopover } from '../../../../component/tips-popover/tips-popover';
import { ExternalLink } from '@navikt/ds-icons';
import { logMetrikk } from '../../../../util/logger';
import './felt-header.less';

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
			{props.tipsInnhold && (
				<TipsPopover
					id={props.tipsId}
					tipsInnhold={props.tipsInnhold}
					ariaLabel={props.tipsAriaLabel}
					placement="right"
				/>
			)}
			{props.eksternLenke && (
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
			)}
		</div>
	);
}

export default FeltHeader;

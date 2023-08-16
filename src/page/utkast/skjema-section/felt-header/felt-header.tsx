import React from 'react';
import cls from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import { TipsPopover } from '../../../../component/tips-popover/tips-popover';
import { logMetrikk } from '../../../../util/logger';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
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
	eksternLenketekst?: string;
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
				<Link
					href={props.eksternLenke}
					className="felt-header__lenke"
					onClick={loggAapnet}
					target="_blank"
					rel="noopener noreferrer"
				>
					{props.eksternLenketekst}
					<ExternalLinkIcon title="Åpnes i en ny fane" />
				</Link>
			)}
		</div>
	);
}

export default FeltHeader;

import React from 'react';
import { TipsPopover } from '../../../../component/tips-popover/tips-popover';
import { logMetrikk } from '../../../../util/logger';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Detail, Heading, Link } from '@navikt/ds-react';
import './felt-header.css';

interface FeltHeaderProps {
	id?: string;
	tittel: string;
	tittelId?: string;
	beskrivelse?: string;
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
		<div className="felt-header">
			<div id={props.id} className="felt-header__tittel">
				<Heading size="small" level="2">
					{props.tittel}
				</Heading>
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
						<ExternalLinkIcon title="Åpnes i en ny fane" fontSize="1.125rem" />
					</Link>
				)}
			</div>
			{props.beskrivelse && <Detail textColor="subtle">{props.beskrivelse}</Detail>}
		</div>
	);
}

export default FeltHeader;

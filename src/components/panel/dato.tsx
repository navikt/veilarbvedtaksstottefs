import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';
import { formatDateTime, formatDateStr } from '../../utils/date-utils';

type FormatType = 'short' | 'long';

interface DatoProps {
	sistOppdatert: string;
	text: string;
	formatType: FormatType;
	className?: string;
}

export function Dato(props: DatoProps) {
	const { formatType, sistOppdatert, text, className } = props;
	return (
		<div className={className} style={{ display: 'flex' }}>
			<Undertekst className="label">{text}: </Undertekst>
			<Undertekst>
				{formatType === 'short' ? formatDateStr(sistOppdatert) : formatDateTime(sistOppdatert)}
			</Undertekst>
		</div>
	);
}

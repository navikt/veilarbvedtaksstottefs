import React from 'react';
import { formatDateStr, formatDateTime } from '../../utils/date-utils';
import { Label, LabelType } from '../label/label';

type FormatType = 'short' | 'long';

interface DatoProps {
	sistOppdatert: string;
	text: string;
	formatType: FormatType;
	className?: string;
}

export function DatoLabel(props: DatoProps) {
	const { formatType, sistOppdatert, text } = props;
	const dateStr = formatType === 'short'
		? formatDateStr(sistOppdatert)
		: formatDateTime(sistOppdatert);

	return <Label titleText={text} valueText={dateStr} labelType={LabelType.SMALL} />;
}

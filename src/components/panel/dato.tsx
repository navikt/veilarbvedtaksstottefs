import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';
import { formatDateTime, formatDate } from '../../utils/date-utils';

type FormatType = 'short' | 'long';

export function Dato({sistOppdatert, text, formatType}: {sistOppdatert: string, text: string, formatType: FormatType}) {
    return (
        <div style={{display: 'flex'}}>
            <Undertekst className="label">{text}: </Undertekst>
            <Undertekst>{formatType === 'short' ? formatDate(sistOppdatert) : formatDateTime(sistOppdatert)}</Undertekst>
        </div>
    );
}

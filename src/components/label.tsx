import React from 'react';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';

interface LabelProps {
	labelText: string;
	valueText: string;
}

export const Label = ({ labelText, valueText }: LabelProps) => {
    return (
	    <div className="label">
		    <UndertekstBold style={{ marginRight: '0.5rem' }} tag="span">{labelText}:</UndertekstBold>
		    <Undertekst tag="span">{valueText}</Undertekst>
	    </div>
    );
};

import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface LabelProps {
	labelText: string;
	valueText: string;
}

export const Label = ({ labelText, valueText }: LabelProps) => {
    return (
	    <div className="label">
		    <Element style={{ marginRight: '0.25rem' }} tag="span">{labelText}:</Element>
		    <Normaltekst tag="span">{valueText}</Normaltekst>
	    </div>
    );
};

import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './system-melding.less';

interface SystemMeldingProps {
	tekst: string;
}

export const SystemMelding = (props: SystemMeldingProps) => {
    return (
    	<div className="system-melding">
		    <span className="system-melding__seperator" />
		    <Normaltekst className="system-melding__tekst">{props.tekst}</Normaltekst>
		    <span className="system-melding__seperator" />
	    </div>
    );
};

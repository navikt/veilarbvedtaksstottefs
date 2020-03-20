import React from 'react';
import cls from 'classnames';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { formatTime } from '../../../../../utils/date-utils';
import './melding.less';
import { OrNothing } from '../../../../../utils/types/ornothing';
import { MeldingBar } from './melding-bar';

export enum SkrevetAv {
	MEG = 'MEG',
	ANNEN = 'ANNEN',
	SYSTEM = 'SYSTEM'
}

interface DialogMeldingProps {
	tekst: string;
	dato: string;
	skrevetAvNavn: OrNothing<string>;
	skrevetAv: SkrevetAv;
}

export const Melding = (props: DialogMeldingProps) => {
	const { tekst, dato, skrevetAv, skrevetAvNavn } = props;

	const meldingClasses = {
		'melding--fra-meg': skrevetAv === SkrevetAv.MEG,
		'melding--til-meg': skrevetAv === SkrevetAv.ANNEN,
		'melding--system': skrevetAv === SkrevetAv.SYSTEM
	};

	const meldingBarClasses = {
		'melding-bar--fra-meg': skrevetAv === SkrevetAv.MEG,
		'melding-bar--til-meg': skrevetAv === SkrevetAv.ANNEN,
	};

	const navn = skrevetAv === SkrevetAv.ANNEN ? skrevetAvNavn : '';

    return (
    	<div className={cls('melding', meldingClasses)}>
		    <div className="melding__metadata">
			    <Element className="melding__metadata-navn">{navn}</Element>
		        <EtikettLiten>{`${formatTime(dato)}`}</EtikettLiten>
		    </div>
		    <div className="melding__tekst-wrapper">
			    <MeldingBar className={cls(meldingBarClasses)} />
			    <Normaltekst className="melding__tekst">{tekst}</Normaltekst>
		    </div>
	    </div>
    );
};

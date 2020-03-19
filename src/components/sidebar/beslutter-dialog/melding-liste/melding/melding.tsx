import React from 'react';
import cls from 'classnames';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { formatDateTime } from '../../../../../utils/date-utils';
import './melding.less';
import { OrNothing } from '../../../../../utils/types/ornothing';

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

	const classes = {
		'melding--fra-meg': skrevetAv === SkrevetAv.MEG,
		'melding--til-meg': skrevetAv === SkrevetAv.ANNEN,
		'melding--system': skrevetAv === SkrevetAv.SYSTEM
	};

	const navn = skrevetAv === SkrevetAv.ANNEN ? skrevetAvNavn : '';

    return (
    	<div className={cls('melding', classes)}>
		    <EtikettLiten>{`${formatDateTime(dato)} ${navn}`}</EtikettLiten>
		    <Normaltekst>{tekst}</Normaltekst>
	    </div>
    );
};

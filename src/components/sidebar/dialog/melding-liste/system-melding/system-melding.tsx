import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './system-melding.less';
import { SystemMeldingType } from '../../../../../utils/types/melding-type';

interface SystemMeldingProps {
	systemMeldingType: SystemMeldingType;
	utfortAvNavn: string;
}

export const SystemMelding = (props: SystemMeldingProps) => {
	const utfortAvNavn = props.utfortAvNavn as string;

	function lagSystemMelding() {

		      switch (props.systemMeldingType) {
		     	   case SystemMeldingType.BESLUTTER_PROSESS_STARTET :
		     	   		return 'Utkast klar for beslutter';
		     	   case SystemMeldingType.BLITT_BESLUTTER :
		     	   		return `${utfortAvNavn} er beslutter`;
		     	   case SystemMeldingType.TATT_OVER_SOM_BESLUTTER :
		     	   		return `${utfortAvNavn} er ny beslutter`;
		     	   case SystemMeldingType.TATT_OVER_SOM_VEILEDER :
		     	   		return `${utfortAvNavn} er ny ansvarlig veileder`;
		     	   case SystemMeldingType.BESLUTTER_HAR_GODKJENT :
		     	   		return `Kvalifisert av ${utfortAvNavn}`;
		     	   case SystemMeldingType.UTKAST_OPPRETTET :
		     	   		return  `${utfortAvNavn} opprettet utkast`;
		     	   default :
		     	   		return '';
			 }
	}

    return (
    	<div className="system-melding">
		    <span className="system-melding__seperator" />
		    <Normaltekst className="system-melding__tekst">{lagSystemMelding()}</Normaltekst>
		    <span className="system-melding__seperator" />
	    </div>
    );
};

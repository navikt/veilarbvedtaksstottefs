import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './system-melding.less';
import { SystemMeldingType } from '../../../../../rest/data/dialog-melding';
import { OrNothing } from '../../../../../utils/types/ornothing';

interface SystemMeldingProps {
	meldingtype: string;
	utfortAvNavn: string;
}

export const SystemMelding = (props: SystemMeldingProps) => {

	const meldingtype = SystemMeldingType[props.meldingtype as SystemMeldingType];
	const utfortAvNavn = props.utfortAvNavn as string;

	function lagSystemMelding() {

		      switch (meldingtype) {
		     	   case SystemMeldingType.BESLUTTER_PROSESS_STARTET :
		     	   		return 'Utkast klar for beslutter';
		     	   case SystemMeldingType.BLI_BESLUTTER :
		     	   		return `${utfortAvNavn} er beslutter`;
		     	   case SystemMeldingType.TA_OVER_SOM_BESLUTTER :
		     	   		return `${utfortAvNavn} er ny beslutter`;
		     	   case SystemMeldingType.TA_OVER_SOM_VEILEDER :
		     	   		return `${utfortAvNavn} er ny ansvarlig veileder`;
		     	   case SystemMeldingType.GODSKJENT_AV_BESLUTTER :
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

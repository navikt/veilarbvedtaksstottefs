import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './system-melding.less';
import { MeldingUnderType } from '../../../../../utils/types/dialog-melding-type';
import { OrNothing } from '../../../../../utils/types/ornothing';

interface SystemMeldingProps {
	meldingtype: OrNothing<MeldingUnderType>;
	utfortAvNavn: string;
}

export const SystemMelding = (props: SystemMeldingProps) => {

	const meldingUnderType = MeldingUnderType[props.meldingtype as MeldingUnderType];
	const utfortAvNavn = props.utfortAvNavn as string;

	function lagSystemMelding() {

		      switch (meldingUnderType) {
		     	   case MeldingUnderType.BESLUTTER_PROSESS_STARTET :
		     	   		return 'Utkast klar for beslutter';
		     	   case MeldingUnderType.BLI_BESLUTTER :
		     	   		return `${utfortAvNavn} er beslutter`;
		     	   case MeldingUnderType.TA_OVER_SOM_BESLUTTER :
		     	   		return `${utfortAvNavn} er ny beslutter`;
		     	   case MeldingUnderType.TA_OVER_SOM_VEILEDER :
		     	   		return `${utfortAvNavn} er ny ansvarlig veileder`;
		     	   case MeldingUnderType.GODSKJENT_AV_BESLUTTER :
		     	   		return `Kvalifisert av ${utfortAvNavn}`;
		     	   case MeldingUnderType.UTKAST_OPPRETTET :
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

import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { SystemMeldingType } from '../../../../utils/types/melding-type';
import './system-melding.less';

interface SystemMeldingProps {
	systemMeldingType: SystemMeldingType;
	utfortAvNavn: string;
}

function lagSystemMelding(type: SystemMeldingType, utfortAvNavn: string) {
	switch (type) {
		case SystemMeldingType.BESLUTTER_PROSESS_STARTET :
			return 'Beslutterprosess startet';
		case SystemMeldingType.BLITT_BESLUTTER :
			return <span><strong>{utfortAvNavn}</strong> er beslutter</span>;
		case SystemMeldingType.TATT_OVER_SOM_BESLUTTER :
			return <span><strong>{utfortAvNavn}</strong> er ny beslutter</span>;
		case SystemMeldingType.TATT_OVER_SOM_VEILEDER :
			return <span><strong>{utfortAvNavn}</strong> er ny ansvarlig veileder</span>;
		case SystemMeldingType.BESLUTTER_HAR_GODKJENT :
			return <span>Kvalitetsikret av <strong>{utfortAvNavn}</strong></span>;
		case SystemMeldingType.UTKAST_OPPRETTET :
			return <span><strong>{utfortAvNavn}</strong> opprettet utkast</span>;
		default :
			return null;
	}
}

export const SystemMelding = (props: SystemMeldingProps) => {
	const { systemMeldingType, utfortAvNavn } = props;
	return (
		<div className="system-melding">
			<span className="system-melding__seperator"/>
			<Normaltekst className="system-melding__tekst">{lagSystemMelding(systemMeldingType, utfortAvNavn)}</Normaltekst>
			<span className="system-melding__seperator"/>
		</div>
	);
};

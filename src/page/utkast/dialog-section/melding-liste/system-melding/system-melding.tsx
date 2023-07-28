import { Normaltekst } from 'nav-frontend-typografi';
import { SystemMeldingType } from '../../../../../util/type/melding-type';
import './system-melding.less';

interface SystemMeldingProps {
	systemMeldingType: SystemMeldingType;
	utfortAvNavn: string;
}

function lagSystemMelding(type: SystemMeldingType, utfortAvNavn: string) {
	switch (type) {
		case SystemMeldingType.BESLUTTER_PROSESS_STARTET:
			return 'Kvalitetssikring startet';
		case SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT:
			return 'Kvalitetssikring avbrutt';
		case SystemMeldingType.BLITT_BESLUTTER:
			return (
				<span>
					<strong>{utfortAvNavn}</strong> er kvalitetssikrer
				</span>
			);
		case SystemMeldingType.TATT_OVER_SOM_BESLUTTER:
			return (
				<span>
					<strong>{utfortAvNavn}</strong> er ny kvalitetssikrer
				</span>
			);
		case SystemMeldingType.TATT_OVER_SOM_VEILEDER:
			return (
				<span>
					<strong>{utfortAvNavn}</strong> er ny ansvarlig veileder
				</span>
			);
		case SystemMeldingType.BESLUTTER_HAR_GODKJENT:
			return (
				<span>
					Kvalitetsikret av <strong>{utfortAvNavn}</strong>
				</span>
			);
		case SystemMeldingType.UTKAST_OPPRETTET:
			return (
				<span>
					<strong>{utfortAvNavn}</strong> opprettet utkast
				</span>
			);
		case SystemMeldingType.SENDT_TIL_VEILEDER:
			return 'Trenger respons fra veileder';
		case SystemMeldingType.SENDT_TIL_BESLUTTER:
			return 'Trenger tilbakemelding fra kvalitetssikrer';
		default:
			return null;
	}
}

export const SystemMelding = (props: SystemMeldingProps) => {
	const { systemMeldingType, utfortAvNavn } = props;
	return (
		<div className="system-melding">
			<span className="system-melding__seperator" />
			<Normaltekst className="system-melding__tekst">
				{lagSystemMelding(systemMeldingType, utfortAvNavn)}
			</Normaltekst>
			<span className="system-melding__seperator" />
		</div>
	);
};

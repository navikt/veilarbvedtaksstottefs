import { useVarselStore } from '../../store/varsel-store';
import { VarselToast } from './varsel-toast';
import {
	VarselConfig,
	tattOverSomBeslutter,
	tattOverSomVeileder,
	utkastOppdatert,
	vedtakSendt,
	beslutterprosessTilVeileder,
	beslutterprosessTilBeslutter,
	beslutterprosessGodkjent
} from './varsel-config';
import { VarselType } from './varsel-type';

export function VarselController() {
	const { varselType, hideVarsel } = useVarselStore();

	if (!varselType) {
		return null;
	}

	const { type, tekst } = varselConfig(varselType);

	return (
		<VarselToast type={type} durationMs={6000} onHide={hideVarsel}>
			{tekst}
		</VarselToast>
	);
}

function varselConfig(varselType: VarselType): VarselConfig {
	switch (varselType) {
		case VarselType.TATT_OVER_SOM_VEILEDER:
			return tattOverSomVeileder;
		case VarselType.TATT_OVER_SOM_BESLUTTER:
			return tattOverSomBeslutter;
		case VarselType.VEDTAK_SENT_SUKSESS:
			return vedtakSendt;
		case VarselType.UTKAST_OPPDATERT:
			return utkastOppdatert;
		case VarselType.BESLUTTERPROSESS_TIL_VEILEDER:
			return beslutterprosessTilVeileder;
		case VarselType.BESLUTTERPROSESS_TIL_BESLUTTER:
			return beslutterprosessTilBeslutter;
		case VarselType.BESLUTTERPROSESS_GODKJENT:
			return beslutterprosessGodkjent;
	}
}

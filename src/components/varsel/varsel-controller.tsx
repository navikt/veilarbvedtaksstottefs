import React from 'react';
import { useVarselStore } from '../../stores/varsel-store';
import { VarselToast } from './varsel-toast';
import { tattOverSomBeslutter, tattOverSomVeileder, VarselConfig, vedtakSendt } from './varsel-config';
import { VarselType } from './varsel-type';

export function VarselController() {
	const { varselType, hideVarsel} = useVarselStore();

	if (!varselType) {
		return null;
	}

	const {type, tekst} = varselConfig(varselType);

	return (
		<VarselToast type={type} durationMs={4000} onHide={hideVarsel}>
			{tekst}
		</VarselToast>
	);
}

function varselConfig(varselType: VarselType): VarselConfig  {
	switch (varselType) {
		case VarselType.TATT_OVER_SOM_VEILEDER:
			return tattOverSomVeileder;
		case VarselType.TATT_OVER_SOM_BESLUTTER:
			return tattOverSomBeslutter;
		case VarselType.VEDTAK_SENT_SUKSESS:
			return vedtakSendt;
	}
}

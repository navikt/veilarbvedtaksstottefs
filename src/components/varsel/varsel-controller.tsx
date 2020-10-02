import React from 'react';
import { useVarselStore, VarselType } from '../../stores/varsel-store';
import { VarselToast } from './varsel-toast';
import { VarselConfig, vedtakSendt } from './varsel-config';

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
		case VarselType.VEDTAK_SENT_SUKSESS:
			return vedtakSendt;
	}
}

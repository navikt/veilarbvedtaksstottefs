import { useState } from 'react';
import constate from 'constate';
import { VarselType } from '../component/varsel/varsel-type';

export const [VarselStoreProvider, useVarselStore] = constate(() => {
	const [varselType, setVarselType] = useState<VarselType | null>(null);

	const showVarsel = (type: VarselType) => {
		setVarselType(type);
	};

	const hideVarsel = () => {
		setVarselType(null);
	};

	return { varselType, showVarsel, hideVarsel };
});

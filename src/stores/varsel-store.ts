import { useState } from 'react';
import constate from 'constate';

export enum VarselType {
	VEDTAK_SENT_SUKSESS = 'VEDTAK_SENT_SUKSESS'
}

export const [VarselStoreProvider, useVarselStore] = constate(() => {
	const [varselType, setVarselType] = useState<VarselType | null>(null);

	const showVarsel = (type: VarselType, props: object = {}) => {
		setVarselType(type);
	};

	const hideVarsel = () => {
		setVarselType(null);
	};

	return { varselType, showVarsel, hideVarsel };
});

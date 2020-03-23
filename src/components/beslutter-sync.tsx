import { useFetchStore } from '../stores/fetch-store';
import { useEffect } from 'react';
import { hasFinishedWithData } from '../rest/utils';
import { finnUtkast } from '../utils';
import { useBeslutterStore } from '../stores/beslutter-store';

export function BeslutterSync() {
	const {vedtak} = useFetchStore();
	const {setBeslutterProsessStartet, setHarBeslutter} = useBeslutterStore();

	useEffect(() => {
		if (hasFinishedWithData(vedtak)) {
			const utkast = finnUtkast(vedtak.data);

			if (!utkast) {
				return;
			}

			setBeslutterProsessStartet(utkast.beslutterProsessStartet);
			setHarBeslutter(utkast.beslutterIdent !== null && utkast.beslutterIdent !== undefined);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vedtak.status]);

	return null;
}

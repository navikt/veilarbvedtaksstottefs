import { useFetchStore } from '../stores/fetch-store';
import { useEffect } from 'react';
import { hasFinishedWithData } from '../rest/utils';
import { useDialogStore } from '../stores/dialog-store';

export function DialogMeldingerSync() {
	const { setDialoger } = useDialogStore();
	const {dialogerMeldinger} = useFetchStore();

	useEffect(() => {
		if (hasFinishedWithData(dialogerMeldinger)) {
			setDialoger(dialogerMeldinger.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dialogerMeldinger.status]);

	return null;
}

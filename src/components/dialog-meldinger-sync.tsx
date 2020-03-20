import { useFetchStore } from '../stores/fetch-store';
import { useEffect } from 'react';
import { hasFinishedWithData } from '../rest/utils';
import { useDialogStore } from '../stores/dialog-store';

export function DialogMeldingerSync() {
	const { setMeldinger } = useDialogStore();
	const {dialogerMeldinger} = useFetchStore();

	useEffect(() => {
		if (hasFinishedWithData(dialogerMeldinger)) {
			setMeldinger(dialogerMeldinger.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dialogerMeldinger.status]);

	return null;
}

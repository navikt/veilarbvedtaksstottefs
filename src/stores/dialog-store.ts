import { useState } from 'react';
import createUseContext from 'constate';
import { DialogMelding } from '../rest/data/dialog-melding';

export const useDialogStore = createUseContext(() => {
	const [dialoger, setDialoger] = useState<DialogMelding[]>([]);

	return { dialoger, setDialoger };
});

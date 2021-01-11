import constate from 'constate';
import { useState } from 'react';

export const [DialogSectionHeightProvider, useDialogSectionHeight] = constate(() => {
	const [dialogSectionHeight, setDialogSectionHeight] = useState<number | undefined>();
	return { dialogSectionHeight, setDialogSectionHeight };
});

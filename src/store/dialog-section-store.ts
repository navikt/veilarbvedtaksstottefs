import constate from 'constate';
import { useState } from 'react';

export const [DialogSectionProvider, useDialogSection] = constate(() => {
	const [showSection, setShowSection] = useState<boolean | null>(null);
	const [harLastetMeldinger, setHarLastetMeldinger] = useState(false);
	const [harNyeMeldinger, setHarNyeMeldinger] = useState(false);

	return {
		showSection,
		setShowSection,
		harLastetMeldinger,
		setHarLastetMeldinger,
		harNyeMeldinger,
		setHarNyeMeldinger
	};
});

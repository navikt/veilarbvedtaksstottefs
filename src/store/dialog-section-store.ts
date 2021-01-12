import constate from 'constate';
import { useState } from 'react';

export const [DialogSectionProvider, useDialogSection] = constate(() => {
	const [sectionHeight, setSectionHeight] = useState<number | undefined>();
	const [showSection, setShowSection] = useState(false);
	const [harLastetMeldinger, setHarLastetMeldinger] = useState(false);
	const [harNyeMeldinger, setHarNyeMeldinger] = useState(false);

	return {
		sectionHeight,
		setSectionHeight,
		showSection,
		setShowSection,
		harLastetMeldinger,
		setHarLastetMeldinger,
		harNyeMeldinger,
		setHarNyeMeldinger
	};
});

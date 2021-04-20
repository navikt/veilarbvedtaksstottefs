import constate from 'constate';
import { useState } from 'react';
import { OrNothing } from '../util/type/ornothing';

export const [DialogSectionProvider, useDialogSection] = constate(() => {
	const [sectionHeight, setSectionHeight] = useState<number | undefined>();
	const [showSection, setShowSection] = useState(false);
	const [harLastetMeldinger, setHarLastetMeldinger] = useState(false);
	const [harNyeMeldinger, setHarNyeMeldinger] = useState(false);
	const [harSjekketInnsatsgruppe, setHarSjekketInnsatsgruppe] = useState<OrNothing<string>>(null);

	return {
		sectionHeight,
		setSectionHeight,
		showSection,
		setShowSection,
		harLastetMeldinger,
		setHarLastetMeldinger,
		harNyeMeldinger,
		setHarNyeMeldinger,
		harSjekketInnsatsgruppe,
		setHarSjekketInnsatsgruppe
	};
});

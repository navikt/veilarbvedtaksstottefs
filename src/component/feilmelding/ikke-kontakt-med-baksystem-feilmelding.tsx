import { Alert } from '@navikt/ds-react';

export const IkkeKontaktMedBaksystemFeilmelding = () => {
	return (
		<Alert variant="error">
			Vi får ikke kontakt med alle baksystemene, prøv igjen senere. Gjerne meld sak i Porten om problemet varer
			lenge.
		</Alert>
	);
};

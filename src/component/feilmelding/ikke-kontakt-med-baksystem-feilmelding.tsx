import { Alert } from '@navikt/ds-react';

export const IkkeKontaktMedBaksystemFeilmelding = () => {
	return (
		<Alert variant="error">
			Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
			senere.
		</Alert>
	);
};

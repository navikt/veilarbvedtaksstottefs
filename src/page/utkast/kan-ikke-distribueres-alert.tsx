import { Alert, Link } from '@navikt/ds-react';

export const KanIkkeDistribueresAlert = ({ kanDistribueres }: { kanDistribueres: boolean | null }) =>
	kanDistribueres ? null : (
		<Alert variant="warning" id="kan-ikke-distribueres-alert">
			Brukeren kan ikke varsles om vedtaket fordi vi ikke finner adresse eller telefonnummer. Forsøk å få brukeren
			til å registrere kontaktinformasjon før du sender ut vedtaket. <br /> Se{' '}
			<Link href="https://www.nav.no/kontaktinformasjon" target="_blank" rel="noopener noreferrer">
				nav.no/kontaktinformasjon
			</Link>
			.
		</Alert>
	);

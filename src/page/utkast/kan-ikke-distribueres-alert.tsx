import { Alert, Link } from '@navikt/ds-react';

export const KanIkkeDistribueresAlert = ({ kanDistribueres }: { kanDistribueres: boolean }) =>
	kanDistribueres ? null : (
		<Alert variant="warning" id="kan-ikke-distribueres-alert">
			Brukeren kan ikke varsles om vedtaket fordi vi ikke finner adresse eller telefonnummer. Forsøk å få brukeren
			til å registrere kontakinformasjon før du sender ut vedtaket. <br /> Se{' '}
			<Link href="https://www.nav.no/kontaktinformasjon">nav.no/kontaktinformasjon</Link>.
		</Alert>
	);

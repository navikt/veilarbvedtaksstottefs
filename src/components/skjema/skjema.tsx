import React from 'react';
import Opplysninger from '../../components/skjema/opplysninger/opplysninger';
import Hovedmal from '../../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../../components/skjema/begrunnelse/begrunnelse';

function Skjema() {
	return (
		<form>
			<Opplysninger />
			<Begrunnelse />
			<Innsatsgruppe />
			<Hovedmal />
		</form>
	);
}

export default Skjema;

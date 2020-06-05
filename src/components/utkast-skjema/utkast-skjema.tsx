import React from 'react';
import Opplysninger from './opplysninger/opplysninger';
import Hovedmal from './hovedmal/hovedmal';
import Innsatsgruppe from './innsatsgruppe/innsatsgruppe';
import Begrunnelse from './begrunnelse/begrunnelse';
import './utkast-skjema.less';

function UtkastSkjema() {
	return (
		<div className="utkast-skjema">
			<form className="utkast-skjema__form">
				<Opplysninger />
				<Begrunnelse />
				<Innsatsgruppe />
				<Hovedmal />
			</form>
		</div>
	);
}

export default UtkastSkjema;

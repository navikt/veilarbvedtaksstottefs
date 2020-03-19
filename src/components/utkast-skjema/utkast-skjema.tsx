import React from 'react';
import Opplysninger from './opplysninger/opplysninger';
import Hovedmal from './hovedmal/hovedmal';
import Innsatsgruppe from './innsatsgruppe/innsatsgruppe';
import Begrunnelse from './begrunnelse/begrunnelse';
import { Malform } from './malform/malform';
import { Sidebar } from '../sidebar/sidebar';
import './utkast-skjema.less';

function UtkastSkjema() {
	return (
		<div className="utkast-skjema">
			<form className="utkast-skjema__form">
				<Malform />
				<Opplysninger />
				<Begrunnelse />
				<Innsatsgruppe />
				<Hovedmal />
			</form>
			<Sidebar />
		</div>
	);
}

export default UtkastSkjema;

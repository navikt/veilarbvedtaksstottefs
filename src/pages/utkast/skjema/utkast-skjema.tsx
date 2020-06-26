import React from 'react';
import SkjemaHeader from './header/skjema-header';
import { Vedtak } from '../../../rest/data/vedtak';
import './utkast-skjema.less';

interface UtkastSkjemaProps {
	utkast: Vedtak;
	sistOppdatert?: string;
	children: React.ReactNode;
}

function UtkastSkjema(props: UtkastSkjemaProps) {
	return (
		<div className="utkast-skjema">
			<SkjemaHeader utkast={props.utkast as Vedtak} sistOppdatert={props.sistOppdatert} />
			<div className="utkast-skjema__innhold">
				{props.children}
			</div>
		</div>
	);
}

export default UtkastSkjema;

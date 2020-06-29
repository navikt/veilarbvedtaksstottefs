import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './legg-til-opplysning.less';

interface LeggTilOpplysningProps {
	leggTilOpplysning: () => void;
}

export function LeggTilOpplysning(props: LeggTilOpplysningProps) {
	return (
		<button
			className="legg-til-kilde"
			onClick={props.leggTilOpplysning}
			aria-describedby="legg-til-kilde-tekst"
		>
			<div className="legg-til-kilde__ikon" />
			<Normaltekst id="legg-til-kilde-tekst" tag="span" className="legg-til-kilde__tekst">
				Legg til andre kilder
			</Normaltekst>
		</button>
	);
}

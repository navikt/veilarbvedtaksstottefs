import * as React from 'react';
import leggTilIkon from './pluss.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import './legg-til-opplysning.less';

interface LeggTilOpplysningProps {
	disabled: boolean;
	leggTilOpplysning: () => void;
}

export function LeggTilOpplysning(props: LeggTilOpplysningProps) {
	return (
		<button
			className="legg-til-kilde"
			onClick={props.leggTilOpplysning}
			aria-describedby="legg-til-kilde-tekst"
			disabled={props.disabled}
		>
			<img src={leggTilIkon} alt="" className="legg-til-kilde__ikon" />
			<Normaltekst id="legg-til-kilde-tekst" tag="span" className="legg-til-kilde__tekst">
				Legg til andre kilder
			</Normaltekst>
		</button>
	);
}

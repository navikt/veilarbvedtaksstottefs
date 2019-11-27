import * as React from 'react';
import leggTilIkon from './pluss.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import './legg-til-opplysning.less';

export function LeggTilOpplysning(props: { leggTilOpplysning: () => void }) {
	return (
		<button
			className="legg-til-kilde"
			onClick={props.leggTilOpplysning}
			aria-describedby="legg-til-kilde-tekst"
		>
			<img src={leggTilIkon} alt="" className="legg-til-kilde__ikon" />
			<Normaltekst id="legg-til-kilde-tekst" tag="span" className="legg-til-kilde__tekst">
				Legg til andre kilder
			</Normaltekst>
		</button>
	);
}

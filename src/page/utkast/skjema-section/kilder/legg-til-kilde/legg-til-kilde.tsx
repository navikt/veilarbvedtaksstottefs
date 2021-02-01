import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './legg-til-kilde.less';

interface LeggTilKildeProps {
	leggTilKilde: () => void;
}

export function LeggTilKilde(props: LeggTilKildeProps) {
	return (
		<button className="legg-til-kilde" onClick={props.leggTilKilde} aria-describedby="legg-til-kilde-tekst">
			<div className="legg-til-kilde__ikon" />
			<Normaltekst id="legg-til-kilde-tekst" tag="span" className="legg-til-kilde__tekst">
				Legg til andre kilder
			</Normaltekst>
		</button>
	);
}

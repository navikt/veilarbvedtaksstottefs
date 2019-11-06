import React from 'react';
import { HjelpetekstPanel } from '../hjelpetekst-panel/hjelpetekst-panel';
import { Normaltekst } from 'nav-frontend-typografi';

export function OpplysningerHjelpetekster() {
	return (
		<div className="opplysninger-hjelpetekst-panel-wrapper">
			<HjelpetekstPanel navn="kilder" headerTekst="Tips">
				<Normaltekst>For andre kilder kan du for eksempel skrive:</Normaltekst>
				<ul className="opplysning-hjelpetekster__liste">
					<li>
						Referat fra møte med veilederen din
						<br />
						1. januar 20xx
					</li>
					<li>
						Dialogmeldinger i aktivitetsplanen fra
						<br />
						1. til 20. februar 20xx
					</li>
					<li>
						Sluttrapporten fra Tiltaksarrangør AS
						<br />
						1. september 20xx
					</li>
					<li>Legeerklæringen 1. november 20xx</li>
				</ul>
			</HjelpetekstPanel>
		</div>
	);
}

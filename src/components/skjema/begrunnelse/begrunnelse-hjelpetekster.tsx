import { Normaltekst } from 'nav-frontend-typografi';
import { HjelpetekstPanel } from '../hjelpetekst-panel/hjelpetekst-panel';
import React from 'react';

export function BegrunnelseHjelpetekster() {
	return (
		<HjelpetekstPanel navn="begrunnelse" headerTekst="Tips">
			<Normaltekst>Spørsmål som kan være til nytte når du skal gjøre vurderingen din:</Normaltekst>
			<ul className="begrunnelse-hjelpetekster__liste">
				<li>Hva tenker denne personen selv om mulighetene sine til å være eller komme i jobb?</li>
				<li>Hvilke typer arbeid ønsker denne personen seg og hva er realistisk ut fra dagens arbeidsmarked?</li>
				<li>Hva slags veiledning trenger denne personen?</li>
				<li>Er arbeidsevnen nedsatt, og hvorfor?</li>
				<li>
					Trenger denne personen:
					<ul>
						<li>yrkes- og/eller karriereveiledning?</li>
						<li>arbeidsrettede aktiviteter og tiltak?</li>
						<li>behandling eller oppfølging fra helsevesenet?</li>
					</ul>
				</li>
				<li>Hva har dere blitt enige om?</li>
			</ul>
		</HjelpetekstPanel>
	);
}

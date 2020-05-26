import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

export const BegrunnelseTipsInnhold = () => {
	return (
		<>
			<Undertittel className="blokk-xs">Begrunnelse</Undertittel>
			<Normaltekst>
				Begrunnelse må skrives for alle innsatsgrupper, bortsett fra standard innsats.
				Når du skal skrive begrunnelse og gjøre vurderingen din, er følgende spørsmål nyttige å stille:
			</Normaltekst>
			<ul className="tips__liste">
				<li>Hva tenker denne personen selv om mulighetene sine til å være eller komme i jobb?</li>
				<li>Hvilke typer arbeid ønsker denne personen seg og hva er realistisk ut fra dagens arbeidsmarked?</li>
				<li>Hva slags veiledning trenger denne personen?</li>
				<li>Er arbeidsevnen nedsatt, og hvorfor?</li>
				<li>
					Trenger denne personen:
					<ul className="tips__sub-liste">
						<li>yrkes- og/eller karriereveiledning?</li>
						<li>arbeidsrettede aktiviteter og tiltak?</li>
						<li>behandling eller oppfølging fra helsevesenet?</li>
					</ul>
				</li>
				<li>Hva har dere blitt enige om?</li>
			</ul>
		</>
	);
};

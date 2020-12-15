import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

export const InnsatsgruppeTipsInnhold = () => {
	return (
		<>
			<Undertittel className="blokk-xs">Innsatsgruppe</Undertittel>
			<Normaltekst>Innsatsbegrepene er nye - her ser du de gamle:</Normaltekst>
			<ul className="tips__liste">
				<li>gode muligheter - standardinnsats</li>
				<li>trenger veiledning - situasjonsbestemt innsats</li>
				<li>trenger veiledning, nedsatt arbeidsevne - spesielt tilpasset innsats</li>
				<li>liten mulighet til å jobbe - varig tilpasset innsats</li>
				<li>jobbe delvis - delvis, varig tilpasset innsats</li>
			</ul>
		</>
	);
};

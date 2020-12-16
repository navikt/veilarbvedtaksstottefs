import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

export const DialogTipsInnhold = () => {
	return (
		<>
			<Undertittel className="blokk-xs">Kollegaveiledning</Undertittel>
			<Normaltekst>
				Når du vurderer at bruker har liten mulighet til å jobbe eller bare kan jobbe delvis, skal vurderingen
				din kvalitetssikres. Hensikten er at du får tilbakemeldinger på skjønnsvurderingene du har gjort og at
				konklusjonen blir riktig.
			</Normaltekst>
		</>
	);
};

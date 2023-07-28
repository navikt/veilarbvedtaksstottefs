import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

export const DialogTipsInnhold = () => {
	return (
		<>
			<Undertittel className="blokk-xs">Kvalitetssikring</Undertittel>
			<Normaltekst className="blokk-xxs">
				Når du vurderer at bruker har liten mulighet til å jobbe eller bare kan jobbe delvis, skal vurderingen
				din kvalitetssikres. Hensikten er at du får tilbakemeldinger på skjønnsvurderingene du har gjort og at
				konklusjonen blir riktig.
			</Normaltekst>

			<Normaltekst>
				Dialogen kan gjøres tilgjengelig i behandling av klager og innsynsbegjæringer. Når vedtaket er fattet
				vil ikke dialogen være synlig i løsningen.
			</Normaltekst>
		</>
	);
};

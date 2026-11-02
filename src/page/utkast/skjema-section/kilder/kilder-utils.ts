// Oppdaterer valgene i én kildegruppe uten å endre valgene i den andre.
// Beholder rekkefølgen på eksisterende valg og legger nye valg sist.
export function oppdaterKildevalg(
	valgteKilder: string[],
	nyeValgteKilder: string[],
	erKildeIGruppe: (kilde: string) => boolean
): string[] {
	return [
		...valgteKilder.filter(kilde => !erKildeIGruppe(kilde) || nyeValgteKilder.includes(kilde)),
		...nyeValgteKilder.filter(kilde => !valgteKilder.includes(kilde))
	];
}

import { OrNothing } from '../util/type/ornothing';
import { HovedmalType, InnsatsgruppeType } from '../api/veilarbvedtaksstotte';

export function lagMockArenabrevUrl() {
	return '/test-brev/arenabrev.pdf';
}

export function lagMockVedtaksbrevUrl(
	innsatsgruppe: OrNothing<InnsatsgruppeType>,
	hovedmal: OrNothing<HovedmalType>
): string {
	const basePath = '/test-brev/';

	if (!innsatsgruppe) {
		// Default brev
		return (
			basePath +
			mapInnsatsgruppeOgHovedmalTilTestbrevNavn(InnsatsgruppeType.STANDARD_INNSATS, HovedmalType.SKAFFE_ARBEID)
		);
	}

	return basePath + mapInnsatsgruppeOgHovedmalTilTestbrevNavn(innsatsgruppe, hovedmal);
}

function mapInnsatsgruppeOgHovedmalTilTestbrevNavn(
	innsatsgruppe: InnsatsgruppeType,
	hovedmal: OrNothing<HovedmalType>
): string {
	if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
		return InnsatsgruppeType.VARIG_TILPASSET_INNSATS + '.pdf';
	}

	return `${innsatsgruppe}-${hovedmal}.pdf`;
}

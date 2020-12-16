import { OrNothing } from '../util/type/ornothing';
import { HovedmalType, InnsatsgruppeType } from '../api/veilarbvedtaksstotte';

export function lagVedtakBrevMockUrl(innsatsgruppe: InnsatsgruppeType, hovedmal: OrNothing<HovedmalType>): string {
	if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
		return `/test-brev/${InnsatsgruppeType.VARIG_TILPASSET_INNSATS}.pdf`;
	}

	return `/test-brev/${innsatsgruppe}-${hovedmal}.pdf`;
}

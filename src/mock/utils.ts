import { OrNothing } from '../util/type/ornothing';
import { HovedmalType, InnsatsgruppeType } from '../api/veilarbvedtaksstotte';

export function lagVedtakBrevMockUrl(innsatsgruppe: InnsatsgruppeType, hovedmal: OrNothing<HovedmalType>): string {
	let url = `${mockUrlPrefix()}/test-brev/`;

	if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
		url += `${innsatsgruppe}.pdf`;
	} else {
		url += `${innsatsgruppe}-${hovedmal}.pdf`;
	}

	return url;
}

export function mockUrlPrefix(): string {
	return import.meta.env.BASE_URL.replace(/\/$/, '');
}

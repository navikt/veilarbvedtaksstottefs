import { OrNothing } from '../util/type/ornothing';
import { HovedmalType, InnsatsgruppeType } from '../api/veilarbvedtaksstotte';

export function lagVedtakBrevMockUrl(innsatsgruppe: InnsatsgruppeType, hovedmal: OrNothing<HovedmalType>): string {
	let url = `${mockUrlPrefix()}/test-brev/`;

	if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
		url += `${InnsatsgruppeType.VARIG_TILPASSET_INNSATS}.pdf`;
	} else {
		url += `${innsatsgruppe}-${hovedmal}.pdf`;
	}

	return url;
}

function isRunningOnGhPages(): boolean {
	return window.location.hostname === 'navikt.github.io';
}

export function mockUrlPrefix(): string {
	return isRunningOnGhPages() ? '/veilarbvedtaksstottefs' : '';
}

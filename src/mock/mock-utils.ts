import FetchMock, { MockHandler, HttpMethod } from 'yet-another-fetch-mock';
import { HovedmalType, InnsatsgruppeType } from '../rest/data/vedtak';
import { OrNothing } from '../utils/types/ornothing';

export interface Mock {
	method: HttpMethod,
	url: string;
	handler: MockHandler
}

export function addToFetchMock(mock: Mock, fetchMock: FetchMock) {
	switch (mock.method) {
		case 'POST':
			fetchMock.post(mock.url, mock.handler);
			break;
		case 'DELETE':
			fetchMock.delete(mock.url, mock.handler);
			break;
		case 'PUT':
			fetchMock.put(mock.url, mock.handler);
			break;
		default:
			fetchMock.get(mock.url, mock.handler);
			break;
	}
}

export function lagMockArenabrevUrl() {
	return '/veilarbvedtaksstottefs/test-brev/arenabrev.pdf';
}

export function lagMockVedtaksbrevUrl(innsatsgruppe: OrNothing<InnsatsgruppeType>, hovedmal: OrNothing<HovedmalType>): string {
	const basePath = '/veilarbvedtaksstottefs/test-brev/';

	if (!innsatsgruppe) {
		// Default brev
		return basePath + mapInnsatsgruppeOgHovedmalTilTestbrevNavn(InnsatsgruppeType.STANDARD_INNSATS, HovedmalType.SKAFFE_ARBEID);
	}

	return basePath + mapInnsatsgruppeOgHovedmalTilTestbrevNavn(innsatsgruppe, hovedmal);
}

function mapInnsatsgruppeOgHovedmalTilTestbrevNavn(innsatsgruppe: InnsatsgruppeType, hovedmal: OrNothing<HovedmalType>): string {
	if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
		return InnsatsgruppeType.VARIG_TILPASSET_INNSATS + '.pdf';
	}

	return `${innsatsgruppe}-${hovedmal}.pdf`;
}

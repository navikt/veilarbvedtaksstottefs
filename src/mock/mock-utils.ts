import FetchMock, { HandlerArgument, HttpMethod, ResponseData } from 'yet-another-fetch-mock';
import env from '../utils/environment';
import { vedtaksbrevUrlHeroku, vedtaksBrevUrlLokal } from './konstanter';

export interface Mock {
	method: HttpMethod,
	url: string;
	handler: (args: HandlerArgument) => Promise<ResponseData>
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

export function getMockVedtaksbrevUrl() {
	return env.isRunningOnHeroku ? vedtaksbrevUrlHeroku : vedtaksBrevUrlLokal;
}

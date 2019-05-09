import vedtak from './vedtak';
import historisk from './historisk-vedtak';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/veilarbvedtaksstotte/api/00123456789/vedtak').reply(200, [vedtak, ...historisk]);
mock.onPut('/veilarbvedtaksstotte/api/00123456789/utkast').reply(204);
mock.onPost('/veilarbvedtaksstotte/api/00123456789/vedtak/send').reply(204);
mock.onPost('/veilarbvedtaksstotte/api/00123456789/utkast').reply(204);

export default mock;

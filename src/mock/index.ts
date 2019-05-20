import vedtak from './vedtak';
import historisk from './historisk-vedtak';
import vedlegg from './opplysninger';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import features from './features';

const mock = new MockAdapter(axios);

mock.onGet(/\/veilarbpersonflatefs\/api\/feature\/.*/).reply(200, features);
mock.onGet(/\/veilarbvedtaksstotte\/api\/\d+\/opplysninger\/\d+/).reply(200, vedlegg);
mock.onGet('/veilarbvedtaksstotte/api/00123456789/vedtak').reply(200, [vedtak, ...historisk]);
mock.onPut('/veilarbvedtaksstotte/api/00123456789/utkast').reply(204);
mock.onDelete('/veilarbvedtaksstotte/api/00123456789/utkast').reply(204);
mock.onPost('/veilarbvedtaksstotte/api/00123456789/vedtak/send').reply(204);
mock.onPost('/veilarbvedtaksstotte/api/00123456789/utkast').reply(204);

export default mock;

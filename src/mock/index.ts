import Vedtak from './vedtak';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/veilarbvedtaksstotte/api/vedtak/00123456789/utkast').reply(204);
mock.onPut('/veilarbvedtaksstotte/api/vedtak/00123456789').reply(204);
mock.onPost('/veilarbvedtaksstotte/api/vedtak/00123456789/send?').reply(204);

export default mock;
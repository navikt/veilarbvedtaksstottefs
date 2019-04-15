import Vedtak from './vedtak';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/veilarbvedtaksstotte/api/vedtak?fnr=00123456789').reply(200, Vedtak);
mock.onPut('/veilarbvedtaksstotte/api/vedtak?fnr=00123456789').reply(204);
mock.onPost('/veilarbvedtaksstotte/api/vedtak/send?').reply(204);

export default mock;
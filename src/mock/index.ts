import vedtak from './vedtak';
import utkast from './utkast';
import historisk from './historisk-vedtak';
import vedlegg from './oyblikksbilder';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import features from './features';
import underOppfolging from './under-oppfolging';
import tilgangTilBrukersKontor from './tilgang-til-brukers-kontor';
import malform from './malform';

const mock = new MockAdapter(axios);

mock.onGet(/\/veilarbpersonflatefs\/api\/feature\/.*/).reply(200, features);
mock.onGet(/\/veilarbvedtaksstotte\/api\/\d+\/oyblikksbilde\/\d+/).reply(200, vedlegg);
mock.onGet(/\/veilarboppfolging\/api\/oppfolging\/veilederTilgang\?fnr=\d+/).reply(200, tilgangTilBrukersKontor);
mock.onGet(/\/veilarboppfolging\/api\/underoppfolging\?fnr=\d+/).reply(200, underOppfolging);
mock.onGet(/\/veilarbperson\/api\/person\/\d+\/malform/).reply(200, malform);
mock.onGet('/veilarbvedtaksstotte/api/00123456789/vedtak').reply(200, [utkast, vedtak, ...historisk]);
mock.onPut('/veilarbvedtaksstotte/api/00123456789/utkast').reply(204);
mock.onDelete('/veilarbvedtaksstotte/api/00123456789/utkast').reply(204);
mock.onPost('/veilarbvedtaksstotte/api/00123456789/vedtak/send').reply(204);
mock.onPost('/veilarbvedtaksstotte/api/00123456789/utkast').reply(204);

export default mock;

import vedtak from './data/vedtak';
import utkast from './data/utkast';
import historisk from './data/historisk-vedtak';
import vedlegg from './data/oyblikksbilder';
import features from './data/features';
import underOppfolging from './data/under-oppfolging';
import tilgangTilBrukersKontor from './data/tilgang-til-brukers-kontor';
import malform from './data/malform';
import FetchMock, { JSONArray, MiddlewareUtils, ResponseUtils } from 'yet-another-fetch-mock';

// Use this when you need to mock different status codes
// @ts-ignore
// eslint-disable-next-line
// const failureMock = FetchMock.configure({
//     enableFallback: true,
//     middleware: MiddlewareUtils.combine(
//         MiddlewareUtils.failurerateMiddleware(1, { status: 403 }),
//         MiddlewareUtils.delayMiddleware(404),
//         MiddlewareUtils.loggingMiddleware()
//     )
// });

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get('/veilarbpersonflatefs/api/feature', features);
mock.get('/veilarbvedtaksstotte/api/:fnr/oyblikksbilde/:vedtakId', vedlegg);
mock.get(`/veilarboppfolging/api/oppfolging/veilederTilgang`, tilgangTilBrukersKontor);
mock.get('/veilarboppfolging/api/underoppfolging', underOppfolging);
mock.get('/veilarbperson/api/person/:fnr/malform', malform);
mock.get('/veilarbvedtaksstotte/api/:fnr/vedtak', [utkast, vedtak, ...historisk] as JSONArray);
mock.put('/veilarbvedtaksstotte/api/:fnr/utkast', ResponseUtils.statusCode(204));
mock.delete('/veilarbvedtaksstotte/api/:fnr/utkast', ResponseUtils.statusCode(204));
mock.post('/veilarbvedtaksstotte/api/:fnr/vedtak/send', ResponseUtils.statusCode(204));
mock.post('/veilarbvedtaksstotte/api/:fnr/utkast', ResponseUtils.statusCode(204));

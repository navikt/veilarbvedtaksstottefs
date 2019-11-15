import vedlegg from './api-data/oyblikksbilder';
import features from './api-data/features';
import underOppfolging from './api-data/under-oppfolging';
import tilgangTilBrukersKontor from './api-data/tilgang-til-brukers-kontor';
import malform from './api-data/malform';
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import veiledere from './api-data/veiledere';
import {
	mockHentVedtak,
	mockLagUtkast,
	mockOppdaterUtkast,
	mockSendTilBeslutter, mockSendVedtak,
	mockSlettUtkast
} from './vedtak-mock';
import { addToFetchMock } from './mock-utils';

const fetchMock = FetchMock.configure({
	enableFallback: true,
	middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware())
});

addToFetchMock(mockHentVedtak, fetchMock);
addToFetchMock(mockOppdaterUtkast, fetchMock);
addToFetchMock(mockSlettUtkast, fetchMock);
addToFetchMock(mockLagUtkast, fetchMock);
addToFetchMock(mockSendTilBeslutter, fetchMock);
addToFetchMock(mockSendVedtak, fetchMock);

fetchMock.get('/veilarbvedtaksstotte/api/:fnr/oyblikksbilde/:vedtakId', vedlegg);
fetchMock.get('/veilarbpersonflatefs/api/feature', features);
fetchMock.get('/veilarboppfolging/api/oppfolging/veilederTilgang', tilgangTilBrukersKontor);
fetchMock.get('/veilarboppfolging/api/underoppfolging', underOppfolging);
fetchMock.get('/veilarbperson/api/person/:fnr/malform', malform);
fetchMock.get('/veilarbveileder/api/enhet/:enhetId/veiledere', veiledere);

import vedlegg from './api-data/oyblikksbilder';
import features from './api-data/features';
import oppfolgingData from './api-data/oppfolging-data';
import tilgangTilBrukersKontor from './api-data/tilgang-til-brukers-kontor';
import malform from './api-data/malform';
import vedtakFraArena from './api-data/arena-vedtak';
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import {
	mockHentVedtak,
	mockLagUtkast,
	mockOppdaterUtkast,
	mockOvertaUtkast,
	mockSendVedtak,
	mockSlettUtkast,
	mockKlarTilBeslutter,
	mockBliBeslutter,
	mockGodkjennVedtak, mockOppdaterBeslutterProsessStatus
} from './vedtak-mock';
import { addToFetchMock } from './mock-utils';
import { mockHentDialoger, mockSendDialogMelding } from './dialoger-meldinger-mock';
import { innloggetVeileder } from './api-data/innlogget-veileder';

const fetchMock = FetchMock.configure({
	enableFallback: true,
	middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware())
});

addToFetchMock(mockHentVedtak, fetchMock);
addToFetchMock(mockOppdaterUtkast, fetchMock);
addToFetchMock(mockSlettUtkast, fetchMock);
addToFetchMock(mockLagUtkast, fetchMock);
addToFetchMock(mockSendVedtak, fetchMock);
addToFetchMock(mockOvertaUtkast, fetchMock);
addToFetchMock(mockKlarTilBeslutter, fetchMock);
addToFetchMock(mockBliBeslutter, fetchMock);
addToFetchMock(mockGodkjennVedtak, fetchMock);
addToFetchMock(mockHentDialoger, fetchMock);
addToFetchMock(mockSendDialogMelding, fetchMock);
addToFetchMock(mockOppdaterBeslutterProsessStatus, fetchMock);

fetchMock.get('/veilarbvedtaksstotte/api/:fnr/vedtakFraArena', vedtakFraArena);
fetchMock.get('/veilarbvedtaksstotte/api/:fnr/oyblikksbilde/:vedtakId', vedlegg);
fetchMock.get('/veilarbpersonflatefs/api/feature', features);
fetchMock.get('/veilarboppfolging/api/oppfolging/veilederTilgang', tilgangTilBrukersKontor);
fetchMock.get('/veilarboppfolging/api/oppfolging', oppfolgingData);
fetchMock.get('/veilarbperson/api/person/:fnr/malform', malform);
fetchMock.get('/veilarbveileder/api/veileder/me', innloggetVeileder);

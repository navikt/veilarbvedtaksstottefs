import vedlegg from './api-data/oyblikksbilder';
import features from './api-data/features';
import oppfolgingData from './api-data/oppfolging-data';
import tilgangTilBrukersKontor from './api-data/tilgang-til-brukers-kontor';
import malform from './api-data/malform';
import vedtakFraArena from './api-data/arena-vedtak';
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import {
	mockBliBeslutter,
	mockFattVedtak,
	mockGodkjennVedtak,
	mockHentFattedeVedtak,
	mockHentUtkast,
	mockLagUtkast,
	mockOppdaterBeslutterProsessStatus,
	mockOppdaterUtkast,
	mockOvertaUtkast,
	mockSlettUtkast,
	mockStartBeslutterprosess
} from './vedtak-mock';
import { addToFetchMock } from './mock-utils';
import { mockHentDialoger, mockSendDialogMelding } from './meldinger-mock';
import { innloggetVeileder } from './api-data/innlogget-veileder';

const fetchMock = FetchMock.configure({
	enableFallback: true,
	middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware())
});

addToFetchMock(mockHentUtkast, fetchMock);
addToFetchMock(mockHentFattedeVedtak, fetchMock);
addToFetchMock(mockOppdaterUtkast, fetchMock);
addToFetchMock(mockSlettUtkast, fetchMock);
addToFetchMock(mockLagUtkast, fetchMock);
addToFetchMock(mockFattVedtak, fetchMock);
addToFetchMock(mockOvertaUtkast, fetchMock);
addToFetchMock(mockStartBeslutterprosess, fetchMock);
addToFetchMock(mockBliBeslutter, fetchMock);
addToFetchMock(mockGodkjennVedtak, fetchMock);
addToFetchMock(mockHentDialoger, fetchMock);
addToFetchMock(mockSendDialogMelding, fetchMock);
addToFetchMock(mockOppdaterBeslutterProsessStatus, fetchMock);

fetchMock.get('/veilarbvedtaksstotte/api/vedtak/arena', vedtakFraArena);
fetchMock.get('/veilarbvedtaksstotte/api/vedtak/:vedtakId/oyeblikksbilde', vedlegg);
fetchMock.get('/veilarbpersonflatefs/api/feature', features);
fetchMock.get('/veilarboppfolging/api/oppfolging/veilederTilgang', tilgangTilBrukersKontor);
fetchMock.get('/veilarboppfolging/api/oppfolging', oppfolgingData);
fetchMock.get('/veilarbperson/api/person/:fnr/malform', malform);
fetchMock.get('/veilarbveileder/api/veileder/me', innloggetVeileder);

import vedlegg from './api-data/oyblikksbilder';
import features from './api-data/features';
import oppfolgingData from './api-data/oppfolging-data';
import tilgangTilBrukersKontor from './api-data/tilgang-til-brukers-kontor';
import malform from './api-data/malform';
import vedtakFraArena from './api-data/arena-vedtak';
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import {
	mockBliBeslutter,
	mockErUtkastGodkjent,
	mockFattVedtak,
	mockGodkjennVedtak,
	mockHentFattedeVedtak,
	mockHentUtkast,
	mockLagUtkast,
	mockOppdaterBeslutterProsessStatus,
	mockOppdaterUtkast,
	mockOvertaUtkast,
	mockSlettUtkast,
	mockStartBeslutterprosess,
	mockAvbrytBeslutterprosess
} from './vedtak-mock';
import { addToFetchMock } from './mock-utils';
import { mockHentDialoger, mockSendDialogMelding } from './meldinger-mock';
import { innloggetVeileder } from './api-data/innlogget-veileder';
import { MockHandler } from 'yet-another-fetch-mock/dist/types/types';

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
addToFetchMock(mockErUtkastGodkjent, fetchMock);
addToFetchMock(mockStartBeslutterprosess, fetchMock);
addToFetchMock(mockAvbrytBeslutterprosess, fetchMock);
addToFetchMock(mockBliBeslutter, fetchMock);
addToFetchMock(mockGodkjennVedtak, fetchMock);
addToFetchMock(mockHentDialoger, fetchMock);
addToFetchMock(mockSendDialogMelding, fetchMock);
addToFetchMock(mockOppdaterBeslutterProsessStatus, fetchMock);

fetchMock.get('/veilarbvedtaksstotte/api/vedtak/arena', jsonResponse(vedtakFraArena));
fetchMock.get('/veilarbvedtaksstotte/api/vedtak/:vedtakId/oyeblikksbilde', jsonResponse(vedlegg));
fetchMock.get('/veilarbpersonflatefs/api/feature', jsonResponse(features));
fetchMock.get('/veilarboppfolging/api/oppfolging/veilederTilgang', jsonResponse(tilgangTilBrukersKontor));
fetchMock.get('/veilarboppfolging/api/oppfolging', jsonResponse(oppfolgingData));
fetchMock.get('/veilarbperson/api/person/:fnr/malform', jsonResponse(malform));
fetchMock.get('/veilarbveileder/api/veileder/me', jsonResponse(innloggetVeileder));

function jsonResponse(value: any): MockHandler {
	return (req, res, ctx) => res(ctx.json(value));
}

import { BeslutterProsessStatus, VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { hentInnloggetVeileder, hentUtkast, leggTilMockSystemMelding, oppdaterUtkast } from '../../api-data';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from '../../index';

export const beslutterHandlers: RequestHandler[] = [
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/start`, async () => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		oppdaterUtkast({
			beslutterProsessStatus: BeslutterProsessStatus.KLAR_TIL_BESLUTTER
		});

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/avbryt`, async () => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å avbrute beslutterprosess på');

		oppdaterUtkast({
			beslutterProsessStatus: null,
			beslutterIdent: null,
			beslutterNavn: null
		});

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT);

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter`, async () => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å bli beslutter for');

		oppdaterUtkast({
			beslutterIdent: hentInnloggetVeileder().ident,
			beslutterNavn: hentInnloggetVeileder().navn
		});

		leggTilMockSystemMelding(SystemMeldingType.BLITT_BESLUTTER);

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/godkjenn`, async () => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å godkjenne');

		oppdaterUtkast({
			beslutterProsessStatus: BeslutterProsessStatus.GODKJENT_AV_BESLUTTER
		});

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_HAR_GODKJENT);

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	}),
	http.put(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/status`, async () => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å oppdatere status på');

		const erBeslutter = hentUtkast()?.beslutterIdent === hentInnloggetVeileder().ident;

		oppdaterUtkast({
			beslutterProsessStatus: erBeslutter
				? BeslutterProsessStatus.KLAR_TIL_VEILEDER
				: BeslutterProsessStatus.KLAR_TIL_BESLUTTER
		});

		leggTilMockSystemMelding(
			erBeslutter ? SystemMeldingType.SENDT_TIL_VEILEDER : SystemMeldingType.SENDT_TIL_BESLUTTER
		);

		await delay(DEFAULT_DELAY_MILLISECONDS);
		return new HttpResponse(null, { status: 204 });
	})
];

import { BeslutterProsessStatus, VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { rest } from 'msw';
import { leggTilMockSystemMelding, hentUtkast, oppdaterUtkast, hentInnloggetVeileder } from '../../api-data';

export const beslutterHandlers: RequestHandlersList = [
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/start`, (req, res, ctx) => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		oppdaterUtkast({
			beslutterProsessStatus: BeslutterProsessStatus.KLAR_TIL_BESLUTTER
		});

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/avbryt`, (req, res, ctx) => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å avbrute beslutterprosess på');

		oppdaterUtkast({
			beslutterProsessStatus: null,
			beslutterIdent: null,
			beslutterNavn: null
		});

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter`, (req, res, ctx) => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å bli beslutter for');

		oppdaterUtkast({
			beslutterIdent: hentInnloggetVeileder().ident,
			beslutterNavn: hentInnloggetVeileder().navn
		});

		leggTilMockSystemMelding(SystemMeldingType.BLITT_BESLUTTER);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/godkjenn`, (req, res, ctx) => {
		if (!hentUtkast()) throw new Error('Fant ikke utkast å godkjenne');

		oppdaterUtkast({
			beslutterProsessStatus: BeslutterProsessStatus.GODKJENT_AV_BESLUTTER
		});

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_HAR_GODKJENT);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.put(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/status`, (req, res, ctx) => {
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

		return res(ctx.delay(500), ctx.status(204));
	})
];

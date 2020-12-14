import { BeslutterProsessStatus, VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { rest } from 'msw';
import { leggTilMockSystemMelding } from './meldinger';
import { innloggetVeilederMock } from '../veilarbveileder';
import { vedtakUtkastMock } from './utkast';

export const beslutterHandlers: RequestHandlersList = [
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/start`, (req, res, ctx) => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		vedtakUtkastMock.beslutterProsessStatus = BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/avbryt`, (req, res, ctx) => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å avbrute beslutterprosess på');

		vedtakUtkastMock.beslutterProsessStatus = null;
		vedtakUtkastMock.beslutterIdent = null;
		vedtakUtkastMock.beslutterNavn = null;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter`, (req, res, ctx) => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å bli beslutter for');

		vedtakUtkastMock.beslutterIdent = innloggetVeilederMock.ident;
		vedtakUtkastMock.beslutterNavn = innloggetVeilederMock.navn;

		leggTilMockSystemMelding(SystemMeldingType.BLITT_BESLUTTER);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/godkjenn`, (req, res, ctx) => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å godkjenne');

		vedtakUtkastMock.beslutterProsessStatus = BeslutterProsessStatus.GODKJENT_AV_BESLUTTER;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_HAR_GODKJENT);

		return res(ctx.delay(500), ctx.status(204));
	}),
	rest.put(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/status`, (req, res, ctx) => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å oppdatere status på');

		const erBeslutter = vedtakUtkastMock.beslutterIdent === innloggetVeilederMock.ident;

		vedtakUtkastMock.beslutterProsessStatus = erBeslutter
			? BeslutterProsessStatus.KLAR_TIL_VEILEDER
			: BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

		leggTilMockSystemMelding(
			erBeslutter ? SystemMeldingType.SENDT_TIL_VEILEDER : SystemMeldingType.SENDT_TIL_BESLUTTER
		);

		return res(ctx.delay(500), ctx.status(204));
	})
];

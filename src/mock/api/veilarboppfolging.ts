import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import TilgangTilBrukersKontor from '../../util/type/tilgang-til-brukers-kontor';
import OppfolgingData from '../../api/veilarboppfolging';

const tilgangTilBrukersKontor: TilgangTilBrukersKontor = {
	tilgangTilBrukersKontor: true
};

const oppfolgingData: OppfolgingData = {
	reservasjonKRR: false,
	underOppfolging: true
};

export const veilarboppfolgingHandlers: RequestHandlersList = [
	rest.get('/veilarboppfolging/api/oppfolging/veilederTilgang', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(tilgangTilBrukersKontor));
	}),
	rest.get('/veilarboppfolging/api/oppfolging', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(oppfolgingData));
	})
];

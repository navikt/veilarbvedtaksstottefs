import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { hentInnloggetVeileder } from '../api-data';

export const veilarbveilederHandlers: RequestHandlersList = [
	rest.get('/veilarbveileder/api/veileder/me', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentInnloggetVeileder()));
	})
];

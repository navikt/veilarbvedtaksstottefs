import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { rest } from 'msw';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';

export const utrullingHandlers: RequestHandlersList = [
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/utrulling/tilhorerBrukerUtrulletKontor`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(true));
	})
];

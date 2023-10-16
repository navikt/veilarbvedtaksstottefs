import { RequestHandler, rest } from 'msw';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';

export const utrullingHandlers: RequestHandler[] = [
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/utrulling/hent-tilhorerBrukerUtrulletKontor`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(true));
	})
];

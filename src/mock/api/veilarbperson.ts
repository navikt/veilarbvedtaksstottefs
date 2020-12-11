import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { MalformData, MalformType } from '../../api/veilarbperson';

const malform: MalformData = {
	malform: MalformType.NB
};

export const veilarbpersonHandlers: RequestHandlersList = [
	rest.get('/veilarbperson/api/person/:fnr/malform', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(malform));
	})
];

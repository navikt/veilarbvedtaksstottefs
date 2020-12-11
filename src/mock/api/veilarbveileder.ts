import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { enhetId, enhetNavn, veileder1 } from '../data';
import { Veileder } from '../../api/veilarbveileder';

export let innloggetVeilederMock = {
	navn: veileder1.navn,
	ident: veileder1.ident,
	enhetId,
	enhetNavn
};

export function updateInnloggetVeilederMock(veileder: Veileder) {
	innloggetVeilederMock = {
		...innloggetVeilederMock,
		navn: veileder.navn,
		ident: veileder.ident
	};
}

export const veilarbveilederHandlers: RequestHandlersList = [
	rest.get('/veilarbveileder/api/veileder/me', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(innloggetVeilederMock));
	})
];

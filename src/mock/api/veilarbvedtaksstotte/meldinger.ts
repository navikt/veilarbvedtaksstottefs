import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { MeldingType } from '../../../util/type/melding-type';
import { DialogMelding } from '../../../api/veilarbvedtaksstotte/meldinger';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { hentInnloggetVeileder, hentMeldinger, leggTilMelding } from '../../api-data';

export const meldingerHandlers: RequestHandlersList = [
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/meldinger`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(hentMeldinger()));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/meldinger`, (req, res, ctx) => {
		const sendDialogData = req.body as { melding: string };

		const nyMelding: DialogMelding = {
			opprettet: new Date().toISOString(),
			opprettetAvIdent: hentInnloggetVeileder().ident,
			opprettetAvNavn: hentInnloggetVeileder().navn,
			melding: sendDialogData.melding,
			type: MeldingType.DIALOG_MELDING
		};

		leggTilMelding(nyMelding);

		return res(ctx.delay(500), ctx.json(hentMeldinger()));
	})
];

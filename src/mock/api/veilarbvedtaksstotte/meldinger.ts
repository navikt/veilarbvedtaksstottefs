import { RequestHandler, rest } from 'msw';
import { MeldingType } from '../../../util/type/melding-type';
import { DialogMelding } from '../../../api/veilarbvedtaksstotte/meldinger';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { hentInnloggetVeileder, hentMeldinger, leggTilMelding } from '../../api-data';

export const meldingerHandlers: RequestHandler[] = [
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/meldinger`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(400));
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

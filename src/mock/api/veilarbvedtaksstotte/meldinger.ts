import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { MeldingType } from '../../../util/type/melding-type';
import { DialogMelding } from '../../../api/veilarbvedtaksstotte/meldinger';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';
import { hentInnloggetVeileder, hentMeldinger, leggTilMelding } from '../../api-data';
import { DEFAULT_DELAY_MILLISECONDS } from '../../index';

export const meldingerHandlers: RequestHandler[] = [
	http.get(`${VEILARBVEDTAKSSTOTTE_API}/meldinger`, async () => {
		await delay(DEFAULT_DELAY_MILLISECONDS);
		return HttpResponse.json(hentMeldinger());
	}),
	http.post(`${VEILARBVEDTAKSSTOTTE_API}/meldinger`, async ({ request }) => {
		const sendDialogData = (await request.json()) as { melding: string };

		const nyMelding: DialogMelding = {
			opprettet: new Date().toISOString(),
			opprettetAvIdent: hentInnloggetVeileder().ident,
			opprettetAvNavn: hentInnloggetVeileder().navn,
			melding: sendDialogData.melding,
			type: MeldingType.DIALOG_MELDING
		};

		leggTilMelding(nyMelding);

		return HttpResponse.json(hentMeldinger());
	})
];

import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import meldinger from '../../api-data/meldinger';
import { MeldingType, SystemMeldingType } from '../../../util/type/melding-type';
import { DialogMelding, SystemMelding } from '../../../api/veilarbvedtaksstotte/meldinger';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/api';
import { innloggetVeilederMock } from '../veilarbveileder';

let mockMeldinger = [...meldinger];

export const fjernAlleMockMeldinger = () => {
	mockMeldinger = [];
};

export const leggTilMockSystemMelding = (systemMeldingType: SystemMeldingType) => {
	const nyMelding: SystemMelding = {
		opprettet: new Date().toISOString(),
		systemMeldingType,
		type: MeldingType.SYSTEM_MELDING,
		utfortAvIdent: innloggetVeilederMock.ident,
		utfortAvNavn: innloggetVeilederMock.navn
	};

	mockMeldinger.push(nyMelding);
};

export const veilarbvedtaksstotteMeldingerHandlers: RequestHandlersList = [
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/meldinger`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(mockMeldinger));
	}),
	rest.post(`${VEILARBVEDTAKSSTOTTE_API}/meldinger`, (req, res, ctx) => {
		const sendDialogData = req.body as { melding: string };

		const nyMelding: DialogMelding = {
			opprettet: new Date().toISOString(),
			opprettetAvIdent: innloggetVeilederMock.ident,
			opprettetAvNavn: innloggetVeilederMock.navn,
			melding: sendDialogData.melding,
			type: MeldingType.DIALOG_MELDING
		};

		mockMeldinger.push(nyMelding);

		return res(ctx.delay(500), ctx.json(mockMeldinger));
	})
];

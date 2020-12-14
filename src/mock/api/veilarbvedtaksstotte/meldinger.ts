import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { MeldingType, SystemMeldingType } from '../../../util/type/melding-type';
import { DialogMelding, SystemMelding } from '../../../api/veilarbvedtaksstotte/meldinger';
import { innloggetVeilederMock } from '../veilarbveileder';
import { veileder3 } from '../../data';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/veilarbvedtaksstotte';

const dialogMeldinger: DialogMelding[] = [
	{
		melding: 'Kan du sjekke om alt ser greit ut?',
		opprettet: '2020-02-05T09:47:13.716393+02:00',
		opprettetAvIdent: innloggetVeilederMock.ident,
		opprettetAvNavn: innloggetVeilederMock.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Kanskje du burde skrive litt mer utfyllende i begrunnelsen. Ellers så ser det bra ut :)',
		opprettet: '2020-02-06T12:37:44.716393+02:00',
		opprettetAvIdent: veileder3.ident,
		opprettetAvNavn: veileder3.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Den er grei',
		opprettet: '2020-02-08T14:23:12.716393+02:00',
		opprettetAvIdent: innloggetVeilederMock.ident,
		opprettetAvNavn: innloggetVeilederMock.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Wow, dette var en awsome nettside! https://navikt.github.io/veilarbvedtaksstottefs',
		opprettet: '2020-02-08T14:24:10.716393+02:00',
		opprettetAvIdent: innloggetVeilederMock.ident,
		opprettetAvNavn: innloggetVeilederMock.navn,
		type: MeldingType.DIALOG_MELDING
	}
];

const systemMeldinger: SystemMelding[] = [
	{
		systemMeldingType: SystemMeldingType.UTKAST_OPPRETTET,
		opprettet: '2020-02-05T09:47:01.716393+02:00',
		utfortAvIdent: innloggetVeilederMock.ident,
		utfortAvNavn: innloggetVeilederMock.navn,
		type: MeldingType.SYSTEM_MELDING
	},
	{
		systemMeldingType: SystemMeldingType.BLITT_BESLUTTER,
		opprettet: '2020-02-06T12:36:37.716393+02:00',
		utfortAvIdent: veileder3.ident,
		utfortAvNavn: veileder3.navn,
		type: MeldingType.SYSTEM_MELDING
	}
];

let mockMeldinger = [...dialogMeldinger, ...systemMeldinger];

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

export const meldingerHandlers: RequestHandlersList = [
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

import {Mock} from './mock-utils';
import {HandlerArgument, ResponseData} from 'yet-another-fetch-mock';
import {VEILARBVEDTAKSSTOTTE_API} from '../rest/api';
import meldinger from './api-data/meldinger';
import {DialogMelding} from '../rest/data/melding';
import {innloggetVeileder} from './api-data/innlogget-veileder';
import {MeldingType} from "../utils/types/melding-type";

const mockMeldinger = meldinger;

export const mockHentDialoger: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/dialog`,
	handler: async (): Promise<ResponseData> => {
		return { status: 200, body: JSON.stringify(mockMeldinger) };
	}
};

export const mockSendDialogMelding: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/dialog`,
	handler: async (args: HandlerArgument): Promise<ResponseData> => {
		const sendDialogData = args.body as { melding: string };
		const nyMelding: DialogMelding = {
			opprettet: new Date().toISOString(),
			opprettetAvIdent: innloggetVeileder.ident,
			opprettetAvNavn: innloggetVeileder.navn,
			melding: sendDialogData.melding,
			type: MeldingType.DIALOG_MELDING
		};

		mockMeldinger.push(nyMelding);

		return { status: 200 };
	}
};
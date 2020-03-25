import { Mock } from './mock-utils';
import { HandlerArgument, ResponseData } from 'yet-another-fetch-mock';
import { VEILARBVEDTAKSSTOTTE_API } from '../rest/api';
import dialogeMeldinger from './api-data/dialoger-meldinger';
import { DialogMelding } from '../rest/data/dialog-melding';
import { innloggetVeileder } from './api-data/innlogget-veileder';

const meldinger = dialogeMeldinger;

export const mockHentDialoger: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/dialog`,
	handler: async (): Promise<ResponseData> => {
		return { status: 200, body: JSON.stringify(meldinger) };
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
			melding: sendDialogData.melding
		};

		meldinger.push(nyMelding);

		return { status: 200 };
	}
};
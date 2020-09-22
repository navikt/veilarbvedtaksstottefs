import { Mock } from './mock-utils';
import { MockRequest, ResponseData } from 'yet-another-fetch-mock';
import { VEILARBVEDTAKSSTOTTE_API } from '../rest/api';
import meldinger from './api-data/meldinger';
import { DialogMelding, SystemMelding } from '../rest/data/melding';
import { innloggetVeileder } from './api-data/innlogget-veileder';
import { MeldingType, SystemMeldingType } from '../utils/types/melding-type';

let mockMeldinger = [...meldinger];

export const fjernAlleMockMeldinger = () => {
	mockMeldinger = [];
};

export const leggTilMockSystemMelding = (systemMeldingType: SystemMeldingType) => {
	const nyMelding: SystemMelding = {
		opprettet: new Date().toISOString(),
		systemMeldingType,
		type: MeldingType.SYSTEM_MELDING,
		utfortAvIdent: innloggetVeileder.ident,
		utfortAvNavn: innloggetVeileder.navn
	};

	mockMeldinger.push(nyMelding);
};

export const mockHentDialoger: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/meldinger`,
	handler: async (): Promise<ResponseData> => {
		return { status: 200, body: JSON.stringify(mockMeldinger) };
	}
};

export const mockSendDialogMelding: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/meldinger`,
	handler: async (args: MockRequest): Promise<ResponseData> => {
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

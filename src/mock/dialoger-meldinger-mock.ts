import { Mock } from './mock-utils';
import { ResponseData } from 'yet-another-fetch-mock';
import { VEILARBVEDTAKSSTOTTE_API } from '../rest/api';
import dialogeMeldinger from './api-data/dialoger-meldinger';

export const mockHentDialoger: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/:fnr/beslutter/melding`,
	handler: async (): Promise<ResponseData> => {
		return { status: 200, body: JSON.stringify(dialogeMeldinger) };
	}
};
import { Mock } from '../../utils';
import { VEILARBVEDTAKSSTOTTE_API } from '../../../api/api';
import { ResponseData } from 'yet-another-fetch-mock';
import historisk from '../../api-data/vedtak/tidligere-vedtak';
import { VedtakStatus } from '../../../api/veilarbvedtaksstotte';
import { vedtakUtkastMock } from '../../vedtak-mock';

const fattedeVedtak = historisk;

export const mockHentFattedeVedtak: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/vedtak/fattet`,
	handler: async (): Promise<ResponseData> => {
		return { body: JSON.stringify(fattedeVedtak) };
	}
};

export const mockFattVedtak: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/fattVedtak`,
	handler: async (): Promise<ResponseData> => {
		const gjeldendeVedtak = fattedeVedtak.find(v => v.gjeldende);

		if (gjeldendeVedtak) {
			gjeldendeVedtak.gjeldende = false;
		}

		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast til beslutter');

		const fattetVedtak = { ...vedtakUtkastMock };

		fattetVedtak.vedtakStatus = VedtakStatus.SENDT;
		fattetVedtak.gjeldende = true;
		fattetVedtak.dokumentInfoId = '123';
		fattetVedtak.journalpostId = '456';

		fattedeVedtak.push(fattetVedtak);
		vedtakUtkastMock = null;

		return { status: 204 };
	}
};

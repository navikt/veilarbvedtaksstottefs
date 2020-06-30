import createUseContext from 'constate';
import useFetch from '../rest/use-fetch';
import { lagHentMeldingerFetchInfo, VedtakIdFetchParams } from '../rest/api';
import { DialogMelding, SystemMelding } from '../rest/data/melding';

export const useDataFetcherStore = createUseContext(() => {
	const meldingFetcher = useFetch<Array<DialogMelding | SystemMelding>, VedtakIdFetchParams>(lagHentMeldingerFetchInfo);

	return {
		meldingFetcher
	};
});

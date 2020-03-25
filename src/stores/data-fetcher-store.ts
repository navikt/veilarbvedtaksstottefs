import createUseContext from 'constate';
import useFetch from '../rest/use-fetch';
import {
	FnrFetchParams, lagHentArenaVedtakFetchInfo, lagHentDialogerFetchInfo,
	lagHentFeaturesFetchInfo,
	lagHentMalformFetchInfo,
	lagHentOppfolgingDataFetchInfo,
	lagHentVedtakFetchInfo,
	lagHentVeilederFetchInfo
} from '../rest/api';
import Oppfolging from '../rest/data/oppfolging-data';
import { MalformData } from '../rest/data/malform';
import { Features } from '../rest/data/features';
import { ArenaVedtak, Vedtak } from '../rest/data/vedtak';
import { Veileder } from '../rest/data/veiledere';
import { OrNothing } from '../utils/types/ornothing';
import { DialogMelding } from '../rest/data/dialog-melding';

export const useDataFetcherStore = createUseContext(() => {
	const oppfolgingDataFetcher = useFetch<Oppfolging, FnrFetchParams>(lagHentOppfolgingDataFetchInfo);
	const malformFetcher = useFetch<MalformData, FnrFetchParams>(lagHentMalformFetchInfo);
	const featuresFetcher = useFetch<Features>(lagHentFeaturesFetchInfo);
	const innloggetVeilederFetcher = useFetch<Veileder>(lagHentVeilederFetchInfo);
	const vedtakFetcher = useFetch<Vedtak[], FnrFetchParams>(lagHentVedtakFetchInfo);
	const arenaVedtakFetcher = useFetch<OrNothing<ArenaVedtak[]>, FnrFetchParams>(lagHentArenaVedtakFetchInfo);
	const dialogerMeldingerFetcher = useFetch<DialogMelding[], FnrFetchParams>(lagHentDialogerFetchInfo);

	return {
		oppfolgingDataFetcher, featuresFetcher,
		malformFetcher, vedtakFetcher,
		innloggetVeilederFetcher, arenaVedtakFetcher,
		dialogerMeldingerFetcher
	};
});

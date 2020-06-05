import createUseContext from 'constate';
import useFetch from '../rest/use-fetch';
import {
	FnrFetchParams,
	lagHentArenaVedtakFetchInfo,
	lagHentMeldingerFetchInfo,
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
import { DialogMelding, SystemMelding } from '../rest/data/melding';

export const useDataFetcherStore = createUseContext(() => {
	const oppfolgingDataFetcher = useFetch<Oppfolging, FnrFetchParams>(lagHentOppfolgingDataFetchInfo);
	const malformFetcher = useFetch<MalformData, FnrFetchParams>(lagHentMalformFetchInfo);
	const featuresFetcher = useFetch<Features>(lagHentFeaturesFetchInfo);
	const innloggetVeilederFetcher = useFetch<Veileder>(lagHentVeilederFetchInfo);
	const vedtakFetcher = useFetch<Vedtak[], FnrFetchParams>(lagHentVedtakFetchInfo);
	const arenaVedtakFetcher = useFetch<OrNothing<ArenaVedtak[]>, FnrFetchParams>(lagHentArenaVedtakFetchInfo);
	const meldingFetcher = useFetch<Array<DialogMelding | SystemMelding>, FnrFetchParams>(lagHentMeldingerFetchInfo);

	return {
		oppfolgingDataFetcher, featuresFetcher,
		malformFetcher, vedtakFetcher,
		innloggetVeilederFetcher, arenaVedtakFetcher,
		meldingFetcher
	};
});

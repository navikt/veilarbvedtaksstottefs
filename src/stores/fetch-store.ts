import createUseContext from 'constate';
import useFetch from '../rest/use-fetch';
import {
	FnrFetchParams,
	lagHentFeaturesFetchInfo,
	lagHentMalformFetchInfo,
	lagHentOppfolgingDataFetchInfo,
	lagHentVedtakFetchInfo,
	lagHentVeilederFetchInfo
} from '../rest/api';
import Oppfolging from '../rest/data/oppfolging-data';
import { MalformData } from '../rest/data/malform';
import { Features } from '../rest/data/features';
import { VedtakData } from '../rest/data/vedtak';
import { Veileder } from '../rest/data/veiledere';

export const useFetchStore = createUseContext(() => {
	const oppfolgingData = useFetch<Oppfolging, FnrFetchParams>(lagHentOppfolgingDataFetchInfo);
	const malform = useFetch<MalformData, FnrFetchParams>(lagHentMalformFetchInfo);
	const features = useFetch<Features>(lagHentFeaturesFetchInfo);
	const vedtak = useFetch<VedtakData[], FnrFetchParams>(lagHentVedtakFetchInfo);
	const innloggetVeileder = useFetch<Veileder>(lagHentVeilederFetchInfo);

	return { oppfolgingData, features, malform, vedtak, innloggetVeileder };
});

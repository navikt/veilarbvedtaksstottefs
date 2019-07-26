import createUseContext from 'constate';
import useFetch from '../rest/use-fetch';
import {
    FnrFetchParams,
    lagHentFeaturesFetchInfo,
    lagHentMalformFetchInfo,
    lagHentUnderOppfolgingFetchInfo, lagHentVedtakFetchInfo
} from '../rest/api';
import UnderOppfolging from '../rest/data/under-oppfolging';
import { MalformData } from '../rest/data/malform';
import { Features } from '../rest/data/features';
import { VedtakData } from '../rest/data/vedtak';

export const useFetchStore = createUseContext(() => {
    const underOppfolging = useFetch<UnderOppfolging, FnrFetchParams>(lagHentUnderOppfolgingFetchInfo);
    const malform = useFetch<MalformData, FnrFetchParams>(lagHentMalformFetchInfo);
    const features = useFetch<Features>(lagHentFeaturesFetchInfo);
    const vedtak = useFetch<VedtakData[], FnrFetchParams>(lagHentVedtakFetchInfo);

    return { underOppfolging, features, malform, vedtak };
});

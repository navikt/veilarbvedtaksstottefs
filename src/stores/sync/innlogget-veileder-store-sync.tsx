import { useEffect } from 'react';
import { hasFinishedWithData } from '../../rest/utils';
import { finnUtkast } from '../../utils';
import { useDataFetcherStore } from '../data-fetcher-store';
import { useInnloggetVeilederStore } from '../innlogget-veileder-store';
import { finnVeilederTilgang } from '../../utils/tilgang';

export function InnloggetVeilederStoreSync() {
    const { setInnloggetVeileder, setVeilederTilgang } = useInnloggetVeilederStore();
    const {vedtakFetcher, innloggetVeilederFetcher} = useDataFetcherStore();

    useEffect(() => {
        if (hasFinishedWithData(innloggetVeilederFetcher)) {
            setInnloggetVeileder(innloggetVeilederFetcher.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [innloggetVeilederFetcher.status]);

    useEffect(() => {
        if (hasFinishedWithData(vedtakFetcher) && hasFinishedWithData(innloggetVeilederFetcher)) {
            setVeilederTilgang(finnVeilederTilgang(innloggetVeilederFetcher.data, finnUtkast(vedtakFetcher.data)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vedtakFetcher.status, innloggetVeilederFetcher.status]);

    return null;
}

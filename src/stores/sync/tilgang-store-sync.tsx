import { useEffect } from 'react';
import { hasFinishedWithData } from '../../rest/utils';
import { finnUtkast } from '../../utils';
import { useDataFetcherStore } from '../data-fetcher-store';
import { useTilgangStore } from '../tilgang-store';
import { finnVeilederTilgang } from '../../utils/tilgang';

export function TilgangStoreSync() {
    const { setVeilederTilgang } = useTilgangStore();
    const {vedtakFetcher, innloggetVeilederFetcher} = useDataFetcherStore();

    useEffect(() => {
        if (hasFinishedWithData(vedtakFetcher) && hasFinishedWithData(innloggetVeilederFetcher)) {
            setVeilederTilgang(finnVeilederTilgang(innloggetVeilederFetcher.data, finnUtkast(vedtakFetcher.data)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vedtakFetcher.status, innloggetVeilederFetcher.status]);

    return null;
}

import { useEffect } from 'react';
import { hasFinishedWithData } from '../../rest/utils';
import { useDataFetcherStore } from '../data-fetcher-store';
import { useTilgangStore } from '../tilgang-store';
import { finnVeilederTilgang } from '../../utils/tilgang';

export function TilgangStoreSync() {
    const { setVeilederTilgang } = useTilgangStore();
    const {utkastFetcher, innloggetVeilederFetcher} = useDataFetcherStore();

    useEffect(() => {
        if (hasFinishedWithData(utkastFetcher) && hasFinishedWithData(innloggetVeilederFetcher)) {
            setVeilederTilgang(finnVeilederTilgang(innloggetVeilederFetcher.data, utkastFetcher.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [utkastFetcher.status, innloggetVeilederFetcher.status]);

    return null;
}

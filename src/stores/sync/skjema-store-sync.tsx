import { useDataFetcherStore } from '../data-fetcher-store';
import { useEffect } from 'react';
import { hasFinishedWithData } from '../../rest/utils';
import { useSkjemaStore } from '../skjema-store';
import { mapOpplysningerFraForskjelligMalformTilBokmal } from '../../utils/skjema-utils';

export function SkjemaStoreSync() {
    const {initSkjema} = useSkjemaStore();
    const {utkastFetcher} = useDataFetcherStore();

    useEffect(() => {
        if (hasFinishedWithData(utkastFetcher)) {
            const utkast = utkastFetcher.data;

            if (!utkast) {
                return;
            }

            const mappetOpplysninger = mapOpplysningerFraForskjelligMalformTilBokmal(utkast.opplysninger);
            const utkastKopi = {...utkast, opplysninger: mappetOpplysninger};

            initSkjema(utkastKopi);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [utkastFetcher.status]);

    return null;
}

import { useDataFetcherStore } from '../data-fetcher-store';
import { useEffect } from 'react';
import { hasFinishedWithData } from '../../rest/utils';
import { useSkjemaStore } from '../skjema-store';
import { mapOpplysningerFraForskjelligMalformTilBokmal } from '../../components/utkast-skjema/skjema-utils';
import { finnUtkast } from '../../utils';

export function SkjemaStoreSync() {
    const {initSkjema} = useSkjemaStore();
    const {vedtakFetcher} = useDataFetcherStore();

    useEffect(() => {
        if (hasFinishedWithData(vedtakFetcher)) {
            const utkast = finnUtkast(vedtakFetcher.data);

            if (!utkast) {
                return;
            }

            const mappetOpplysninger = mapOpplysningerFraForskjelligMalformTilBokmal(utkast.opplysninger);
            const utkastKopi = {...utkast, opplysninger: mappetOpplysninger};

            initSkjema(utkastKopi);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vedtakFetcher.status]);

    return null;
}

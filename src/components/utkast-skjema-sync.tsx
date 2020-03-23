import { useFetchStore } from '../stores/fetch-store';
import { useEffect } from 'react';
import { hasFinishedWithData } from '../rest/utils';
import { useSkjemaStore } from '../stores/skjema-store';
import { mapOpplysningerFraForskjelligMalformTilBokmal } from './skjema/skjema-utils';
import { finnUtkast } from '../utils';

export function UtkastSkjemaSync() {
    const {initSkjema} = useSkjemaStore();
    const {vedtak} = useFetchStore();

    useEffect(() => {
        if (hasFinishedWithData(vedtak)) {
            const utkast = finnUtkast(vedtak.data);

            if (!utkast) {
                return;
            }

            const mappetOpplysninger = mapOpplysningerFraForskjelligMalformTilBokmal(utkast.opplysninger);
            const utkastKopi = {...utkast, opplysninger: mappetOpplysninger};

            initSkjema(utkastKopi);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vedtak.status]);

    return null;
}

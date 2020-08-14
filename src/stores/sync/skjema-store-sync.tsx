import { useEffect } from 'react';
import { useSkjemaStore } from '../skjema-store';
import { mapOpplysningerFraForskjelligMalformTilBokmal } from '../../utils/skjema-utils';
import { useDataStore } from '../data-store';

export function SkjemaStoreSync() {
    const {initSkjema} = useSkjemaStore();
    const {utkast} = useDataStore();

    useEffect(() => {
            if (!utkast) {
                return;
            }
            const mappetOpplysninger = mapOpplysningerFraForskjelligMalformTilBokmal(utkast.opplysninger);
            const utkastKopi = {...utkast, opplysninger: mappetOpplysninger};

            initSkjema(utkastKopi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [utkast]);

    return null;
}

import { useFetchStore } from '../stores/fetch-store';
import { useEffect } from 'react';
import { hasFinishedWithData } from '../rest/utils';
import { useSkjemaStore } from '../stores/skjema-store';
import { mapOpplysningerFraForskjelligMalformTilBokmal } from './utkast-skjema/skjema-utils';
import { finnUtkast } from '../utils';

export function UtkastSkjemaSync() {
    const {initSkjema, setReadOnly} = useSkjemaStore();
    const {vedtak, innloggetVeileder} = useFetchStore();

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

    useEffect(() => {
        if (hasFinishedWithData(vedtak) && hasFinishedWithData(innloggetVeileder)) {
            const utkast = finnUtkast(vedtak.data);
            if (utkast) {
                setReadOnly(utkast.veilederIdent !== innloggetVeileder.data.ident);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vedtak.status, innloggetVeileder.status]);

    return null;
}

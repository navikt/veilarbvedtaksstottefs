import { useSkjemaTilgangStore } from '../stores/skjema-tilgang-store';
import { useEffect } from 'react';
import { hasFinishedWithData } from '../rest/utils';
import { finnUtkast } from '../utils';
import { useFetchStore } from '../stores/fetch-store';


export function SkjemaTilgangSync() {

    const { setErInnloggetAnsvarligVeileder, setErInnloggetVeilederBeslutter, setReadOnly } = useSkjemaTilgangStore();
    const {vedtak, innloggetVeileder} = useFetchStore();

    useEffect(() => {
        if (hasFinishedWithData(vedtak) && hasFinishedWithData(innloggetVeileder)) {
            const utkast = finnUtkast(vedtak.data);

            if (utkast) {
                setErInnloggetAnsvarligVeileder(utkast.veilederIdent === innloggetVeileder.data.ident);
                setReadOnly(utkast.veilederIdent !== innloggetVeileder.data.ident);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vedtak.status, innloggetVeileder.status]);

    useEffect(() => {
        if (hasFinishedWithData(vedtak) && hasFinishedWithData(innloggetVeileder)) {
            const utkast = finnUtkast(vedtak.data);

            if (utkast) {
                setErInnloggetVeilederBeslutter(utkast.beslutterIdent === innloggetVeileder.data.ident);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vedtak.status, innloggetVeileder.status]);

    return null;
}

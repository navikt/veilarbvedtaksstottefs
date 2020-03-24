import { useEffect } from 'react';
import { hasFinishedWithData } from '../rest/utils';
import { finnUtkast } from '../utils';
import { useFetchStore } from '../stores/fetch-store';
import { useInnloggetVeilederStore } from '../stores/innlogget-veileder-store';
import { finnVeilederTilgang } from '../utils/tilgang';

export function InnloggetVeilederSync() {
    const { setInnloggetVeileder, setVeilederTilgang } = useInnloggetVeilederStore();
    const {vedtak, innloggetVeileder} = useFetchStore();

    useEffect(() => {
        if (hasFinishedWithData(innloggetVeileder)) {
            setInnloggetVeileder(innloggetVeileder.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [innloggetVeileder.status]);

    useEffect(() => {
        if (hasFinishedWithData(vedtak) && hasFinishedWithData(innloggetVeileder)) {
            setVeilederTilgang(finnVeilederTilgang(innloggetVeileder.data, finnUtkast(vedtak.data)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vedtak.status, innloggetVeileder.status]);

    return null;
}

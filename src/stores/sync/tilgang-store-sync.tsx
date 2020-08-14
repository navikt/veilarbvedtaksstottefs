import { useEffect } from 'react';
import { useTilgangStore } from '../tilgang-store';
import { finnVeilederTilgang } from '../../utils/tilgang';
import { useDataStore } from '../data-store';

export function TilgangStoreSync() {
    const { setVeilederTilgang } = useTilgangStore();
    const { utkast, innloggetVeileder } = useDataStore();

    useEffect(() => {
        setVeilederTilgang(finnVeilederTilgang(innloggetVeileder, utkast));
        // eslint-disable-next-line
    }, [utkast, innloggetVeileder]);

    return null;
}

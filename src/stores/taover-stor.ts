import { useState } from 'react';
import createUseContext from 'constate';
import { OrNothing } from '../utils/types/ornothing';

export const useTaOverVedtakStore = createUseContext(() => {
    const [taOverFor, setTaOverFor] = useState<OrNothing<string>>(null);

    return {taOverFor, setTaOverFor};
});





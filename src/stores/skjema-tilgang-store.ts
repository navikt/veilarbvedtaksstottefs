import createUseContext from 'constate';
import { useState } from 'react';

export const useSkjemaTilgangStore =  createUseContext( () => {
    const [erInnloggetAnsvarligVeileder, setErInnloggetAnsvarligVeileder] = useState<boolean>(false);
    const [erInnloggetVeilederBeslutter, setErInnloggetVeilederBeslutter] = useState<boolean>(false);
    const [isReadOnly, setReadOnly] = useState<boolean>(true);

    return {
             erInnloggetAnsvarligVeileder, setErInnloggetAnsvarligVeileder,
             erInnloggetVeilederBeslutter, setErInnloggetVeilederBeslutter,
             isReadOnly, setReadOnly
    }
});
import { veileder1 } from '../veiledere-mock';
import { enhetId, enhetNavn } from '../konstanter';
import { Veileder } from '../../rest/data/veiledere';

export let innloggetVeileder =
    {
        navn: veileder1.navn,
        ident: veileder1.ident,
        enhetId,
        enhetNavn,
    };

export function updateInnloggetVeilederMock(veileder: Veileder) {
    innloggetVeileder = {
        ...innloggetVeileder,
        navn: veileder.navn,
        ident: veileder.ident
    };
}

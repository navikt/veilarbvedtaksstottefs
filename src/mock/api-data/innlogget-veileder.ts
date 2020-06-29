import { ansvarligVeileder } from '../personer';
import { enhetId, enhetNavn } from '../konstanter';
import { Veileder } from '../../rest/data/veiledere';

export let innloggetVeileder =
    {
        navn: ansvarligVeileder.navn,
        ident: ansvarligVeileder.ident,
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

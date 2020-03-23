import { Enhet, Veileder } from '../../rest/data/veiledere';
import { JSONObject } from 'yet-another-fetch-mock';
import { enhet } from '../konstanter';


const innloggetVeilederEnhetData: Enhet & JSONObject = {
    enhetId: enhet,
    navn: 'Oslo',
}

const innloggetVeileder: Veileder & JSONObject = {
    fornavn: 'Kari',
    etternavn: 'Asmund',
    navn: 'kari.asmund',
    ident: 'D150566'
}

export default innloggetVeileder;
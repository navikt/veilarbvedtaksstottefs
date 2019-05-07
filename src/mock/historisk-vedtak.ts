import  { InnsatsgruppeType } from '../components/skjema/innsatsgruppe/innsatsgruppe';
import { HovedmalType } from '../components/skjema/hovedmal/hovedmal';
import { VedtakData } from '../utils/types/vedtak';

const historisk: VedtakData = {
    id: 1,
    hovedmal: HovedmalType.BEHOLDE_ARBEID,
    innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
    vedtakStatus: 'UTKAST',
    sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
    begrunnelse: 'herps derps herps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derps',
    gjeldende: false,
    veileder: {
        ident: 'Z007',
        enhetId: '3666',
        enhetNavn: 'Gotham City',
    },
};
export default historisk;
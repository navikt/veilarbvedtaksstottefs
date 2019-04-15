import  { InnsatsgruppeType } from '../components/skjema/innsatsgruppe/innsatsgruppe';
import { HovedmalType } from '../components/skjema/hovedmal/hovedmal';
import { VedtakData } from '../utils/types/vedtak';

const vedtak: VedtakData = {
    id: 1,
    hovedmal: HovedmalType.BEHOLDE_ARBEID,
    innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
    vedtakStatus: 'UTKAST',
    sistOppdatert: '2019-09-14',
    begrunnelse: 'herps derps',
    veileder: {
        ident: 'Z007',
        enhetId: '3666',
        enhetNavn: 'Gotham City',
    },
};
export default vedtak;
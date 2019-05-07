import  { InnsatsgruppeType } from '../components/skjema/innsatsgruppe/innsatsgruppe';
import { HovedmalType } from '../components/skjema/hovedmal/hovedmal';
import { VedtakData } from '../utils/types/vedtak';

const historisk: VedtakData[] = [
    {
        id: 1,
        hovedmal: HovedmalType.BEHOLDE_ARBEID,
        innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
        vedtakStatus: 'SENDT',
        sistOppdatert: '2019-09-14',
        begrunnelse: 'herps derps herps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derps',
        gjeldende: false,
        veileder: {
            ident: 'Z007',
            enhetId: '3666',
            enhetNavn: 'Gotham City',
        },
    },
    {
        id: 2,
        hovedmal: HovedmalType.SKAFFE_ARBEID,
        innsatsgruppe: InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS,
        vedtakStatus: 'SENDT',
        sistOppdatert: '2018-03-06',
        begrunnelse: 'herp derp',
        gjeldende: false,
        veileder: {
            ident: 'Z007',
            enhetId: '3666',
            enhetNavn: 'Gotham City',
        },
    }
];
export default historisk;

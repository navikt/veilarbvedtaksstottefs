import { VedtakData } from '../utils/types/vedtak';
import { HovedmalType } from '../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../components/skjema/innsatsgruppe/innsatsgruppe';

const utkast: VedtakData = {
    id: 5,
    hovedmal: HovedmalType.BEHOLDE_ARBEID,
    innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
    vedtakStatus: 'UTKAST',
    sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
    begrunnelse: '',
    gjeldende: false,
    opplysninger: ['Møtestøtte'],
    veilederIdent: 'Z007',
    veilederEnhetId: 'Gotham city',
};

export default utkast;

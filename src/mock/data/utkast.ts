import { VedtakData } from '../../rest/data/vedtak';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import { JSONObject } from 'yet-another-fetch-mock';

const utkast: VedtakData & JSONObject = {
    id: 5,
    hovedmal: HovedmalType.BEHOLDE_ARBEID,
    innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
    vedtakStatus: 'UTKAST',
    sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
    begrunnelse: 'Test!!!!',
    gjeldende: false,
    opplysninger: ['Møtestøtte', 'Svarene dine fra da du registrerte deg', 'CV-en og jobbprofilen din'],
    veilederIdent: 'Z007',
    veilederEnhetId: '1337',
    veilederEnhetNavn: 'Gotham city'
};

export default utkast;

import  { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { VedtakData } from '../../rest/data/vedtak';
import { JSONObject } from 'yet-another-fetch-mock';

const vedtak: VedtakData & JSONObject = {
    id: 4,
    hovedmal: HovedmalType.BEHOLDE_ARBEID,
    innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
    vedtakStatus: 'SENDT',
    sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
    begrunnelse: 'herps derps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derps',
    gjeldende: true,
    opplysninger: [],
    veilederIdent: 'Z007',
    veilederEnhetId: '1337',
    veilederEnhetNavn: 'Gotham city',
    beslutter: null,
    dokumentInfoId: null,
    journalpostId: null
};
export default vedtak;

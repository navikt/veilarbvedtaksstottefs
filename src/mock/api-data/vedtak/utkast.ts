import { VedtakData } from '../../../rest/data/vedtak';
import { HovedmalType } from '../../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../../components/skjema/innsatsgruppe/innsatsgruppe';
import { JSONObject } from 'yet-another-fetch-mock';
import { innloggetVeileder } from '../innlogget-veileder';

const utkast: VedtakData & JSONObject = {
	id: 5,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS,
	vedtakStatus: 'UTKAST',
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: innloggetVeileder.navn,
	veilederIdent: innloggetVeileder.ident,
	veilederEnhetId: innloggetVeileder.enhetId,
	veilederEnhetNavn: innloggetVeileder.enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	beslutterNavn: null,
	dokumentInfoId: null,
	journalpostId: null,
	sendtTilBeslutter: false
};

export default utkast;

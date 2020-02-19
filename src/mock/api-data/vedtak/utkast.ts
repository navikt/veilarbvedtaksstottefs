import { HovedmalType, InnsatsgruppeType, VedtakData } from '../../../rest/data/vedtak';
import { JSONObject } from 'yet-another-fetch-mock';
import { ansvarligVeileder } from '../veiledere';

const utkast: VedtakData & JSONObject = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS,
	vedtakStatus: 'UTKAST',
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: ansvarligVeileder.navn,
	veilederIdent: ansvarligVeileder.ident,
	veilederEnhetId: ansvarligVeileder.enhetId,
	veilederEnhetNavn: ansvarligVeileder.enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	beslutterNavn: null,
	dokumentInfoId: null,
	journalpostId: null,
	sendtTilBeslutter: false
};

export default utkast;

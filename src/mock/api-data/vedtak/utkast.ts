import { HovedmalType, InnsatsgruppeType, Vedtak } from '../../../rest/data/vedtak';
import { JSONObject } from 'yet-another-fetch-mock';
import { ansvarligVeileder } from '../veiledere';

const utkast: Vedtak & JSONObject = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
	vedtakStatus: 'UTKAST',
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: ansvarligVeileder.navn,
	veilederIdent: ansvarligVeileder.ident,
	oppfolgingsenhetId: ansvarligVeileder.enhetId,
	oppfolgingsenhetNavn: ansvarligVeileder.enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	beslutterNavn: null,
	dokumentInfoId: null,
	journalpostId: null,
	sendtTilBeslutter: false
};

export default utkast;

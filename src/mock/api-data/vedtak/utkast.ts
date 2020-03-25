import { HovedmalType, InnsatsgruppeType, Vedtak } from '../../../rest/data/vedtak';
import { JSONObject } from 'yet-another-fetch-mock';
import { ansvarligVeileder, beslutter } from '../../personer';

const utkast: Vedtak & JSONObject = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
	vedtakStatus: 'UTKAST',
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: ansvarligVeileder.navn,
	veilederIdent: ansvarligVeileder.ident,
	oppfolgingsenhetId: ansvarligVeileder.enhetId,
	oppfolgingsenhetNavn: ansvarligVeileder.enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	dokumentInfoId: null,
	journalpostId: null,
	beslutterIdent: null,
	beslutterNavn: null,
	godkjentAvBeslutter: false,
	beslutterProsessStartet: false,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const utkastMedBeslutter: Vedtak & JSONObject = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
	vedtakStatus: 'UTKAST',
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: ansvarligVeileder.navn,
	veilederIdent: ansvarligVeileder.ident,
	oppfolgingsenhetId: ansvarligVeileder.enhetId,
	oppfolgingsenhetNavn: ansvarligVeileder.enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	dokumentInfoId: null,
	journalpostId: null,
	beslutterIdent: beslutter.ident,
	beslutterNavn: beslutter.navn,
	godkjentAvBeslutter: false,
	beslutterProsessStartet: true,
};

export default utkast;

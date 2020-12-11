import { enhetId, enhetNavn, veileder1, veileder3 } from '../../data';
import {
	BeslutterProsessStatus,
	HovedmalType,
	InnsatsgruppeType,
	Vedtak,
	VedtakStatus
} from '../../../api/veilarbvedtaksstotte';

const utkast: Vedtak = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS,
	vedtakStatus: VedtakStatus.UTKAST,
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: veileder1.navn,
	veilederIdent: veileder1.ident,
	oppfolgingsenhetId: enhetId,
	oppfolgingsenhetNavn: enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	dokumentInfoId: null,
	journalpostId: null,
	beslutterIdent: null,
	beslutterNavn: null,
	beslutterProsessStatus: null
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const utkastMedBeslutter: Vedtak = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
	vedtakStatus: VedtakStatus.UTKAST,
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: veileder1.navn,
	veilederIdent: veileder1.ident,
	oppfolgingsenhetId: enhetId,
	oppfolgingsenhetNavn: enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	dokumentInfoId: null,
	journalpostId: null,
	beslutterIdent: veileder3.ident,
	beslutterNavn: veileder3.navn,
	beslutterProsessStatus: BeslutterProsessStatus.KLAR_TIL_BESLUTTER
};

export default utkast;

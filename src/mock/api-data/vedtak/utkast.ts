import {
	BeslutterProsessStatus,
	HovedmalType,
	InnsatsgruppeType,
	Vedtak,
	VedtakStatus
} from '../../../rest/data/vedtak';
import { JSONObject } from 'yet-another-fetch-mock';
import { ansvarligVeileder, beslutter } from '../../personer';
import { enhetId, enhetNavn } from '../../konstanter';

const utkast: Vedtak & JSONObject = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
	vedtakStatus: VedtakStatus.UTKAST,
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: ansvarligVeileder.navn,
	veilederIdent: ansvarligVeileder.ident,
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
const utkastMedBeslutter: Vedtak & JSONObject = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
	vedtakStatus: VedtakStatus.UTKAST,
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	gjeldende: false,
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: ansvarligVeileder.navn,
	veilederIdent: ansvarligVeileder.ident,
	oppfolgingsenhetId: enhetId,
	oppfolgingsenhetNavn: enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	dokumentInfoId: null,
	journalpostId: null,
	beslutterIdent: beslutter.ident,
	beslutterNavn: beslutter.navn,
	beslutterProsessStatus: BeslutterProsessStatus.KLAR_TIL_BESLUTTER
};

export default utkast;

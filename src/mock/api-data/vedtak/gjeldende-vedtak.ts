import { HovedmalType, InnsatsgruppeType, Vedtak, VedtakStatus } from '../../../rest/data/vedtak';
import { veileder1 } from '../../veiledere-mock';
import { enhetId, enhetNavn } from '../../konstanter';

const gjeldendeVedtak: Vedtak = {
	id: 1000,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
	vedtakStatus: VedtakStatus.SENDT,
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	begrunnelse:
		'herps derps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derps',
	gjeldende: true,
	opplysninger: [],
	veilederNavn: veileder1.navn,
	veilederIdent: veileder1.ident,
	oppfolgingsenhetId: enhetId,
	oppfolgingsenhetNavn: enhetNavn,
	beslutterIdent: null,
	beslutterNavn: null,
	dokumentInfoId: null,
	journalpostId: null,
	beslutterProsessStatus: null
};

export default gjeldendeVedtak;

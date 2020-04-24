import { HovedmalType, InnsatsgruppeType, Vedtak } from '../../../rest/data/vedtak';
import { JSONObject } from 'yet-another-fetch-mock';
import { ansvarligVeileder } from '../../personer';
import { enhetId, enhetNavn } from '../../konstanter';

const gjeldendeVedtak: Vedtak & JSONObject = {
	id: 1000,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
	vedtakStatus: 'SENDT',
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	begrunnelse:
		'herps derps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derps',
	gjeldende: true,
	opplysninger: [],
	veilederNavn: ansvarligVeileder.navn,
	veilederIdent: ansvarligVeileder.ident,
	oppfolgingsenhetId: enhetId,
	oppfolgingsenhetNavn: enhetNavn,
	beslutterIdent: null,
	beslutterNavn: null,
	dokumentInfoId: null,
	journalpostId: null,
	beslutterProsessStatus: null
};

export default gjeldendeVedtak;


import { HovedmalType, InnsatsgruppeType, Vedtak } from '../../../rest/data/vedtak';
import { JSONObject } from 'yet-another-fetch-mock';
import { ansvarligVeileder } from '../../personer';

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
	oppfolgingsenhetId: ansvarligVeileder.enhetId,
	oppfolgingsenhetNavn: ansvarligVeileder.enhetNavn,
	beslutterIdent: null,
	beslutterNavn: null,
	beslutterProsessStartet: false,
	godkjentAvBeslutter: false,
	dokumentInfoId: null,
	journalpostId: null,
};

export default gjeldendeVedtak;

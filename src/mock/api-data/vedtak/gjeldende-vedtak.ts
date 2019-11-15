import { InnsatsgruppeType } from '../../../components/skjema/innsatsgruppe/innsatsgruppe';
import { HovedmalType } from '../../../components/skjema/hovedmal/hovedmal';
import { VedtakData } from '../../../rest/data/vedtak';
import { JSONObject } from 'yet-another-fetch-mock';
import { innloggetVeileder } from '../innlogget-veileder';

const gjeldendeVedtak: VedtakData & JSONObject = {
	id: 4,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
	vedtakStatus: 'SENDT',
	sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	begrunnelse:
		'herps derps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derpsherps derps',
	gjeldende: true,
	opplysninger: [],
	veilederNavn: innloggetVeileder.navn,
	veilederIdent: innloggetVeileder.ident,
	veilederEnhetId: innloggetVeileder.enhetId,
	veilederEnhetNavn: innloggetVeileder.enhetNavn,
	beslutterNavn: null,
	dokumentInfoId: null,
	journalpostId: null,
	sendtTilBeslutter: false
};

export default gjeldendeVedtak;

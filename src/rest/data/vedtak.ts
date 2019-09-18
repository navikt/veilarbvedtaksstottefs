import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import { OrNothing } from '../../utils/types/ornothing';

type VedtakStatus = 'UTKAST' | 'SENDT';

export interface VedtakData {
	id: number;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	vedtakStatus: VedtakStatus;
	sistOppdatert: string;
	begrunnelse: OrNothing<string>;
	gjeldende: boolean;
	veilederIdent: string;
	veilederEnhetId: string;
	veilederEnhetNavn: string;
	beslutter: OrNothing<string>;
	sendtTilBeslutter: boolean;
	opplysninger: string[];
	journalpostId: OrNothing<string>;
	dokumentInfoId: OrNothing<string>;
}

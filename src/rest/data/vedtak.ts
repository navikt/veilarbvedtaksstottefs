import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { OrNothing } from '../../utils/types/ornothing';

type VedtakStatus = 'UTKAST' | 'SENDT';

export enum InnsatsgruppeType {
	STANDARD_INNSATS = 'STANDARD_INNSATS',
	SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
	SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
	GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
	VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS'
}

export interface VedtakData {
	id: number;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	vedtakStatus: VedtakStatus;
	sistOppdatert: string;
	begrunnelse: OrNothing<string>;
	gjeldende: boolean;
	veilederIdent: string;
	veilederNavn: string | null; // Skal egentlig alltid være string, men backend kan sende null siden det ikke er et kritisk felt
	veilederEnhetId: string;
	veilederEnhetNavn: string;
	beslutterNavn: OrNothing<string>;
	sendtTilBeslutter: boolean;
	opplysninger: string[];
	journalpostId: OrNothing<string>;
	dokumentInfoId: OrNothing<string>;
}

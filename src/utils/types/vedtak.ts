import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';

type VedtakStatus = 'UTKAST' | 'SENDT';

export interface Veileder {
    ident: string;
    enhetId: string;
    enhetNavn: string;
}

export interface VedtakData {
    id: number;
    hovedmal: HovedmalType;
    innsatsgruppe: InnsatsgruppeType;
    vedtakStatus: VedtakStatus;
    sistOppdatert: string;
    begrunnelse: string;
    gjeldende: boolean;
    veileder: Veileder;
}
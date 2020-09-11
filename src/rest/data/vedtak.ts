import { OrNothing } from '../../utils/types/ornothing';

export enum VedtakStatus {
	UTKAST = 'UTKAST',
	SENDT = 'SENDT'
}

export enum InnsatsgruppeType {
	STANDARD_INNSATS = 'STANDARD_INNSATS',
	SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
	SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
	GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
	VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS'
}

export enum HovedmalType {
	SKAFFE_ARBEID = 'SKAFFE_ARBEID',
	BEHOLDE_ARBEID = 'BEHOLDE_ARBEID'
}

export enum BeslutterProsessStatus {
	KLAR_TIL_BESLUTTER = 'KLAR_TIL_BESLUTTER',
	KLAR_TIL_VEILEDER = 'KLAR_TIL_VEILEDER',
	GODKJENT_AV_BESLUTTER = 'GODKJENT_AV_BESLUTTER',
	BESLUTTER_PROSESS_AVBRUTT = 'BESLUTTER_PROSESS_AVBRUTT'
}

export interface Vedtak {
	id: number;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	vedtakStatus: VedtakStatus;
	sistOppdatert: string;
	begrunnelse: OrNothing<string>;
	gjeldende: boolean;
	veilederIdent: string;
	veilederNavn: string;
	oppfolgingsenhetId: string;
	oppfolgingsenhetNavn: string;
	beslutterIdent: OrNothing<string>;
	beslutterNavn: OrNothing<string>;
	opplysninger: string[];
	journalpostId: OrNothing<string>;
	dokumentInfoId: OrNothing<string>;
	beslutterProsessStatus: OrNothing<BeslutterProsessStatus>;
}

export interface ArenaVedtak {
	journalpostId: string;
	dokumentInfoId: string;
	dato: string;
}


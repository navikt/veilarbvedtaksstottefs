import { OrNothing } from '../../util/type/ornothing';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

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
	GODKJENT_AV_BESLUTTER = 'GODKJENT_AV_BESLUTTER'
}

export interface Utkast {
	id: number;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	utkastSistOppdatert: string;
	begrunnelse: OrNothing<string>;
	veilederIdent: string;
	veilederNavn: string;
	oppfolgingsenhetId: string;
	oppfolgingsenhetNavn: string;
	beslutterIdent: OrNothing<string>;
	beslutterNavn: OrNothing<string>;
	opplysninger: string[]; // Har blitt renamet til "kilder" i etterkant
	beslutterProsessStatus: OrNothing<BeslutterProsessStatus>;
}

export interface Vedtak {
	id: number;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: InnsatsgruppeType;
	begrunnelse: OrNothing<string>;
	veilederIdent: string;
	veilederNavn: string;
	oppfolgingsenhetId: string;
	oppfolgingsenhetNavn: string;
	beslutterIdent: OrNothing<string>;
	beslutterNavn: OrNothing<string>;
	opplysninger: string[]; // Har blitt renamet til "kilder" i etterkant

	gjeldende: boolean;
	vedtakFattet: string;
	journalpostId: OrNothing<string>;
	dokumentInfoId: OrNothing<string>;
}

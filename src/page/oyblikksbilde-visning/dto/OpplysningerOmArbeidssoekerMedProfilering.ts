import { OpplysningerOmArbeidssoker, Profilering } from '@navikt/arbeidssokerregisteret-utils';

export interface OpplysningerOmArbeidssokerMedProfilering {
	arbeidssoekerperiodeStartet?: string;
	opplysningerOmArbeidssoeker: OpplysningerOmArbeidssoker | null;
	profilering: Profilering | null;
}

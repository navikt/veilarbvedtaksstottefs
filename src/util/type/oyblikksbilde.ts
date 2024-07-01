import { CvDto } from '../../page/oyblikksbilde-visning/dto/CvDto';
import { RegistreringDto } from '../../page/oyblikksbilde-visning/dto/RegistreringDto';
import { EgenvurderingDto } from '../../page/oyblikksbilde-visning/dto/EgenvurderingDto';
import { OpplysningerOmArbeidssokerMedProfilering } from '../../page/oyblikksbilde-visning/dto/OpplysningerOmArbeidssoekerMedProfilering';

export interface OyblikksbildeCv {
	data: CvDto | null;
	journalfort: boolean;
}

export interface OyblikksbildeRegistrering {
	data: RegistreringDto | null;
	journalfort: boolean;
}

export interface OyblikksbildeArbeidssokerRegistret {
	data: OpplysningerOmArbeidssokerMedProfilering | null;
	journalfort: boolean;
}

export interface OyblikksbildeEgenvurdering {
	data: EgenvurderingDto | null;
	journalfort: boolean;
}

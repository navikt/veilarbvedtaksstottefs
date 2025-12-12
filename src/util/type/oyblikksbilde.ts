import { CvDto } from '../../page/oyblikksbilde-visning/dto/CvDto';
import { RegistreringDto } from '../../page/oyblikksbilde-visning/dto/RegistreringDto';
import { EgenvurderingDto, EgenvurderingV2Dto } from '../../page/oyblikksbilde-visning/dto/EgenvurderingDto';
import { OpplysningerOmArbeidssokerMedProfilering } from '../../page/oyblikksbilde-visning/dto/OpplysningerOmArbeidssoekerMedProfilering';
import OyblikksbildeType from './oyblikksbilde-type';

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
	data: EgenvurderingDto | EgenvurderingV2Dto | null;
	journalfort: boolean;
	type: OyblikksbildeType.EGENVURDERING | OyblikksbildeType.EGENVURDERING_V2;
}

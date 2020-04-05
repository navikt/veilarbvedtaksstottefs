import { OrNothing } from '../../utils/types/ornothing';
import { MeldingType, MeldingUnderType } from '../../utils/types/dialog-melding-type';

export interface DialogMelding {
	melding: OrNothing<string>;
	opprettet: string;
	opprettetAvIdent: OrNothing<string>;
	opprettetAvNavn: OrNothing<string>;
	meldingUnderType: OrNothing<MeldingUnderType>;
	meldingType: MeldingType;
}
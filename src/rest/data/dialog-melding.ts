import { OrNothing } from '../../utils/types/ornothing';

export interface DialogMelding {
	melding: string;
	opprettet: string;
	opprettetAvIdent: OrNothing<string>;
	opprettetAvNavn: OrNothing<string>;
}
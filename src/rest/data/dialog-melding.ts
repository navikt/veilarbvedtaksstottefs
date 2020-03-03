import { OrNothing } from '../../utils/types/ornothing';

export interface DialogMelding {
	tekst: string;
	dato: string;
	skrevetAvIdent: OrNothing<string>;
	skrevetAvNavn: OrNothing<string>;
}
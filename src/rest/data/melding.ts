import { MeldingType, SystemMeldingType } from '../../utils/types/melding-type';

export interface Melding {
    opprettet: string;
    type: MeldingType;
}
export interface DialogMelding extends Melding {
    melding: string;
    opprettetAvIdent: string;
    opprettetAvNavn: string;
}
export interface SystemMelding extends Melding {
    utfortAvIdent: string;
    utfortAvNavn: string;
    systemMeldingType: SystemMeldingType;
}

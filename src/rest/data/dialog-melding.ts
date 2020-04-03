import { OrNothing } from '../../utils/types/ornothing';

export interface DialogMelding {
	melding: string;
	opprettet: string;
	opprettetAvIdent: OrNothing<string>;
	opprettetAvNavn: OrNothing<string>;
}

export enum SystemMeldingType {
	UTKAST_OPPRETTET = 'UTKAST_OPPRETTET',
	BESLUTTER_PROSESS_STARTET = 'BESLUTTER_PROSESS_STARTET',
	BLI_BESLUTTER = 'BLI_BESLUTTER',
	GODSKJENT_AV_BESLUTTER = 'GODSKJENT_AV_BESLUTTER',
	TA_OVER_SOM_BESLUTTER = 'TA_OVER_SOM_BESLUTTER',
	TA_OVER_SOM_VEILEDER = 'TA_OVER_SOM_VEILEDER'
}
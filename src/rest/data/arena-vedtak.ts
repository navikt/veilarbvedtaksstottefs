import { OrNothing } from '../../utils/types/ornothing';
import { InnsatsgruppeType } from './vedtak';

export interface ArenaVedtakData {
	journalpostId: string;
	dokumentInfoId: string;
	journalforendeEnhet: string;
	journalfortAvNavn: string;
	datoOpprettet: string;
	erGjeldende: boolean;
	gjeldendeInnsatsgruppe: OrNothing<InnsatsgruppeType>;
}

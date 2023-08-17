import { VarselModal } from './varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { ModalProps } from './modal-props';
import { ModalType, useModalStore } from '../../store/modal-store';
import { useSkjemaStore } from '../../store/skjema-store';
import { useDataStore } from '../../store/data-store';
import { SystemMeldingType } from '../../util/type/melding-type';
import { hentId } from '../../util';
import { OrNothing } from '../../util/type/ornothing';
import { InnsatsgruppeType } from '../../api/veilarbvedtaksstotte';
import { avbrytBeslutterProsess } from '../../api/veilarbvedtaksstotte/beslutter';
import { Button } from '@navikt/ds-react';

interface AvbrytBeslutterProsessModalProps extends ModalProps {
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
}

function AvbrytBeslutterProsessModal(props: AvbrytBeslutterProsessModalProps) {
	const { hideModal, showModal } = useModalStore();
	const { utkast, leggTilSystemMelding, nullStillBeslutterProsess } = useDataStore();
	const { setInnsatsgruppe } = useSkjemaStore();

	function handleOnJaClicked() {
		avbrytBeslutterProsess(hentId(utkast))
			.then(() => {
				hideModal();
				setInnsatsgruppe(props.innsatsgruppe);
				nullStillBeslutterProsess();
				leggTilSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT);
			})
			.catch(() => showModal(ModalType.FEIL_VED_AVBRYT_BESLUTTER_PROSESS));
	}

	return (
		<VarselModal isOpen={props.isOpen} onRequestClose={hideModal} contentLabel="Avbryt kvalitetssikringsprosessen">
			<Systemtittel className="varsel-modal__tittel">Endre innsatsgruppe</Systemtittel>
			<Normaltekst className="varsel-modal__tekstinnhold">
				Kvalitetssikringprosessen vil avbrytes. Er du sikker på at du vil endre innsatsgruppe?
			</Normaltekst>
			<div className="varsel-modal__knapper">
				<Button size="small" variant="secondary" onClick={hideModal}>
					Nei
				</Button>
				<Button size="small" onClick={handleOnJaClicked}>
					Ja
				</Button>
			</div>
		</VarselModal>
	);
}

export default AvbrytBeslutterProsessModal;

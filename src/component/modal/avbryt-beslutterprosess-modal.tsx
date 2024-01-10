import { VarselModal } from './varsel-modal/varsel-modal';
import { ModalProps } from './modal-props';
import { ModalType, useModalStore } from '../../store/modal-store';
import { useSkjemaStore } from '../../store/skjema-store';
import { useDataStore } from '../../store/data-store';
import { SystemMeldingType } from '../../util/type/melding-type';
import { hentId } from '../../util';
import { OrNothing } from '../../util/type/ornothing';
import { InnsatsgruppeType } from '../../api/veilarbvedtaksstotte';
import { avbrytBeslutterProsess } from '../../api/veilarbvedtaksstotte/beslutter';
import { Button, Heading, Modal } from '@navikt/ds-react';

interface AvbrytBeslutterProsessModalProps extends ModalProps {
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
}

function AvbrytBeslutterProsessModal(props: AvbrytBeslutterProsessModalProps) {
	const { resetModalType, showModal } = useModalStore();
	const { utkast, leggTilSystemMelding, nullStillBeslutterProsess } = useDataStore();
	const { setInnsatsgruppe } = useSkjemaStore();

	function handleOnJaClicked() {
		avbrytBeslutterProsess(hentId(utkast))
			.then(() => {
				resetModalType();
				setInnsatsgruppe(props.innsatsgruppe);
				nullStillBeslutterProsess();
				leggTilSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_AVBRUTT);
			})
			.catch(() => showModal(ModalType.FEIL_VED_AVBRYT_BESLUTTER_PROSESS));
	}

	return (
		<VarselModal
			isOpen={props.isOpen}
			onRequestClose={resetModalType}
			contentLabel="Avbryt kvalitetssikringsprosessen"
		>
			<Modal.Header>
				<Heading level="1" size="medium">
					Endre innsatsgruppe
				</Heading>
			</Modal.Header>
			<Modal.Body>
				Kvalitetssikringprosessen vil avbrytes. Er du sikker på at du vil endre innsatsgruppe?
			</Modal.Body>
			<Modal.Footer>
				<Button size="small" onClick={handleOnJaClicked}>
					Endre
				</Button>
				<Button size="small" variant="secondary" onClick={resetModalType}>
					Avbryt
				</Button>
			</Modal.Footer>
		</VarselModal>
	);
}

export default AvbrytBeslutterProsessModal;

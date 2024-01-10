import { VarselModal } from './varsel-modal/varsel-modal';
import { ModalProps } from './modal-props';
import { ModalType, useModalStore } from '../../store/modal-store';
import { useViewStore, ViewType } from '../../store/view-store';
import { useSkjemaStore } from '../../store/skjema-store';
import { useDataStore } from '../../store/data-store';
import { hentId } from '../../util';
import { slettUtkast } from '../../api/veilarbvedtaksstotte/utkast';
import { Button, Heading, Modal } from '@navikt/ds-react';

function SlettUtkastModal(props: ModalProps) {
	const { resetModalType, showModal } = useModalStore();
	const { utkast, setUtkast } = useDataStore();
	const { changeView } = useViewStore();
	const { resetSkjema } = useSkjemaStore();

	function handleOnDeleteClicked() {
		showModal(ModalType.LASTER);
		slettUtkast(hentId(utkast))
			.then(() => {
				resetSkjema();
				resetModalType();
				changeView(ViewType.HOVEDSIDE);
				setUtkast(null);
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_SLETTING);
			});
	}

	return (
		<VarselModal isOpen={props.isOpen} onRequestClose={resetModalType} contentLabel="Bekreft slett utkast">
			<Modal.Header>
				<Heading level="1" size="medium">
					Slett utkast
				</Heading>
			</Modal.Header>
			<Modal.Body>Er du sikker på at du vil slette utkastet?</Modal.Body>
			<Modal.Footer>
				<Button size="small" onClick={handleOnDeleteClicked}>
					Slett
				</Button>
				<Button size="small" variant="secondary" onClick={resetModalType}>
					Avbryt
				</Button>
			</Modal.Footer>
		</VarselModal>
	);
}

export default SlettUtkastModal;

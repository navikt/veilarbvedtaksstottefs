import { VarselModal } from './varsel-modal/varsel-modal';
import { ModalProps } from './modal-props';
import { useModalStore } from '../../store/modal-store';
import { Button, Heading, Modal } from '@navikt/ds-react';

interface GodkjennModalProps extends ModalProps {
	onGodkjennUtkastBekreftet: () => void;
}

export function GodkjennModal(props: GodkjennModalProps) {
	const { resetModalType } = useModalStore();

	function handleOnRequestCloseModal() {
		resetModalType();
	}

	return (
		<VarselModal
			isOpen={props.isOpen}
			onRequestClose={handleOnRequestCloseModal}
			contentLabel="Bekreft at vedtaket blir godkjent"
		>
			<Modal.Header>
				<Heading level="1" size="medium">
					Godkjenn utkast
				</Heading>
			</Modal.Header>
			<Modal.Body>Er du sikker på at du vil godkjenne utkastet?</Modal.Body>
			<Modal.Footer>
				<Button size="small" onClick={props.onGodkjennUtkastBekreftet}>
					Godkjenn
				</Button>
				<Button size="small" variant="secondary" onClick={resetModalType}>
					Avbryt
				</Button>
			</Modal.Footer>
		</VarselModal>
	);
}

export default GodkjennModal;

import { ModalProps } from '../modal-props';
import { Loader, Modal } from '@navikt/ds-react';
import './spinner-modal.less';

export function SpinnerModal(props: ModalProps) {
	return (
		<Modal open={props.isOpen} onClose={() => {}} id="veilarbvedtaksstottefs-spinner-modal" aria-label="Spinner">
			<Modal.Body>
				<Loader size="3xlarge" variant="inverted" title="laster..." />
			</Modal.Body>
		</Modal>
	);
}

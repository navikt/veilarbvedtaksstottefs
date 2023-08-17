import { ModalProps } from '../modal-props';
import { Loader, Modal } from '@navikt/ds-react';
import './spinner-modal.less';

export function SpinnerModal(props: ModalProps) {
	return (
		<Modal
			open={props.isOpen}
			onClose={() => {}}
			overlayClassName="veilarbvedtaksstottefs-spinner-modal"
			closeButton={false}
			aria-label="Spinner"
		>
			<Modal.Content>
				<Loader size="3xlarge" variant="inverted" title="laster..." />
			</Modal.Content>
		</Modal>
	);
}

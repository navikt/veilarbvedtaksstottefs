import ModalWrapper from 'nav-frontend-modal';
import { ModalProps } from '../modal-props';
import { Loader } from '@navikt/ds-react';
import './spinner-modal.less';

export function SpinnerModal(props: ModalProps) {
	return (
		<ModalWrapper
			isOpen={props.isOpen}
			contentLabel="Spinner"
			onRequestClose={() => {}}
			closeButton={false}
			portalClassName="veilarbvedtaksstottefs-spinner-modal"
		>
			<Loader size="3xlarge" variant="inverted" />
		</ModalWrapper>
	);
}

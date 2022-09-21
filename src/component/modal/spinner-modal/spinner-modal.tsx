import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { ModalProps } from '../modal-props';
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
			<NavFrontendSpinner type="XXL" />
		</ModalWrapper>
	);
}

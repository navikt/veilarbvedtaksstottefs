import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { ModalProps } from './modal-props';
import './modal.less';

export function SpinnerModal(props: ModalProps) {
	return (
		<ModalWrapper
			isOpen={props.isOpen}
			contentLabel="Laster data"
			onRequestClose={() => {}} // tslint:disable-line:no-empty
			closeButton={false}
			portalClassName="veilarbvedtaksstottefs-modal spinner-modal"
		>
			<div className="modal__innehold">
				<NavFrontendSpinner type="XXL" />
			</div>
		</ModalWrapper>
	);
}

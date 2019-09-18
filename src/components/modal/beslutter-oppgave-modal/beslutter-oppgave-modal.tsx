import React, { useEffect, useState } from 'react';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../stores/modal-store';
import ModalWrapper from 'nav-frontend-modal';
import './beslutter-oppgave-modal.less';
import { useViewStore } from '../../../stores/view-store';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

export function BeslutterOppgaveModal(props: ModalProps) {
	const {hideModal} = useModalStore();

	return (
		<ModalWrapper
			isOpen={props.isOpen}
			contentLabel="Send GOSYS-oppgave til beslutter"
			onRequestClose={hideModal}
			closeButton={false}
			portalClassName="veilarbvedtaksstottefs-beslutter-oppgave-modal"
			shouldCloseOnOverlayClick={true}
		>
			<h1>GOSYS oppgave</h1>
			<Hovedknapp mini={true}>
				Bekreft
			</Hovedknapp>
			<Knapp mini={true} onClick={hideModal}>
				Avbryt
			</Knapp>
		</ModalWrapper>
	);
}

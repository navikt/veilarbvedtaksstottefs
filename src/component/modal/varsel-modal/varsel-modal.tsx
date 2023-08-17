import React from 'react';
import { Modal } from '@navikt/ds-react';
import './varsel-modal.less';

export enum VarselIkonType {
	FEIL = 'FEIL',
	ADVARSEL = 'ADVARSEL',
	LAS_OPP = 'LAS_OPP',
	INGEN = 'INGEN'
}

interface VarselModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	contentLabel: string;
	closeButton?: boolean;
	shouldCloseOnOverlayClick?: boolean;
}

export function VarselModal({
	contentLabel,
	isOpen,
	onRequestClose,
	children,
	closeButton,
	shouldCloseOnOverlayClick
}: React.PropsWithChildren<VarselModalProps>) {
	return (
		<Modal
			open={isOpen}
			onClose={onRequestClose}
			closeButton={closeButton}
			shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
			className="veilarbvedtaksstottefs-varsel-modal"
			aria-label={contentLabel}
		>
			<Modal.Content className="varsel-modal__innhold">{children}</Modal.Content>
		</Modal>
	);
}

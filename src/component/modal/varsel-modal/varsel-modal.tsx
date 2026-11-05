import React from 'react';
import { Modal } from '@navikt/ds-react';

interface VarselModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	contentLabel: string;
}

export function VarselModal({
	contentLabel,
	isOpen,
	onRequestClose,
	children
}: React.PropsWithChildren<VarselModalProps>) {
	return (
		<Modal open={isOpen} onClose={onRequestClose} aria-label={contentLabel}>
			{children}
		</Modal>
	);
}

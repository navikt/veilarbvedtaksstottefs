import React from 'react';
import { Modal } from '@navikt/ds-react';

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

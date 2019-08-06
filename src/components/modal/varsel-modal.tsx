import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import './modal.less';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';
import { ReactComponent as OkSirkelIkon } from './ok-sirkel.svg';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';
import classNames from 'classnames';

type VarselModalType = 'SUKSESS' | 'FEIL' | 'ADVARSEL';

interface VarselModalProps {
	contentLabel: string;
	isOpen: boolean;
	onRequestClose: () => void;
	type: VarselModalType;
	closeTimeoutMS?: number;
	closeButton?: boolean;
	shouldCloseOnOverlayClick?: boolean;
	className?: string;
}

export function VarselModal({
	contentLabel,
	isOpen,
	onRequestClose,
	children,
	type,
	closeTimeoutMS,
	closeButton,
	shouldCloseOnOverlayClick,
	className
}: React.PropsWithChildren<VarselModalProps>) {
	return (
		<ModalWrapper
			isOpen={isOpen}
			contentLabel={contentLabel}
			onRequestClose={onRequestClose}
			closeTimeoutMS={closeTimeoutMS}
			closeButton={closeButton}
			portalClassName="veilarbvedtaksstottefs-modal"
			shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
		>
			<VarselIkone type={type} />
			<div className={classNames('modal__innehold', className)}>{children}</div>
		</ModalWrapper>
	);
}

function VarselIkone(props: { type: VarselModalType }) {
	switch (props.type) {
		case 'SUKSESS':
			return <OkSirkelIkon />;
		case 'FEIL':
			return <FeilSirkelIkon />;
		case 'ADVARSEL':
			return <AdvarselSirkelIkon />;
		default:
			return null;
	}
}

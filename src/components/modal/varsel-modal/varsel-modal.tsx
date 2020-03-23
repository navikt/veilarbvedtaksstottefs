import React from 'react';
import cls from 'classnames';
import ModalWrapper from 'nav-frontend-modal';
import { ReactComponent as DigitalPostkasseIkon } from './vedtak-sendt-digital.svg';
import { ReactComponent as BrevIkon } from './vedtak-sendt-brev.svg';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';
import { ReactComponent as OpplåstIkon } from './lock green.svg';
import './varsel-modal.less';

export enum VarselIkonType {
	FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
	VEDTAK_SENDT_BREV = 'VEDTAK_SENDT_BREV',
	VEDTAK_SENDT_DIGITALT = 'VEDTAK_SENDT_DIGITALT',
	OPPLÅS = 'OPPLÅS'
}

interface VarselModalProps {
	contentLabel: string;
	isOpen: boolean;
	onRequestClose: () => void;
	varselIkonType: VarselIkonType;
	closeTimeoutMS?: number;
	closeButton?: boolean;
	shouldCloseOnOverlayClick?: boolean;
	className?: string;
	portalClassName?: string;
}

export function VarselModal({
	contentLabel,
	isOpen,
	onRequestClose,
	children,
	varselIkonType,
	closeTimeoutMS,
	closeButton,
	shouldCloseOnOverlayClick,
	className,
	portalClassName
}: React.PropsWithChildren<VarselModalProps>) {
	return (
		<ModalWrapper
			isOpen={isOpen}
			contentLabel={contentLabel}
			onRequestClose={onRequestClose}
			closeTimeoutMS={closeTimeoutMS}
			closeButton={closeButton}
			portalClassName={cls('veilarbvedtaksstottefs-varsel-modal', portalClassName)}
			shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
		>
			<VarselIkon type={varselIkonType} />
			<div className={cls('varsel-modal__innehold', className)}>{children}</div>
		</ModalWrapper>
	);
}

function VarselIkon(props: { type: VarselIkonType }) {
	switch (props.type) {
		case VarselIkonType.VEDTAK_SENDT_BREV:
			return <BrevIkon className="varsel-modal__ikon--vedtak-sendt" />;
		case VarselIkonType.VEDTAK_SENDT_DIGITALT:
			return <DigitalPostkasseIkon className="varsel-modal__ikon--vedtak-sendt" />;
		case VarselIkonType.FEIL:
			return <FeilSirkelIkon className="varsel-modal__ikon" />;
		case VarselIkonType.ADVARSEL:
			return <AdvarselSirkelIkon className="varsel-modal__ikon" />;
		case VarselIkonType.OPPLÅS:
			return <OpplåstIkon className="varsel-modal__ikon" />;
		default:
			return null;
	}
}

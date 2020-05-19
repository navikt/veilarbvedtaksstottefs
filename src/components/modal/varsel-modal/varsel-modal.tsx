import React from 'react';
import cls from 'classnames';
import ModalWrapper from 'nav-frontend-modal';
import { ReactComponent as BrevIkon } from './vedtak-sendt.svg';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';
import { ReactComponent as LasOppIkon } from './las-opp.svg';
import './varsel-modal.less';
import Show from '../../show';

export enum VarselIkonType {
	FEIL = 'FEIL',
    ADVARSEL = 'ADVARSEL',
	VEDTAK_SENDT = 'VEDTAK_SENDT',
	LAS_OPP = 'LAS_OPP',
	INGEN = 'INGEN'
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
	const visVarselIkon = varselIkonType !== VarselIkonType.INGEN;
	const innholdClassName = cls('varsel-modal__innehold', { 'varsel-modal__innehold--ingen-ikon': !visVarselIkon }, className);

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
			<Show if={visVarselIkon}>
				<VarselIkon type={varselIkonType} />
			</Show>
			<div className={innholdClassName}>{children}</div>
		</ModalWrapper>
	);
}

function VarselIkon(props: { type: VarselIkonType }) {
	switch (props.type) {
		case VarselIkonType.VEDTAK_SENDT:
			return <BrevIkon className="varsel-modal__ikon--vedtak-sendt" />;
		case VarselIkonType.FEIL:
			return <FeilSirkelIkon className="varsel-modal__ikon" />;
		case VarselIkonType.ADVARSEL:
			return <AdvarselSirkelIkon className="varsel-modal__ikon" />;
		case VarselIkonType.LAS_OPP:
			return <LasOppIkon className="varsel-modal__ikon" />;
		default:
			return null;
	}
}

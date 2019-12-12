import React from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../stores/modal-store';
import './vedtak-sendt-modal.less';

interface VedtakSendtModalProps extends ModalProps{
	sendesVedtakDigitalt?: boolean;
}

export function VedtakSendtModal(props: VedtakSendtModalProps) {
	const { hideModal } = useModalStore();

	const varselIkon = props.sendesVedtakDigitalt
		? VarselIkonType.VEDTAK_SENDT_DIGITALT
		: VarselIkonType.VEDTAK_SENDT_BREV;

	const tekst = props.sendesVedtakDigitalt
		? 'Vedtaket blir sendt til brukers digitale postkasse'
		: 'Vedtaket blir sendt til bruker via post';

	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Vedtaket sendt til bruker"
			onRequestClose={hideModal}
			varselIkonType={varselIkon}
			portalClassName="vedtak-sendt-modal"
		>
			<Systemtittel className="vedtak-sendt-modal__tekst">{tekst}</Systemtittel>
			<Hovedknapp onClick={hideModal}>OK</Hovedknapp>
		</VarselModal>
	);
}

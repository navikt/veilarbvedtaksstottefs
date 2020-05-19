import React from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../stores/modal-store';
import './vedtak-sendt-modal.less';

interface VedtakSendtModalProps extends ModalProps{
	onSendVedtakBekreftet: () => void;
}

export function BekreftSendVedtakModal(props: VedtakSendtModalProps) {
	const { hideModal } = useModalStore();

	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Bekreft vedtaket blir sendt til bruker"
			onRequestClose={hideModal}
			varselIkonType={VarselIkonType.INGEN}
		>
			      <Systemtittel className="vedtak-sendt-modal__tekst">Er du sikker på at du vil sende vedtaksbrev til bruker?</Systemtittel>
			      <div className="varsel-modal__knapper">
			      		<Hovedknapp onClick={props.onSendVedtakBekreftet}>JA, SEND NÅ</Hovedknapp>
			      		<Knapp onClick={hideModal}>AVBRYT</Knapp>
			      </div>
		</VarselModal>
	);
}

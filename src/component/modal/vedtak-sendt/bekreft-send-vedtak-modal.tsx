import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../store/modal-store';
import { Button } from '@navikt/ds-react';
import './vedtak-sendt-modal.less';

interface VedtakSendtModalProps extends ModalProps {
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
			<Systemtittel className="vedtak-sendt-modal__tekst">
				Er du sikker på at du vil sende vedtaksbrev til bruker?
			</Systemtittel>
			<div className="varsel-modal__knapper">
				<Button onClick={props.onSendVedtakBekreftet}>JA, SEND NÅ</Button>
				<Button variant="secondary" onClick={hideModal}>
					AVBRYT
				</Button>
			</div>
		</VarselModal>
	);
}

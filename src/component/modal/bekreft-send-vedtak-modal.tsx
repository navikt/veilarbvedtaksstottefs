import { VarselModal } from './varsel-modal/varsel-modal';
import { ModalProps } from './modal-props';
import { useModalStore } from '../../store/modal-store';
import { Button, Heading, Modal } from '@navikt/ds-react';

interface VedtakSendtModalProps extends ModalProps {
	onSendVedtakBekreftet: () => void;
}

export default function BekreftSendVedtakModal(props: VedtakSendtModalProps) {
	const { resetModalType } = useModalStore();

	return (
		<VarselModal
			isOpen={props.isOpen}
			onRequestClose={resetModalType}
			contentLabel="Bekreft vedtaket blir sendt til bruker"
		>
			<Modal.Header>
				<Heading level="1" size="medium">
					Send vedtaksbrev
				</Heading>
			</Modal.Header>
			<Modal.Body>Er du sikker på at du vil sende vedtaksbrev til bruker?</Modal.Body>
			<Modal.Footer>
				<Button size="small" onClick={props.onSendVedtakBekreftet}>
					Send
				</Button>
				<Button size="small" variant="secondary" onClick={resetModalType}>
					Avbryt
				</Button>
			</Modal.Footer>
		</VarselModal>
	);
}

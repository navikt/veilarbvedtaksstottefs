import { VarselModal } from './varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { ModalProps } from './modal-props';
import { useModalStore } from '../../store/modal-store';
import { Button } from '@navikt/ds-react';

interface VedtakSendtModalProps extends ModalProps {
	onSendVedtakBekreftet: () => void;
}

export function BekreftSendVedtakModal(props: VedtakSendtModalProps) {
	const { hideModal } = useModalStore();

	return (
		<VarselModal
			isOpen={props.isOpen}
			onRequestClose={hideModal}
			contentLabel="Bekreft vedtaket blir sendt til bruker"
		>
			<Systemtittel className="varsel-modal__tittel">
				Er du sikker på at du vil sende vedtaksbrev til bruker?
			</Systemtittel>
			<div className="varsel-modal__knapper">
				<Button size="small" variant="secondary" onClick={hideModal}>
					Avbryt
				</Button>
				<Button size="small" onClick={props.onSendVedtakBekreftet}>
					Ja, send nå
				</Button>
			</div>
		</VarselModal>
	);
}

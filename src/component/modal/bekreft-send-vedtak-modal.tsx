import { VarselModal } from './varsel-modal/varsel-modal';
import { ModalProps } from './modal-props';
import { useModalStore } from '../../store/modal-store';
import { useDataStore } from '../../store/data-store';
import { BodyShort, Button, CopyButton, Heading, Modal } from '@navikt/ds-react';
import { useAppStore } from '../../store/app-store';
import './modal.css';
import { formateStringInUpperAndLowerCase } from '../../util/tekst-utils';

interface VedtakSendtModalProps extends ModalProps {
	onSendVedtakBekreftet: () => void;
}

export default function BekreftSendVedtakModal(props: VedtakSendtModalProps) {
	const { resetModalType } = useModalStore();
	const navn = useDataStore().navn;
	const fnr = useAppStore().fnr;
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
				<div className="bekreft-send-vedtak-modal-personinfo">
					<BodyShort weight="semibold">
						{`${formateStringInUpperAndLowerCase(navn.fornavn)} ${formateStringInUpperAndLowerCase(navn.mellomnavn)} ${formateStringInUpperAndLowerCase(navn.etternavn)}`}
					</BodyShort>
					<CopyButton
						copyText={fnr}
						text={`F.nr.: ${fnr}`}
						iconPosition="right"
						size="xsmall"
						className="bekreft-send-vedtak-modal-personinfo-copybutton"
					/>
				</div>
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

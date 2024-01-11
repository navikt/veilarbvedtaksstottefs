import { VarselModal } from '../varsel-modal/varsel-modal';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../store/modal-store';
import { useViewStore } from '../../../store/view-store';
import { FeilModalConfig } from './feil-modal-config';
import { Button, Heading, Modal } from '@navikt/ds-react';

interface FeilmodalProps extends ModalProps {
	config: FeilModalConfig;
}

export function FeilModal(props: FeilmodalProps) {
	const {
		isOpen,
		config: { tittel, beskrivelse, viewAction, knappeTekst }
	} = props;
	const { resetModalType } = useModalStore();
	const { changeView } = useViewStore();

	function handleRequestClose() {
		if (viewAction) {
			changeView(viewAction);
		}
		resetModalType();
	}

	return (
		<VarselModal isOpen={isOpen} onRequestClose={handleRequestClose} contentLabel="En feil har oppstått">
			<Modal.Header closeButton={knappeTekst == null}>
				<Heading level="1" size="medium">
					{tittel}
				</Heading>
			</Modal.Header>
			<Modal.Body>{beskrivelse}</Modal.Body>
			<Modal.Footer>
				{knappeTekst && (
					<Button size="small" variant="secondary" onClick={handleRequestClose}>
						{knappeTekst}
					</Button>
				)}
			</Modal.Footer>
		</VarselModal>
	);
}

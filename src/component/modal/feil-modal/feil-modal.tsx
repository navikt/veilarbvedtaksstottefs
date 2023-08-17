import { VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../store/modal-store';
import { useViewStore } from '../../../store/view-store';
import { FeilModalConfig } from './feil-modal-config';
import { Button } from '@navikt/ds-react';

interface FeilmodalProps extends ModalProps {
	config: FeilModalConfig;
}

export function FeilModal(props: FeilmodalProps) {
	const {
		isOpen,
		config: { tittel, beskrivelse, viewAction, knappeTekst }
	} = props;
	const { hideModal } = useModalStore();
	const { changeView } = useViewStore();

	function handleRequestClose() {
		if (viewAction) {
			changeView(viewAction);
		}
		hideModal();
	}

	return (
		<VarselModal
			isOpen={isOpen}
			onRequestClose={handleRequestClose}
			contentLabel="En feil har oppstått"
			closeButton={knappeTekst == null}
			shouldCloseOnOverlayClick={false}
		>
			<Systemtittel className="blokk-xxs">{tittel}</Systemtittel>
			<Normaltekst className="blokk-s">{beskrivelse}</Normaltekst>
			{knappeTekst && (
				<Button size="small" variant="secondary" onClick={handleRequestClose}>
					{knappeTekst}
				</Button>
			)}
		</VarselModal>
	);
}

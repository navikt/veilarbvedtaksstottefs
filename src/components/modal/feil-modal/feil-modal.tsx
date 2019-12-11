import React from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Knapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../stores/modal-store';
import { useViewStore } from '../../../stores/view-store';
import Show from '../../show';
import { FeilModalConfig } from './feil-modal-config';

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
			contentLabel="En feil har oppstått"
			onRequestClose={handleRequestClose}
			varselIkonType={VarselIkonType.FEIL}
			shouldCloseOnOverlayClick={false}
			closeButton={knappeTekst == null}
		>
			<Systemtittel className="blokk-xxs">{tittel}</Systemtittel>
			<Normaltekst className="blokk-s">{beskrivelse}</Normaltekst>
			<Show if={knappeTekst}>
				<Knapp onClick={handleRequestClose}>{knappeTekst}</Knapp>
			</Show>
		</VarselModal>
	);
}

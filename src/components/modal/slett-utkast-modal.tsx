import React from 'react';
import { VarselIkonType, VarselModal } from './varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalProps } from './modal-props';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { fetchSlettUtkast } from '../../rest/api';
import { useViewStore, ViewType } from '../../stores/view-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { useDataStore } from '../../stores/data-store';
import { hentId } from '../../utils';

function SlettUtkastModal(props: ModalProps) {
	const { hideModal, showModal } = useModalStore();
	const { utkast, setUtkast } = useDataStore();
	const { changeView } = useViewStore();
	const { resetSkjema } = useSkjemaStore();

	function handleOnDeleteClicked() {
		showModal(ModalType.LASTER);
		fetchSlettUtkast(hentId(utkast))
			.then(() => {
				resetSkjema();
				hideModal();
				changeView(ViewType.HOVEDSIDE);
				setUtkast(null);
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_SLETTING);
			});
	}

	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Bekreft slett utkast"
			onRequestClose={hideModal}
			varselIkonType={VarselIkonType.ADVARSEL}
		>
			<Systemtittel className="blokk-xxxs">Slett utkast</Systemtittel>
			<Normaltekst>Er du sikker på at du vil slette utkastet?</Normaltekst>
			<div className="varsel-modal__knapper">
				<Hovedknapp onClick={handleOnDeleteClicked}>Slett</Hovedknapp>
				<Knapp onClick={hideModal}> Avbryt</Knapp>
			</div>
		</VarselModal>
	);
}

export default SlettUtkastModal;

import React, { useState } from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../store/modal-store';

interface GodkjennModalProps extends ModalProps {
	onGodkjennUtkastBekreftet: () => void;
}

export function GodkjennModal(props: GodkjennModalProps) {
	const { hideModal } = useModalStore();
	const [laster] = useState(false);

	function handleOnRequestCloseModal() {
		if (!laster) {
			hideModal();
		}
	}

	const GodkjennVisning = (
		<>
			<Systemtittel className="blokk-xxxs">Godkjenn utkast</Systemtittel>
			<Normaltekst>
				<br />
				Er du sikker på at du vil godkjenne utkastet?
			</Normaltekst>
			<div className="varsel-modal__knapper">
				<Hovedknapp spinner={laster} disabled={laster} onClick={props.onGodkjennUtkastBekreftet}>
					GODKJENN
				</Hovedknapp>
				<Knapp disabled={laster} onClick={hideModal}>
					AVBRYT
				</Knapp>
			</div>
		</>
	);

	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Bekreft at vedtaket blir godkjent"
			onRequestClose={handleOnRequestCloseModal}
			varselIkonType={VarselIkonType.ADVARSEL}
		>
			{GodkjennVisning}
		</VarselModal>
	);
}

export default GodkjennModal;

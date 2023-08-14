import { useState } from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../store/modal-store';
import { Button } from '@navikt/ds-react';

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
				<Button size="small" loading={laster} onClick={props.onGodkjennUtkastBekreftet}>
					GODKJENN
				</Button>
				<Button size="small" variant="secondary" loading={laster} onClick={hideModal}>
					AVBRYT
				</Button>
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

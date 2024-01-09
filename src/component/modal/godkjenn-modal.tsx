import { useState } from 'react';
import { VarselModal } from './varsel-modal/varsel-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ModalProps } from './modal-props';
import { useModalStore } from '../../store/modal-store';
import { Button } from '@navikt/ds-react';

interface GodkjennModalProps extends ModalProps {
	onGodkjennUtkastBekreftet: () => void;
}

export function GodkjennModal(props: GodkjennModalProps) {
	const { resetModalType } = useModalStore();
	const [laster] = useState(false);

	function handleOnRequestCloseModal() {
		if (!laster) {
			resetModalType();
		}
	}

	return (
		<VarselModal
			isOpen={props.isOpen}
			onRequestClose={handleOnRequestCloseModal}
			contentLabel="Bekreft at vedtaket blir godkjent"
		>
			<Systemtittel className="varsel-modal__tittel">Godkjenn utkast</Systemtittel>
			<Normaltekst className="varsel-modal__tekstinnhold">
				Er du sikker på at du vil godkjenne utkastet?
			</Normaltekst>
			<div className="varsel-modal__knapper">
				<Button size="small" variant="secondary" loading={laster} onClick={resetModalType}>
					Avbryt
				</Button>
				<Button size="small" loading={laster} onClick={props.onGodkjennUtkastBekreftet}>
					Godkjenn
				</Button>
			</div>
		</VarselModal>
	);
}

export default GodkjennModal;

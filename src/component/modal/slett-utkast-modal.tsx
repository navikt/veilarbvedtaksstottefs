import { VarselIkonType, VarselModal } from './varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { ModalProps } from './modal-props';
import { ModalType, useModalStore } from '../../store/modal-store';
import { useViewStore, ViewType } from '../../store/view-store';
import { useSkjemaStore } from '../../store/skjema-store';
import { useDataStore } from '../../store/data-store';
import { hentId } from '../../util';
import { slettUtkast } from '../../api/veilarbvedtaksstotte/utkast';
import { Button } from '@navikt/ds-react';

function SlettUtkastModal(props: ModalProps) {
	const { hideModal, showModal } = useModalStore();
	const { utkast, setUtkast } = useDataStore();
	const { changeView } = useViewStore();
	const { resetSkjema } = useSkjemaStore();

	function handleOnDeleteClicked() {
		showModal(ModalType.LASTER);
		slettUtkast(hentId(utkast))
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
				<Button onClick={handleOnDeleteClicked}>Slett</Button>
				<Button variant="secondary" onClick={hideModal}>
					Avbryt
				</Button>
			</div>
		</VarselModal>
	);
}

export default SlettUtkastModal;

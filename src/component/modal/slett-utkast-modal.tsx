import { VarselModal } from './varsel-modal/varsel-modal';
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
	const { resetModalType, showModal } = useModalStore();
	const { utkast, setUtkast } = useDataStore();
	const { changeView } = useViewStore();
	const { resetSkjema } = useSkjemaStore();

	function handleOnDeleteClicked() {
		showModal(ModalType.LASTER);
		slettUtkast(hentId(utkast))
			.then(() => {
				resetSkjema();
				resetModalType();
				changeView(ViewType.HOVEDSIDE);
				setUtkast(null);
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_SLETTING);
			});
	}

	return (
		<VarselModal isOpen={props.isOpen} onRequestClose={resetModalType} contentLabel="Bekreft slett utkast">
			<Systemtittel className="varsel-modal__tittel">Slett utkast</Systemtittel>
			<Normaltekst className="varsel-modal__tekstinnhold">Er du sikker på at du vil slette utkastet?</Normaltekst>
			<div className="varsel-modal__knapper">
				<Button size="small" variant="secondary" onClick={resetModalType}>
					Avbryt
				</Button>
				<Button size="small" onClick={handleOnDeleteClicked}>
					Slett
				</Button>
			</div>
		</VarselModal>
	);
}

export default SlettUtkastModal;

import { useState } from 'react';
import { useTilgangStore } from '../../../store/tilgang-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil, SkjemaData } from '../../../util/skjema-utils';
import { useSkjemaStore } from '../../../store/skjema-store';
import { useViewStore, ViewType } from '../../../store/view-store';
import { useDataStore } from '../../../store/data-store';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { Utkast } from '../../../api/veilarbvedtaksstotte';
import { erKlarTilVeileder, finnGjeldendeVedtak } from '../../../util';
import { oppdaterVedtakUtkast } from '../../../api/veilarbvedtaksstotte/utkast';
import { Button, Loader } from '@navikt/ds-react';
import { ChevronLeftIcon, PersonPencilIcon, TrashIcon } from '@navikt/aksel-icons';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
}

function UtkastInnhold(props: UtkastAksjonerProps) {
	const { erAnsvarligVeileder } = useTilgangStore();
	const { malform, fattedeVedtak, utkast } = useDataStore();
	const { changeView } = useViewStore();
	const { showModal } = useModalStore();
	const { validerSkjema, setHarForsoktAForhandsvise } = useSkjemaStore();
	const { id: utkastId, beslutterProsessStatus } = utkast as Utkast;

	const [laster, setLaster] = useState(false);

	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);

	const visKlarTilBeslutter = erKlarTilVeileder(beslutterProsessStatus);
	const erForhandsvisHovedknapp = !visKlarTilBeslutter;

	function sendDataTilBackend() {
		// Vi oppdaterer ikke lagringStatus her fordi det blir rart at dette trigges på en "urelatert" handling
		return oppdaterVedtakUtkast(utkastId, hentMalformFraData(malform), props.vedtakskjema).catch(() => {
			setLaster(false);
			showModal(ModalType.FEIL_VED_LAGRING);
		});
	}

	function handleOnForhandsvisClicked() {
		const skjemaFeil = validerSkjema(gjeldendeVedtak);

		if (harFeil(skjemaFeil)) {
			scrollTilForsteFeil(skjemaFeil);
			setHarForsoktAForhandsvise(true);
			return;
		}

		if (erAnsvarligVeileder) {
			setLaster(true);
			sendDataTilBackend()
				.then(() => changeView(ViewType.FORHANDSVISNING))
				.catch();
		} else {
			changeView(ViewType.FORHANDSVISNING);
		}
	}

	function handleOnTilbakeClicked() {
		if (erAnsvarligVeileder) {
			setLaster(true);
			sendDataTilBackend()
				.then(() => changeView(ViewType.HOVEDSIDE))
				.catch();
		} else {
			changeView(ViewType.HOVEDSIDE);
		}
	}

	return (
		<div className="utkast-footer__utkast-innhold">
			<Button variant="tertiary" icon={<ChevronLeftIcon />} onClick={handleOnTilbakeClicked}>
				Tilbake
			</Button>

			<div className="utkast-footer--innhold-sidestilt">
				{laster && <Loader size="small" />}

				{erAnsvarligVeileder && (
					<Button
						variant="tertiary"
						loading={laster}
						icon={<TrashIcon />}
						onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
					>
						Slett
					</Button>
				)}

				{!erAnsvarligVeileder && (
					<Button
						variant="tertiary"
						loading={laster}
						icon={<PersonPencilIcon />}
						onClick={() => showModal(ModalType.BEKREFT_TA_OVER_UTKAST)}
					>
						Ta over
					</Button>
				)}

				<Button
					variant={erForhandsvisHovedknapp ? 'primary' : 'secondary'}
					loading={laster}
					onClick={handleOnForhandsvisClicked}
				>
					Forhåndsvis
				</Button>
			</div>
		</div>
	);
}

export default UtkastInnhold;

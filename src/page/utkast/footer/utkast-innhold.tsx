import React, { useState } from 'react';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { ReactComponent as SlettIkon } from './delete.svg';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { ReactComponent as TaOverIkon } from './taover.svg';
import { useTilgangStore } from '../../../store/tilgang-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil, SkjemaData } from '../../../util/skjema-utils';
import { useSkjemaStore } from '../../../store/skjema-store';
import { useViewStore, ViewType } from '../../../store/view-store';
import { useDataStore } from '../../../store/data-store';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { Vedtak } from '../../../api/veilarbvedtaksstotte';
import { erKlarTilVeileder, finnGjeldendeVedtak } from '../../../util';
import { oppdaterVedtakUtkast } from '../../../api/veilarbvedtaksstotte/utkast';
import Show from '../../../component/show';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
}

function UtkastInnhold(props: UtkastAksjonerProps) {
	const { erAnsvarligVeileder } = useTilgangStore();
	const { malform, fattedeVedtak, utkast } = useDataStore();
	const { changeView } = useViewStore();
	const { showModal } = useModalStore();
	const { validerSkjema, setHarForsoktAForhandsvise } = useSkjemaStore();
	const { id: utkastId, beslutterProsessStatus } = utkast as Vedtak;

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

		setLaster(true);
		sendDataTilBackend().then(() => changeView(ViewType.FORHANDSVISNING));
	}

	function handleOnTilbakeClicked() {
		setLaster(true);
		sendDataTilBackend().then(() => changeView(ViewType.HOVEDSIDE));
	}

	return (
		<div className="utkast-footer__utkast-innhold">
			<Tilbakeknapp htmlType="button" onClick={handleOnTilbakeClicked} disabled={laster} />

			<div className="utkast-footer__knapper-hoyre utkast-footer--innhold-sidestilt">
				<Show if={laster}>
					<NavFrontendSpinner className="utkast-footer__spinner" type="XS" />
				</Show>

				<Show if={erAnsvarligVeileder}>
					<Flatknapp
						mini={true}
						htmlType="button"
						onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
						disabled={laster}
					>
						<SlettIkon className="utkast_footer__knapp-ikon" />
						Slett
					</Flatknapp>
				</Show>

				<Show if={!erAnsvarligVeileder}>
					<Flatknapp
						mini={true}
						htmlType="button"
						onClick={() => showModal(ModalType.BEKREFT_TA_OVER_UTKAST)}
						disabled={laster}
					>
						<TaOverIkon className="utkast_footer__knapp-ikon" />
						Ta over
					</Flatknapp>
				</Show>

				<Knapp
					className="utkast-footer__forhandsvis-knapp"
					type={erForhandsvisHovedknapp ? 'hoved' : 'standard'}
					disabled={laster}
					mini={true}
					htmlType="button"
					onClick={handleOnForhandsvisClicked}
				>
					Forhåndsvis
				</Knapp>
			</div>
		</div>
	);
}

export default UtkastInnhold;

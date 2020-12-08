import React, { useState } from 'react';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { ReactComponent as SlettIkon } from './delete.svg';
import { fetchOppdaterVedtakUtkast } from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil, SkjemaData } from '../../../utils/skjema-utils';
import Show from '../../../components/show';
import { Normaltekst } from 'nav-frontend-typografi';
import { erKlarTilVeileder, finnGjeldendeVedtak, mapSkjemaLagringStatusTilTekst } from '../../../utils';
import { useDataStore } from '../../../stores/data-store';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Vedtak } from '../../../rest/data/vedtak';
import './aksjoner.less';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

function UtkastInnhold(props: UtkastAksjonerProps) {
	const { malform, fattedeVedtak, utkast } = useDataStore();
	const { changeView } = useViewStore();
	const { showModal } = useModalStore();
	const { validerSkjema, lagringStatus } = useSkjemaStore();
	const { id: utkastId, beslutterProsessStatus } = utkast as Vedtak;

	const [laster, setLaster] = useState(false);

	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);

	const visKlarTilBeslutter = erKlarTilVeileder(beslutterProsessStatus);
	const erForhandsvisHovedknapp = !visKlarTilBeslutter;

	function sendDataTilBackend() {
		// Vi oppdaterer ikke lagringStatus her fordi det blir rart at dette trigges på en "urelatert" handling
		const params = { vedtakId: utkastId, skjema: props.vedtakskjema, malform: hentMalformFraData(malform) };
		return fetchOppdaterVedtakUtkast(params).catch(() => {
			setLaster(false);
			showModal(ModalType.FEIL_VED_LAGRING);
		});
	}

	function handleOnForhandsvisClicked() {
		const skjemaFeil = validerSkjema(gjeldendeVedtak);

		if (harFeil(skjemaFeil)) {
			scrollTilForsteFeil(skjemaFeil);
			props.harForsoktForhandsvisning();
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
			<div className="utkast-footer--innhold-sidestilt">
				<Tilbakeknapp htmlType="button" onClick={handleOnTilbakeClicked} disabled={laster} />
				<Normaltekst>{mapSkjemaLagringStatusTilTekst(lagringStatus)}</Normaltekst>
			</div>

			<div className="utkast-footer--innhold-sidestilt">
				<Show if={laster}>
					<NavFrontendSpinner type="XS" />
				</Show>

				<Knapp
					type={erForhandsvisHovedknapp ? 'hoved' : 'standard'}
					disabled={laster}
					mini={true}
					htmlType="button"
					onClick={handleOnForhandsvisClicked}
				>
					Forhåndsvis
				</Knapp>

				<Flatknapp
					mini={true}
					htmlType="button"
					onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
					disabled={laster}
				>
					<SlettIkon className="aksjoner__ikon" />
					Slett
				</Flatknapp>
			</div>
		</div>
	);
}

export default UtkastInnhold;

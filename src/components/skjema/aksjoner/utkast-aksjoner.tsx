import React, { useState } from 'react';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ReactComponent as SlettIkon } from './delete.svg';
import { ReactComponent as TaOverIkon } from './locked.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { SkjemaData } from '../../../pages/vedtakskjema/vedtakskjema-side';
import { fetchWithInfo } from '../../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo } from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { useFetchStore } from '../../../stores/fetch-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil } from '../skjema-utils';
import Show from '../../show';
import './aksjoner.less';

interface UtkastAksjonerProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

function UtkastAksjoner(props: UtkastAksjonerProps) {
	const { fnr } = useAppStore();
	const { vedtak, arenaVedtak, malform } = useFetchStore();
	const { changeView } = useViewStore();
	const { showModal } = useModalStore();
	const { validerSkjema , isReadOnly } = useSkjemaStore();

	const [visForhandsvisngLaster, setVisForhandsvisngLaster] = useState(false);
	const [visLagreVedtakLaster, setVisLagreVedtakLaster] = useState(false);

	const arenaVedtakData = arenaVedtak.data ? arenaVedtak.data : [];

		function sendDataTilBackend() {
		const params = {fnr, skjema: props.vedtakskjema, malform: hentMalformFraData(malform.data)};
		return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo(params))
			.catch(() => {
				setVisForhandsvisngLaster(false);
				setVisLagreVedtakLaster(false);
				showModal(ModalType.FEIL_VED_LAGRING);
			});
	}

	function handleForhandsvisOgLagre() {
		const skjemaFeil = validerSkjema(vedtak.data, arenaVedtakData);

		if (harFeil(skjemaFeil)) {
			scrollTilForsteFeil(skjemaFeil);
			props.harForsoktForhandsvisning();
			return;
		}

		setVisForhandsvisngLaster(true);

		sendDataTilBackend().then(() => {
			changeView(ViewType.FORHANDSVISNING);
		});
	}

	function handleForhandsvis() {
		const skjemaFeil = validerSkjema(vedtak.data, arenaVedtakData);

		if (harFeil(skjemaFeil)) return;

		setVisForhandsvisngLaster(true);
		changeView(ViewType.FORHANDSVISNING);
	}

	function handleLagreOgTilbake() {
		setVisLagreVedtakLaster(true);

		sendDataTilBackend().then(() => {
			vedtak.fetch({ fnr });
			changeView(ViewType.HOVEDSIDE);
		});
	}

	function handleTilbake() {
		setVisLagreVedtakLaster(true);
		changeView(ViewType.HOVEDSIDE);
	}

	return (
		<div className="aksjoner">
			<div className="aksjoner__knapper">
				<Hovedknapp
					spinner={visForhandsvisngLaster}
					disabled={visForhandsvisngLaster}
					mini={true}
					htmlType="submit"
					onClick={isReadOnly ? handleForhandsvis : handleForhandsvisOgLagre}
				>
					Forhåndsvis
				</Hovedknapp>
				<Knapp
					spinner={visLagreVedtakLaster}
					disabled={visLagreVedtakLaster}
					mini={true}
					htmlType="button"
					onClick={isReadOnly ? handleTilbake : handleLagreOgTilbake}
				>
					{isReadOnly ? 'Tilbake' : 'Lagre og gå tilbake'}
				</Knapp>
			</div>
			<Show if={!isReadOnly}>
				<Flatknapp
					className="aksjoner__ikon-knapp"
					mini={true}
					htmlType="button"
					onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
				>
					<SlettIkon className="aksjoner__ikon"/>
					Slett
				</Flatknapp>
			</Show>
			<Show if={isReadOnly}>
				<Flatknapp
					className="aksjoner__ikon-knapp"
					mini={true}
					htmlType="button"
					onClick={() => showModal(ModalType.BEKREFT_TA_OVER_UTKAST)}
				>
					<TaOverIkon className="aksjoner__ikon"/>
					Ta over vedtak
				</Flatknapp>
			</Show>
		</div>
	);
}

export default UtkastAksjoner;
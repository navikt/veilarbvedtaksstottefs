import React, { useState } from 'react';
import './aksjoner.less';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ReactComponent as SlettIkon } from './slett.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { SkjemaData } from '../../../pages/vedtakskjema/vedtakskjema-side';
import { fetchWithInfo } from '../../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo } from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { useFetchStore } from '../../../stores/fetch-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { harFeil, hentMalformFraData, scrollTilForsteFeil } from '../skjema-utils';

interface AksjonerProps {
	vedtakskjema: SkjemaData;
	harForsoktForhandsvisning: () => void;
}

function Aksjoner(props: AksjonerProps) {
	const { fnr } = useAppStore();
	const { vedtak, malform } = useFetchStore();
	const { changeView } = useViewStore();
	const { showModal } = useModalStore();
	const { validerSkjema } = useSkjemaStore();

	const [visForhandsvisngLaster, setVisForhandsvisngLaster] = useState(false);
	const [visLagreVedtakLaster, setVisLagreVedtakLaster] = useState(false);

	function sendDataTilBackend() {
		const params = {fnr, skjema: props.vedtakskjema, malform: hentMalformFraData(malform.data)};
		return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo(params))
			.catch(() => {
				setVisForhandsvisngLaster(false);
				setVisLagreVedtakLaster(false);
				showModal(ModalType.FEIL_VED_LAGRING);
			});
	}

	function handleForhandsvis() {
		const skjemaFeil = validerSkjema();

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

	function handleLagreOgTilbake() {
		setVisLagreVedtakLaster(true);

		sendDataTilBackend().then(() => {
			vedtak.fetch({ fnr });
			changeView(ViewType.HOVEDSIDE);
		});
	}

	return (
		<div className="aksjoner">
			<div className="aksjoner__knapper">
				<Hovedknapp
					spinner={visForhandsvisngLaster}
					disabled={visForhandsvisngLaster}
					mini={true}
					htmlType="submit"
					onClick={handleForhandsvis}
				>
					Forhåndsvis og ferdigstill
				</Hovedknapp>
				<Knapp
					spinner={visLagreVedtakLaster}
					disabled={visLagreVedtakLaster}
					mini={true}
					htmlType="button"
					onClick={handleLagreOgTilbake}
				>
					Lagre og gå tilbake
				</Knapp>
			</div>
			<Flatknapp
				className="aksjoner__slett"
				mini={true}
				htmlType="button"
				onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
			>
				<SlettIkon className="aksjoner__slett-ikon" />
				Slett
			</Flatknapp>
		</div>
	);
}

export default Aksjoner;

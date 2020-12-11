import React, { useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Vedtak } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import nyttVedtakBilde from './nytt-vedtak.svg';
import { fetchLagNyttUtkast, fetchOppdaterVedtakUtkast, fetchUtkast, OppdaterUtkastPayload } from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import { useDataStore } from '../../../stores/data-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { VeilederTilgang } from '../../../utils/tilgang';
import { useTilgangStore } from '../../../stores/tilgang-store';
import { logMetrikk } from '../../../utils/logger';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import './nytt-vedtak-panel.less';

export function NyttVedtakPanel(props: { utkast: OrNothing<Vedtak> }) {
	const { fnr } = useAppStore();
	const { showModal, hideModal } = useModalStore();
	const { oppfolgingData, fattedeVedtak, setMeldinger, setUtkast } = useDataStore();
	const { setVeilederTilgang } = useTilgangStore();
	const { changeView } = useViewStore();
	const { initSkjema } = useSkjemaStore();

	const [kopierSisteVedtak, setKopierSisteVedtak] = useState(false);

	const { utkast } = props;

	const sisteVedtak: Vedtak | undefined = fattedeVedtak.sort((fv1, fv2) => fv2.id - fv1.id)[0];

	function lagNyttVedtakUtkastOgRedirectTilUtkast() {
		showModal(ModalType.LASTER);
		fetchLagNyttUtkast(fnr)
			.then(() => fetchUtkast(fnr)) // TODO: Kunne egentlig droppet fetchUtkast() hvis man returnerte det opprettede utkastet
			.then(async fetchResponse => {
				if (!fetchResponse.data) {
					throw Error('Fant ikke utkast');
				}

				const nyttUtkast = fetchResponse.data;

				if (kopierSisteVedtak && sisteVedtak) {
					const payload: OppdaterUtkastPayload = {
						vedtakId: nyttUtkast.id,
						malform: null,
						skjema: {
							opplysninger: sisteVedtak.opplysninger,
							begrunnelse: sisteVedtak.begrunnelse,
							hovedmal: null,
							innsatsgruppe: null
						}
					};

					nyttUtkast.opplysninger = sisteVedtak.opplysninger;
					nyttUtkast.begrunnelse = sisteVedtak.begrunnelse;

					await fetchOppdaterVedtakUtkast(payload);
				}

				setUtkast(nyttUtkast);
				initSkjema(nyttUtkast);

				setVeilederTilgang(VeilederTilgang.ANSVARLIG_VEILEDER);
				setMeldinger([]); // Rydd opp hvis det ligger gamle meldinger mellomlagret

				hideModal();
				changeView(ViewType.UTKAST);

				logMetrikk('lag-nytt-vedtak', { kopierteFraSisteVedtak: kopierSisteVedtak });
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_OPPRETTING_AV_UTKAST);
			});
	}

	if (utkast || !oppfolgingData.underOppfolging) {
		return null;
	}

	return (
		<HovedsidePanel className="vedtakstottepanel nytt-vedtak-panel">
			<div className="vedtakstottepanel__tittel">
				<Undertittel tag="h1">Opprett nytt oppfølgingsvedtak</Undertittel>
			</div>
			<div className="vedtakstottepanel__content">
				<img src={nyttVedtakBilde} className="vedtakstottepanel__ikon" alt="" />
				<div>
					<Checkbox
						disabled={!sisteVedtak}
						className="blokk-m"
						label="Kopier kilder og begrunnelse fra siste vedtak"
						checked={kopierSisteVedtak}
						onChange={e => setKopierSisteVedtak(e.target.checked)}
					/>
					<Hovedknapp onClick={lagNyttVedtakUtkastOgRedirectTilUtkast}>Opprett vedtak</Hovedknapp>
				</div>
			</div>
		</HovedsidePanel>
	);
}

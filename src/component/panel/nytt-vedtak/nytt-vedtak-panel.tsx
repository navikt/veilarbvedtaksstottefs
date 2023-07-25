import { useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { OrNothing } from '../../../util/type/ornothing';
import nyttVedtakBilde from './nytt-vedtak.svg';
import { useViewStore, ViewType } from '../../../store/view-store';
import { useAppStore } from '../../../store/app-store';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import { useDataStore } from '../../../store/data-store';
import { useSkjemaStore } from '../../../store/skjema-store';
import { VeilederTilgang } from '../../../util/tilgang';
import { useTilgangStore } from '../../../store/tilgang-store';
import { logMetrikk } from '../../../util/logger';
import { Checkbox } from 'nav-frontend-skjema';
import { Utkast, Vedtak } from '../../../api/veilarbvedtaksstotte';
import { fetchUtkast, lagNyttUtkast, oppdaterVedtakUtkast } from '../../../api/veilarbvedtaksstotte/utkast';
import { Button } from '@navikt/ds-react';
import './nytt-vedtak-panel.less';

export function NyttVedtakPanel(props: { utkast: OrNothing<Utkast> }) {
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
		lagNyttUtkast(fnr)
			.then(() => fetchUtkast(fnr)) // TODO: Kunne egentlig droppet fetchUtkast() hvis man returnerte det opprettede utkastet
			.then(async fetchResponse => {
				if (!fetchResponse.data) {
					throw Error('Fant ikke utkast');
				}

				const nyttUtkast = fetchResponse.data;

				if (kopierSisteVedtak && sisteVedtak) {
					const skjema = {
						opplysninger: sisteVedtak.opplysninger,
						begrunnelse: sisteVedtak.begrunnelse,
						hovedmal: null,
						innsatsgruppe: null
					};

					nyttUtkast.opplysninger = sisteVedtak.opplysninger;
					nyttUtkast.begrunnelse = sisteVedtak.begrunnelse;

					await oppdaterVedtakUtkast(nyttUtkast.id, null, skjema);
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
					<Button onClick={lagNyttVedtakUtkastOgRedirectTilUtkast}>Opprett vedtak</Button>
				</div>
			</div>
		</HovedsidePanel>
	);
}

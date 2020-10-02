import React, { useEffect, useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import { PILOT_TOGGLE, STOPPE_VEDTAKSUTSENDING_TOGGLE } from '../../rest/data/features';
import { trengerBeslutter } from '../../utils/skjema-utils';
import { frontendlogger } from '../../utils/frontend-logger';
import { fetchFattedeVedtak, fetchFattVedtak, lagHentForhandsvisningUrl } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, ViewType } from '../../stores/view-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { erGodkjentAvBeslutter } from '../../utils';
import { lagMockVedtaksbrevUrl } from '../../mock/mock-utils';
import Show from '../../components/show';
import { useTilgangStore } from '../../stores/tilgang-store';
import { useDataStore } from '../../stores/data-store';
import './forhandsvisning.less';
import { Vedtak } from '../../rest/data/vedtak';
import { useVarselStore, VarselType } from '../../stores/varsel-store';

export function Forhandsvisning() {
	const { fnr } = useAppStore();
	const { changeView } = useViewStore();
	const { utkast, setUtkast, features, setFattedeVedtak } = useDataStore();
	const { showModal, hideModal } = useModalStore();
	const { showVarsel } = useVarselStore();
	const { innsatsgruppe, hovedmal, resetSkjema } = useSkjemaStore();
	const { kanEndreUtkast } = useTilgangStore();
	const [pdfStatus, setPdfStatus] = useState<PDFStatus>(PDFStatus.NOT_STARTED);

	const {id: utkastId, beslutterProsessStatus} = utkast as Vedtak;

	const stoppeUtsendingfeatureToggle = features[STOPPE_VEDTAKSUTSENDING_TOGGLE] && !features[PILOT_TOGGLE];
	const url = env.isProduction
		? lagHentForhandsvisningUrl(utkastId)
		: lagMockVedtaksbrevUrl(innsatsgruppe, hovedmal);

	const erUtkastKlartTilUtsending = trengerBeslutter(innsatsgruppe)
		? erGodkjentAvBeslutter(beslutterProsessStatus)
		: true;

	const tilbakeTilSkjema = () => {
		changeView(ViewType.UTKAST);
		frontendlogger.logMetrikk('tilbake-fra-forhandsvisning');
	};

	useEffect(() => {
		if (pdfStatus === PDFStatus.ERROR) {
			showModal(ModalType.FEIL_VED_FORHANDSVISNING);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pdfStatus]);

	const sendVedtak = () => {
		showModal(ModalType.LASTER);

		fetchFattVedtak(utkastId)
			.catch(err => {
				showModal(ModalType.FEIL_VED_SENDING);
				frontendlogger.logMetrikk('feil-ved-sending', err);
				throw err;
			})
			.then(() => {
				return fetchFattedeVedtak(fnr)
					.then(fattedeVedtak => {
						if (fattedeVedtak.data) {
							setFattedeVedtak(fattedeVedtak.data);
						}
					})
					// Feiler ikke selv om fattede vedtak ikke oppdateres
					.finally(() => {
						resetSkjema();
						hideModal();
						changeView(ViewType.HOVEDSIDE);
						showVarsel(VarselType.VEDTAK_SENT_SUKSESS);
						setUtkast(null);
					});
			});
	};

	const handleOnSendClicked = () => {
		if (stoppeUtsendingfeatureToggle) {
			showModal(ModalType.FEIL_UTSENDING_STOPPET);
			return;
		}

		showModal(ModalType.BEKREFT_SEND_VEDTAK, { onSendVedtakBekreftet: sendVedtak });
	};

	return (
		<>
			<PdfViewer url={url} title="Forhåndsvisning av vedtaksbrevet" onStatusUpdate={setPdfStatus} />
			<Footer className="forhandsvisning__footer">
				<div className="forhandsvisning__aksjoner">
					<Show if={kanEndreUtkast && erUtkastKlartTilUtsending}>
						<Hovedknapp
							disabled={pdfStatus !== PDFStatus.SUCCESS}
							mini={true}
							onClick={handleOnSendClicked}
							className="forhandsvisning__knapp-sender"
						>
							Send til bruker
						</Hovedknapp>
					</Show>
					<Knapp mini={true} htmlType="button" onClick={tilbakeTilSkjema}>
						Tilbake til utkast
					</Knapp>
				</div>
			</Footer>
		</>
	);
}

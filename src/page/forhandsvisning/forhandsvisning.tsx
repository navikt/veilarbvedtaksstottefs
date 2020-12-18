import React, { useEffect, useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import PdfViewer, { PDFStatus } from '../../component/pdf-viewer/pdf-viewer';
import Footer from '../../component/footer/footer';
import { trengerBeslutter } from '../../util/skjema-utils';
import { useAppStore } from '../../store/app-store';
import { useViewStore, ViewType } from '../../store/view-store';
import { ModalType, useModalStore } from '../../store/modal-store';
import { useSkjemaStore } from '../../store/skjema-store';
import { erGodkjentAvBeslutter } from '../../util';
import Show from '../../component/show';
import { useTilgangStore } from '../../store/tilgang-store';
import { useDataStore } from '../../store/data-store';
import './forhandsvisning.less';
import { useVarselStore } from '../../store/varsel-store';
import { VarselType } from '../../component/varsel/varsel-type';
import { logMetrikk } from '../../util/logger';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { PILOT_TOGGLE, STOPPE_VEDTAKSUTSENDING_TOGGLE } from '../../api/veilarbpersonflatefs';
import { hentFattedeVedtak, lagHentForhandsvisningUrl } from '../../api/veilarbvedtaksstotte/vedtak';
import { fattVedtak } from '../../api/veilarbvedtaksstotte/utkast';

export function Forhandsvisning() {
	const { fnr } = useAppStore();
	const { changeView } = useViewStore();
	const { utkast, setUtkast, features, setFattedeVedtak } = useDataStore();
	const { showModal, hideModal } = useModalStore();
	const { showVarsel } = useVarselStore();
	const { innsatsgruppe, resetSkjema } = useSkjemaStore();
	const { kanEndreUtkast } = useTilgangStore();
	const [pdfStatus, setPdfStatus] = useState<PDFStatus>(PDFStatus.NOT_STARTED);

	const { id: utkastId, beslutterProsessStatus } = utkast as Vedtak;

	const stoppeUtsendingfeatureToggle = features[STOPPE_VEDTAKSUTSENDING_TOGGLE] && !features[PILOT_TOGGLE];
	const url = lagHentForhandsvisningUrl(utkastId);

	const erUtkastKlartTilUtsending = trengerBeslutter(innsatsgruppe)
		? erGodkjentAvBeslutter(beslutterProsessStatus)
		: true;

	const tilbakeTilSkjema = () => {
		changeView(ViewType.UTKAST);
		logMetrikk('tilbake-fra-forhandsvisning');
	};

	useEffect(() => {
		if (pdfStatus === PDFStatus.ERROR) {
			showModal(ModalType.FEIL_VED_FORHANDSVISNING);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pdfStatus]);

	const sendVedtak = () => {
		showModal(ModalType.LASTER);

		fattVedtak(utkastId)
			.catch(err => {
				showModal(ModalType.FEIL_VED_SENDING);
				logMetrikk('feil-ved-sending', err);
				throw err;
			})
			.then(() => {
				return (
					hentFattedeVedtak(fnr)
						.then(response => {
							if (response.data) {
								setFattedeVedtak(response.data);
							}
						})
						// Feiler ikke selv om fattede vedtak ikke oppdateres
						.finally(() => {
							resetSkjema();
							hideModal();
							changeView(ViewType.HOVEDSIDE);
							showVarsel(VarselType.VEDTAK_SENT_SUKSESS);
							setUtkast(null);
						})
				);
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
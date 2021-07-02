import React, { useEffect, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import PdfViewer, { PDFStatus } from '../../component/pdf-viewer/pdf-viewer';
import Footer from '../../component/footer/footer';
import { trengerKvalitetssikrer } from '../../util/skjema-utils';
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
import { Utkast } from '../../api/veilarbvedtaksstotte';
import { STOPPE_VEDTAKSUTSENDING_TOGGLE } from '../../api/veilarbpersonflatefs';
import { hentFattedeVedtak, lagHentForhandsvisningUrl } from '../../api/veilarbvedtaksstotte/vedtak';
import { fattVedtak } from '../../api/veilarbvedtaksstotte/utkast';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import AlertStripe from 'nav-frontend-alertstriper';

export function Forhandsvisning() {
	const { fnr } = useAppStore();
	const { changeView } = useViewStore();
	const { utkast, setUtkast, setFattedeVedtak } = useDataStore();
	const { features } = useAppStore();
	const { showModal, hideModal } = useModalStore();
	const { showVarsel } = useVarselStore();
	const { innsatsgruppe, resetSkjema } = useSkjemaStore();
	const { kanEndreUtkast } = useTilgangStore();
	const [pdfStatus, setPdfStatus] = useState<PDFStatus>(PDFStatus.NOT_STARTED);
	const { id: utkastId, beslutterProsessStatus } = utkast as Utkast;

	const stoppeUtsendingFeatureToggle = features[STOPPE_VEDTAKSUTSENDING_TOGGLE];
	const url = lagHentForhandsvisningUrl(utkastId);

	const erUtkastKlartTilUtsending = trengerKvalitetssikrer(innsatsgruppe)
		? erGodkjentAvBeslutter(beslutterProsessStatus)
		: true;

	const visSendKnapp = kanEndreUtkast && erUtkastKlartTilUtsending;

	const visKvalitetssikringInfo =
		!visSendKnapp &&
		trengerKvalitetssikrer(innsatsgruppe) &&
		!erGodkjentAvBeslutter(utkast?.beslutterProsessStatus);

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
		if (stoppeUtsendingFeatureToggle) {
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
					<Tilbakeknapp htmlType="button" onClick={tilbakeTilSkjema} />

					<Show if={visSendKnapp}>
						<Hovedknapp
							disabled={pdfStatus !== PDFStatus.SUCCESS}
							mini={true}
							onClick={handleOnSendClicked}
						>
							Send til bruker
						</Hovedknapp>
					</Show>
					<Show if={visKvalitetssikringInfo}>
						<AlertStripe className="forhandsvisning__utsending-varsel" type="info" form="inline">
							<span aria-live="polite">Kvalitetssikring må gjennomføres før brev kan sendes</span>
						</AlertStripe>
					</Show>
				</div>
			</Footer>
		</>
	);
}

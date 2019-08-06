import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import { STOPPE_VEDTAKSINNSENDING_TOGGLE } from '../../rest/data/features';
import { utkastetSkalKvalitetssikrets } from '../../components/skjema/skjema-utils';
import { VedtakData } from '../../rest/data/vedtak';
import { frontendlogger } from '../../utils/frontend-logger';
import { useFetchStore } from '../../stores/fetch-store';
import { lagHentForhandsvisningUrl, lagSendVedtakFetchInfo } from '../../rest/api';
import { fetchWithInfo } from '../../rest/utils';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, ViewType } from '../../stores/view-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import './forhandsvisning.less';
import { useSkjemaStore } from '../../stores/skjema-store';

export function Forhandsvisning() {
	const { fnr } = useAppStore();
	const { changeView } = useViewStore();
	const { vedtak, features } = useFetchStore();
	const { showModal } = useModalStore();
	const { innsatsgruppe } = useSkjemaStore();
	const [pdfStatus, setPdfStatus] = useState<PDFStatus>(PDFStatus.NOT_STARTED);

	const kvalitetssikresVarsel = utkastetSkalKvalitetssikrets(innsatsgruppe);
	const stoppeInnsendingfeatureToggle = features.data[STOPPE_VEDTAKSINNSENDING_TOGGLE];

	const url = env.isDevelopment ? vedtaksBrevUrl : lagHentForhandsvisningUrl(fnr);

	const tilbakeTilSkjema = () => {
		changeView(ViewType.UTKAST);
		frontendlogger.logMetrikk('tilbake-fra-forhandsvisning');
	};

	useEffect(() => {
		if (pdfStatus === PDFStatus.ERROR) {
			showModal(ModalType.FEIL_VED_FORHANDSVISNING);
		}
	}, [pdfStatus]);

	const tilbakeTilHovedsiden = () => {
		vedtak.fetch({ fnr }, () => {
			changeView(ViewType.HOVEDSIDE);
			showModal(ModalType.VEDTAK_SENT_SUKSESS);
		});
	};

	const sendVedtak = (beslutter?: string) => {
		showModal(ModalType.LASTER);

		fetchWithInfo(lagSendVedtakFetchInfo({ fnr, beslutter }))
			.then(() => {
				tilbakeTilHovedsiden();
			})
			.catch(err => {
				showModal(ModalType.FEIL_VED_SENDING);
				frontendlogger.logMetrikk('feil-ved-sending', err);
			});
	};

	const handleOnSendClicked = () => {
		if (stoppeInnsendingfeatureToggle) {
			showModal(ModalType.FEIL_INNSENDING_STOPPET);
			return;
		}

		if (kvalitetssikresVarsel) {
			showModal(ModalType.KVALITETSSIKRING, { sendVedtak });
			return;
		}

		sendVedtak();
	};

	return (
		<>
			<PdfViewer url={url} title="Forhåndsvisning av vedtaksbrevet" onStatusUpdate={setPdfStatus} />
			<Footer className="forhandsvisning__footer">
				<div className="forhandsvisning__aksjoner">
					<Hovedknapp mini={true} onClick={handleOnSendClicked} className="forhandsvisning__knapp-sender">
						Send til bruker
					</Hovedknapp>
					<Knapp mini={true} htmlType="button" onClick={tilbakeTilSkjema}>
						Tilbake til utkast
					</Knapp>
				</div>
			</Footer>
		</>
	);
}

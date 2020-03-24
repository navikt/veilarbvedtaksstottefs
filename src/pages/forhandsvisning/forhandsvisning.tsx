import React, { useEffect, useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import { STOPPE_VEDTAKSUTSENDING_TOGGLE } from '../../rest/data/features';
import { trengerBeslutter } from '../../components/utkast-skjema/skjema-utils';
import { frontendlogger } from '../../utils/frontend-logger';
import { useFetchStore } from '../../stores/fetch-store';
import { lagHentForhandsvisningUrl, lagSendVedtakFetchInfo } from '../../rest/api';
import { fetchWithInfo } from '../../rest/utils';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, ViewType } from '../../stores/view-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { finnUtkastAlltid } from '../../utils';
import { getMockVedtaksbrevUrl } from '../../mock/mock-utils';
import './forhandsvisning.less';
import Show from '../../components/show';
import { useSkjemaTilgangStore } from '../../stores/skjema-tilgang-store';

export function Forhandsvisning() {
	const { fnr } = useAppStore();
	const { changeView } = useViewStore();
	const { vedtak, features, oppfolgingData } = useFetchStore();
	const { showModal } = useModalStore();
	const { innsatsgruppe, resetSkjema } = useSkjemaStore();
	const { isReadOnly } = useSkjemaTilgangStore();

	const [pdfStatus, setPdfStatus] = useState<PDFStatus>(PDFStatus.NOT_STARTED);
	const stoppeUtsendingfeatureToggle = features.data[STOPPE_VEDTAKSUTSENDING_TOGGLE];
	const url = env.isProduction
		? lagHentForhandsvisningUrl(fnr)
		: getMockVedtaksbrevUrl();

	const utkast = finnUtkastAlltid(vedtak.data);
	const erUtkastKlartTilUtsending = trengerBeslutter(innsatsgruppe)
		? utkast.godkjentAvBeslutter
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

		fetchWithInfo(lagSendVedtakFetchInfo({ fnr }))
			.then(() => {
                resetSkjema();
				vedtak.fetch({ fnr }, () => {
					const sendesVedtakDigitalt = !oppfolgingData.data.reservasjonKRR;
					changeView(ViewType.HOVEDSIDE);
					showModal(ModalType.VEDTAK_SENT_SUKSESS, { sendesVedtakDigitalt });
				});
			})
			.catch(err => {
				showModal(ModalType.FEIL_VED_SENDING);
				frontendlogger.logMetrikk('feil-ved-sending', err);
			});
	};

	const handleOnSendClicked = () => {
		if (stoppeUtsendingfeatureToggle) {
			showModal(ModalType.FEIL_UTSENDING_STOPPET);
			return;
		}

		sendVedtak();
	};

	return (
		<>
			<PdfViewer url={url} title="Forhåndsvisning av vedtaksbrevet" onStatusUpdate={setPdfStatus} />
			<Footer className="forhandsvisning__footer">
				<div className="forhandsvisning__aksjoner">
					<Show if={!isReadOnly && erUtkastKlartTilUtsending}>
						<Hovedknapp disabled={pdfStatus !== PDFStatus.SUCCESS} mini={true} onClick={handleOnSendClicked} className="forhandsvisning__knapp-sender">
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

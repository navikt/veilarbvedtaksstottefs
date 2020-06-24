import React, { useEffect, useState } from 'react';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import { Hovedknapp } from 'nav-frontend-knapper';
import { frontendlogger } from '../../utils/frontend-logger';
import { lagHentVedtakPdfUrl } from '../../rest/api';
import { useViewStore, ViewType } from '../../stores/view-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { getMockVedtaksbrevUrl } from '../../mock/mock-utils';
import './vedtaksbrev-visning.less';

interface VedtaksbrevVisningProps {
	vedtakId?: number;
	dokumentInfoId: string;
	journalpostId: string;
}

export function VedtaksbrevVisning(props: VedtaksbrevVisningProps) {
	const { changeView } = useViewStore();
	const { showModal } = useModalStore();
	const [pdfStatus, setPdfStatus] = useState<PDFStatus>(PDFStatus.NOT_STARTED);

	const url = env.isProduction
		? lagHentVedtakPdfUrl(props.dokumentInfoId, props.journalpostId)
		: getMockVedtaksbrevUrl();

	function handleOnTilbakeClicked() {
		if (props.vedtakId) {
			changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId });
		} else {
			changeView(ViewType.HOVEDSIDE);
		}
	}

	useEffect(() => frontendlogger.logMetrikk('vis-vedtaksbrev'), []);

	useEffect(() => {
		if (pdfStatus === PDFStatus.ERROR) {
			showModal(ModalType.FEIL_VED_VISNING);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pdfStatus]);

	return (
		<>
			<PdfViewer url={url} title="Visning av vedtaksbrev" onStatusUpdate={setPdfStatus} />
			<Footer>
				<div className="vedtaksbrev-visning__aksjoner">
					<Hovedknapp mini={true} onClick={handleOnTilbakeClicked}>
						{ props.vedtakId ? 'Tilbake  til vedtak' : 'Tilbake til hovedside' }
					</Hovedknapp>
				</div>
			</Footer>
		</>
	);
}

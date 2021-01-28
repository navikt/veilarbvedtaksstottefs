import React, { useEffect, useState } from 'react';
import PdfViewer, { PDFStatus } from '../../component/pdf-viewer/pdf-viewer';
import Footer from '../../component/footer/footer';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useViewStore, ViewType } from '../../store/view-store';
import { ModalType, useModalStore } from '../../store/modal-store';
import './vedtaksbrev-visning.less';
import { logMetrikk } from '../../util/logger';
import { lagHentArenaVedtakPdfUrl, lagHentVedtakPdfUrl } from '../../api/veilarbvedtaksstotte/vedtak';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';

interface VedtaksbrevVisningProps {
	vedtakId: number;
}

export function VedtaksbrevVisning(props: VedtaksbrevVisningProps) {
	const { changeView } = useViewStore();

	const vedtaksbrevUrl = lagHentVedtakPdfUrl(props.vedtakId);

	return (
		<GenericVedtaksbrevVisning
			vedtaksbrevUrl={vedtaksbrevUrl}
			tilbakeTekst="Tilbake  til vedtak"
			handleOnTilbakeClicked={() => changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId })}
		/>
	);
}

interface ArenaVedtaksbrevVisningProps {
	dokumentInfoId: string;
	journalpostId: string;
}

export function ArenaVedtaksbrevVisning(props: ArenaVedtaksbrevVisningProps) {
	const { changeView } = useViewStore();

	const vedtaksbrevUrl = lagHentArenaVedtakPdfUrl(props.dokumentInfoId, props.journalpostId);

	return (
		<GenericVedtaksbrevVisning
			vedtaksbrevUrl={vedtaksbrevUrl}
			tilbakeTekst="Tilbake til hovedside"
			handleOnTilbakeClicked={() => changeView(ViewType.HOVEDSIDE)}
		/>
	);
}

interface GenericVedtaksbrevVisningProps {
	vedtaksbrevUrl: string;
	tilbakeTekst: string;
	handleOnTilbakeClicked: () => void;
}

function GenericVedtaksbrevVisning(props: GenericVedtaksbrevVisningProps) {
	const { showModal } = useModalStore();
	const [pdfStatus, setPdfStatus] = useState<PDFStatus>(PDFStatus.NOT_STARTED);

	useEffect(() => logMetrikk('vis-vedtaksbrev'), []);

	useEffect(() => {
		if (pdfStatus === PDFStatus.ERROR) {
			showModal(ModalType.FEIL_VED_VISNING);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pdfStatus]);

	return (
		<>
			<PdfViewer url={props.vedtaksbrevUrl} title="Visning av vedtaksbrev" onStatusUpdate={setPdfStatus} />
			<Footer>
				<div className="vedtaksbrev-visning__aksjoner">
					<Tilbakeknapp htmlType="button" onClick={props.handleOnTilbakeClicked} />
				</div>
			</Footer>
		</>
	);
}

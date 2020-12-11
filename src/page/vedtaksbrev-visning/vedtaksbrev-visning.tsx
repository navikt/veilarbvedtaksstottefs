import React, { useEffect, useState } from 'react';
import PdfViewer, { PDFStatus } from '../../component/pdf-viewer/pdf-viewer';
import Footer from '../../component/footer/footer';
import env from '../../util/environment';
import { Hovedknapp } from 'nav-frontend-knapper';
import { lagHentArenaVedtakPdfUrl, lagHentVedtakPdfUrl } from '../../api/api';
import { useViewStore, ViewType } from '../../store/view-store';
import { ModalType, useModalStore } from '../../store/modal-store';
import { lagMockArenabrevUrl, lagMockVedtaksbrevUrl } from '../../mock/utils';
import './vedtaksbrev-visning.less';
import { useDataStore } from '../../store/data-store';
import { logMetrikk } from '../../util/logger';
import { Vedtak } from '../../api/veilarbvedtaksstotte';

interface VedtaksbrevVisningProps {
	vedtakId: number;
}

function lagMockUrl(fattedeVedtak: Vedtak[], vedtakId: number): string {
	const vistVedtak = fattedeVedtak.find(v => v.id === vedtakId) as Vedtak;
	return lagMockVedtaksbrevUrl(vistVedtak.innsatsgruppe, vistVedtak.hovedmal);
}

export function VedtaksbrevVisning(props: VedtaksbrevVisningProps) {
	const { changeView } = useViewStore();
	const { fattedeVedtak } = useDataStore();

	const vedtaksbrevUrl = env.isProduction
		? lagHentVedtakPdfUrl(props.vedtakId)
		: lagMockUrl(fattedeVedtak, props.vedtakId);

	return (
		<>
			<GenericVedtaksbrevVisning
				vedtaksbrevUrl={vedtaksbrevUrl}
				tilbakeTekst="Tilbake  til vedtak"
				handleOnTilbakeClicked={() => changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId })}
			/>
		</>
	);
}

interface ArenaVedtaksbrevVisningProps {
	dokumentInfoId: string;
	journalpostId: string;
}

export function ArenaVedtaksbrevVisning(props: ArenaVedtaksbrevVisningProps) {
	const { changeView } = useViewStore();

	const vedtaksbrevUrl = env.isProduction
		? lagHentArenaVedtakPdfUrl(props.dokumentInfoId, props.journalpostId)
		: lagMockArenabrevUrl();

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
					<Hovedknapp mini={true} onClick={props.handleOnTilbakeClicked}>
						{props.tilbakeTekst}
					</Hovedknapp>
				</div>
			</Footer>
		</>
	);
}

import { useEffect, useState } from 'react';
import PdfViewer, { PDFStatus } from '../../component/pdf-viewer/pdf-viewer';
import Footer from '../../component/footer/footer';
import { useViewStore, ViewType } from '../../store/view-store';
import { ModalType, useModalStore } from '../../store/modal-store';
import { lagHentOyeblikksbildePdfUrl } from '../../api/veilarbvedtaksstotte/vedtak';
import { Button } from '@navikt/ds-react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';

interface OyeblikksbildeVisningPDFProps {
	vedtakId: number;
	oyeblikksbildeType: string;
}

export function OyeblikksbildeVisningPDF(props: OyeblikksbildeVisningPDFProps) {
	const { changeView } = useViewStore();

	const oyeblikksbildePdfUrl = lagHentOyeblikksbildePdfUrl(props.vedtakId, props.oyeblikksbildeType);

	return (
		<GenericVedtaksbrevVisning
			oyeblikksbildeUrl={oyeblikksbildePdfUrl}
			tilbakeTekst="Tilbake  til oyeblikksbilde"
			handleOnTilbakeClicked={() => changeView(ViewType.OYBLIKKSBILDE_VISNING, { vedtakId: props.vedtakId })}
		/>
	);
}

interface GenericVedtaksbrevVisningProps {
	oyeblikksbildeUrl: string;
	tilbakeTekst: string;
	handleOnTilbakeClicked: () => void;
}

function GenericVedtaksbrevVisning(props: GenericVedtaksbrevVisningProps) {
	const { showModal } = useModalStore();
	const [pdfStatus, setPdfStatus] = useState<PDFStatus>(PDFStatus.NOT_STARTED);

	useEffect(() => {
		if (pdfStatus === PDFStatus.ERROR) {
			showModal(ModalType.FEIL_VED_VISNING);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pdfStatus]);

	return (
		<>
			<PdfViewer url={props.oyeblikksbildeUrl} title="Visning av oyeblikksbilde" onStatusUpdate={setPdfStatus} />
			<Footer>
				<div className="vedtaksbrev-visning__aksjoner">
					<Button
						size="small"
						variant="tertiary"
						icon={<ChevronLeftIcon />}
						onClick={props.handleOnTilbakeClicked}
					>
						Tilbake
					</Button>
				</div>
			</Footer>
		</>
	);
}

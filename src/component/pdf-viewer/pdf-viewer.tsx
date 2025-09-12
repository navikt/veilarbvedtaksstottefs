import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDataStore } from '../../store/data-store';
import { BodyShort, Heading, List, Loader } from '@navikt/ds-react';
import { innsatsgruppeTekst } from '../../util/innsatsgruppe';
import { hovedmalTekst } from '../../util/hovedmal';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './pdf-viewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
interface PdfViewerProps {
	url: string;
	title: string;
	onStatusUpdate: (pdfStatus: PDFStatus) => void;
}

export enum PDFStatus {
	NOT_STARTED = 'NOT_STARTED',
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}

const PdfError = () => <div className="pdfvisning__feedback-container" />;

const PdfSpinner = () => (
	<div className="pdfvisning__feedback-container">
		<Loader size="2xlarge" variant="inverted" className="pdfvisning__spinner" />
	</div>
);

function PdfViewer(props: PdfViewerProps) {
	const { utkast } = useDataStore();
	const [numPages, setNumPages] = useState<number>();

	function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
		setNumPages(nextNumPages);
		props.onStatusUpdate(PDFStatus.SUCCESS);
		window.scrollTo({ top: 0 }); // Sometimes after the PDF is loaded the page is centered, scroll back to the top
	}

	const kilder = utkast?.opplysninger.map((opplysning, idx) => <List.Item key={idx}>{opplysning}</List.Item>);

	const innsatsgruppe = utkast?.innsatsgruppe ? innsatsgruppeTekst[utkast.innsatsgruppe] : '';

	const hovedmal = utkast?.hovedmal ? hovedmalTekst[utkast.hovedmal] : '';

	const begrunnelseAvsnitt =
		utkast?.begrunnelse?.split('\n').map((avsnitt, idx) => <p key={idx}>{avsnitt}</p>) ?? null; // Skal være samme formatering som i vedtaks-PDFen

	return (
		<div className="pdfvisning">
			<div aria-live="polite" className="pdfvisning__header">
				<Heading size="small" level="1">
					{props.title}
				</Heading>
			</div>
			<Document
				file={props.url}
				loading={<PdfSpinner />}
				onLoad={() => props.onStatusUpdate(PDFStatus.LOADING)}
				// onLoadSuccess={onDocumentLoadSuccess}
				onLoadError={() => props.onStatusUpdate(PDFStatus.ERROR)}
				onLoadSuccess={onDocumentLoadSuccess}
				error={<PdfError />}
				className="pdfvisning__document skjul_ved_print"
			>
				{Array.from(new Array(numPages), (_el, index) => (
					<Page key={`page_${index + 1}`} pageNumber={index + 1} width={800} />
				))}
			</Document>
			<div className="kun_til_print">
				<BodyShort spacing>
					<b>Innsatsgruppe:</b>
					{' ' + innsatsgruppe}
				</BodyShort>
				<BodyShort spacing>
					<b>Hovedmål:</b>
					{' ' + hovedmal}
				</BodyShort>
				<Heading size="xsmall">Kilder</Heading>
				<List>{kilder}</List>
				<Heading size="xsmall">Begrunnelse</Heading>
				{begrunnelseAvsnitt}
			</div>
		</div>
	);
}

export default PdfViewer;

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { BodyShort, Heading, List, Loader } from '@navikt/ds-react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './pdf-viewer.css';
import { Utkast } from '../../api/veilarbvedtaksstotte';
import { innsatsgruppeTekst } from '../../util/innsatsgruppe';
import { hovedmalTekst } from '../../util/hovedmal';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
interface PdfViewerProps {
	utkast?: Utkast | null;
	url: string;
	title: string;
	onStatusUpdate: (pdfStatus: PDFStatus) => void;
}

// interface PdfViewerState {
// 	numPages: number;
// }

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

// function Pages(props: { numPages: number }) {
// 	return (
// 		<>
// 			{Array(props.numPages)
// 				.fill(0)
// 				.map((_, index) => (
// 					<Page key={index} pageNumber={index + 1} width={800} />
// 				))}
// 		</>
// 	);
// }

// class PdfViewer2 extends Component<PdfViewerProps, PdfViewerState> {
// 	// Create this.file once to prevent rerender bug in react-pdf when object is created each render
// 	private readonly file: { url: string };

// 	constructor(props: PdfViewerProps) {
// 		super(props);
// 		this.state = { numPages: 0 };
// 		this.props.onStatusUpdate(PDFStatus.LOADING);
// 		this.file = { url: this.props.url };

// 		// Scroll to the top of the screen so that the user sees the spinner
// 		window.scrollTo({ top: 0 });
// 	}

// 	shouldComponentUpdate(nextProps: PdfViewerProps, nextState: PdfViewerState) {
// 		return !(this.props.url === nextProps.url && this.state.numPages === nextState.numPages);
// 	}

// 	render() {
// 		return (
// 			<div className="pdfvisning">
// 				<div aria-live="polite" className="pdfvisning__header">
// 					<Heading size="small" level="1">
// 						{this.props.title}
// 					</Heading>
// 				</div>
// 				<Document
// 					className="pdfvisning__document"
// 					file={this.file}
// 					error={<PdfError />}
// 					loading={<PdfSpinner />}
// 					onLoadError={() => this.props.onStatusUpdate(PDFStatus.ERROR)}
// 					onLoadSuccess={(object: { numPages: number }) => {
// 						this.props.onStatusUpdate(PDFStatus.SUCCESS);
// 						this.setState({ numPages: object.numPages });
// 						// Sometimes after the PDF is loaded the page is centered, scroll back to the top
// 						window.scrollTo({ top: 0 });
// 					}}
// 				>
// 					<Pages numPages={this.state.numPages} />
// 				</Document>
// 			</div>
// 		);
// 	}
// }

function PdfViewer(props: PdfViewerProps) {
	const [numPages, setNumPages] = useState<number>();
	// const [file, setFile] = useState<string | null>(null);
	// const frameRef = useRef<HTMLIFrameElement>(null);

	function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
		setNumPages(nextNumPages);
		props.onStatusUpdate(PDFStatus.SUCCESS);
		window.scrollTo({ top: 0 }); // Sometimes after the PDF is loaded the page is centered, scroll back to the top
	}

	const kilder = props.utkast?.opplysninger.map((opplysning, idx) => <List.Item key={idx}>{opplysning}</List.Item>);

	const innsatsgruppe = props.utkast?.innsatsgruppe ? innsatsgruppeTekst[props.utkast.innsatsgruppe] : '';

	const hovedmal = props.utkast?.hovedmal ? hovedmalTekst[props.utkast.hovedmal] : '';

	const begrunnelseAvsnitt =
		props.utkast?.begrunnelse
			?.split('\n')
			.filter(line => line !== '')
			.map((avsnitt, idx) => <p key={idx}>{avsnitt}</p>) ?? null; // Skal være samme formatering som i vedtaks-PDFen

	// const onDocumentRender = async (pdf: PdfDocument): Promise<void> => {
	// 	setNumPages(pdf.numPages);
	// 	props.onStatusUpdate(PDFStatus.SUCCESS);
	// 	window.scrollTo({ top: 0 }); // Sometimes after the PDF is loaded the page is centered, scroll back to the top

	// 	const data = await pdf.getData(); // data is Uint8Array
	// 	const blob = new Blob([new Uint8Array(data)], { type: 'application/pdf' });
	// 	setFile(URL.createObjectURL(blob));
	// };

	return (
		<div className="pdfvisning">
			<div aria-live="polite" className="pdfvisning__header">
				<Heading size="small" level="1">
					{props.title}
				</Heading>
				{/* <Button
					onClick={() => {
						if (frameRef.current && frameRef.current.contentWindow) {
							frameRef.current.contentWindow.print();
						}
					}}
				>
					Print
				</Button> */}
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
				{/* {({ pdf }) =>
					Array(pdf.numPages)
						.fill(null)
						.map((_, index) => <Page key={index} pageIndex={index} />)
				} */}
				{Array.from(new Array(numPages), (_el, index) => (
					<Page key={`page_${index + 1}`} pageNumber={index + 1} width={800} />
				))}
			</Document>
			{/* {file && <iframe title="PDF printing" ref={frameRef} src={file} style={{ display: 'none' }}></iframe>} */}
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

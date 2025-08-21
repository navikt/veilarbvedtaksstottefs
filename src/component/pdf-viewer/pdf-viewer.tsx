import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Heading, Loader } from '@navikt/ds-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './pdf-viewer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
interface PdfViewerProps {
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

	function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
		setNumPages(nextNumPages);
		props.onStatusUpdate(PDFStatus.SUCCESS);
		// Sometimes after the PDF is loaded the page is centered, scroll back to the top
		window.scrollTo({ top: 0 });
	}

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
				onLoadSuccess={onDocumentLoadSuccess}
				onLoadError={() => props.onStatusUpdate(PDFStatus.ERROR)}
				error={<PdfError />}
				className="pdfvisning__document"
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
		</div>
	);
}

export default PdfViewer;

import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Undertittel } from 'nav-frontend-typografi';
import { Loader } from '@navikt/ds-react';
import './pdf-viewer.less';

interface PdfViewerProps {
	url: string;
	title: string;
	onStatusUpdate: (pdfStatus: PDFStatus) => void;
}

interface PdfViewerState {
	numPages: number;
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

function Pages(props: { numPages: number }) {
	return (
		<>
			{Array(props.numPages)
				.fill(0)
				.map((elem, index) => (
					<Page key={index} pageNumber={index + 1} width={800} />
				))}
		</>
	);
}

class PdfViewer extends React.Component<PdfViewerProps, PdfViewerState> {
	// Create this.file once to prevent rerender bug in react-pdf when object is created each render
	private readonly file: { url: string };

	constructor(props: PdfViewerProps) {
		super(props);
		this.state = { numPages: 0 };
		this.props.onStatusUpdate(PDFStatus.LOADING);
		this.file = { url: this.props.url };

		// Scroll to the top of the screen so that the user sees the spinner
		window.scrollTo({ top: 0 });
	}

	shouldComponentUpdate(nextProps: PdfViewerProps, nextState: PdfViewerState) {
		return !(this.props.url === nextProps.url && this.state.numPages === nextState.numPages);
	}

	render() {
		return (
			<div className="pdfvisning">
				<div aria-live="polite" className="pdfvisning__header">
					<Undertittel tag="h1">{this.props.title}</Undertittel>
				</div>
				<Document
					className="pdfvisning__document"
					file={this.file}
					error={<PdfError />}
					loading={<PdfSpinner />}
					onLoadError={() => this.props.onStatusUpdate(PDFStatus.ERROR)}
					onLoadSuccess={(object: { numPages: number }) => {
						this.props.onStatusUpdate(PDFStatus.SUCCESS);
						this.setState({ numPages: object.numPages });
						// Sometimes after the PDF is loaded the page is centered, scroll back to the top
						window.scrollTo({ top: 0 });
					}}
				>
					<Pages numPages={this.state.numPages} />
				</Document>
			</div>
		);
	}
}

export default PdfViewer;

import React, { Dispatch, SetStateAction } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Undertittel } from 'nav-frontend-typografi';
import './pdf-viewer.less';
import { OrNothing } from '../../utils/types/ornothing';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
    url: string;
    title: string;
    onStatusUpdate: Dispatch<SetStateAction<OrNothing<PDFStatus>>>;
}

interface PdfViewerState {
    numPages: number;
}

export type PDFStatus = 'NOT_STARTED' | 'LOADING' | 'SUCCESS' | 'ERROR';

class PdfViewer extends React.Component<PdfViewerProps, PdfViewerState> {
    constructor(props: PdfViewerProps) {
        super(props);
        this.state = {numPages : 0};
        this.props.onStatusUpdate('NOT_STARTED');
    }

    shouldComponentUpdate(nextProps: PdfViewerProps, nextState: PdfViewerState) {
       return !(this.props.url === nextProps.url && this.state.numPages === nextState.numPages);
    }

    componentDidMount() {
        this.props.onStatusUpdate('LOADING');
    }

    render () {
        return (
            <div className="pdfvisning">
                <div className="pdfvisning__header">
                    <Undertittel>{this.props.title}</Undertittel>
                </div>
                <Document
                    className="pdfvisning__document"
                    file={{url: this.props.url}}
                    error=""
                    loading=""
                    onLoadError={() => this.props.onStatusUpdate('ERROR')}
                    onLoadSuccess={(object: { numPages: number }) => {
                        this.props.onStatusUpdate('SUCCESS');
                        this.setState({numPages: object.numPages});
                    }}
                >
                    <Pages numPages={this.state.numPages}/>
                </Document>
            </div>
        );
    }
}

export default PdfViewer;

const Pages = (props: { numPages: number }) => {
    return (
        <>
            {Array(props.numPages).fill(0).map((elem, index) =>
                <Page key={index} pageNumber={index + 1} width={800}/>)}
        </>
    );
};

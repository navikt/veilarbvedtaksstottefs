import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Undertittel } from 'nav-frontend-typografi';
import './pdf-viewer.less';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import NavFrontendSpinner from 'nav-frontend-spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
    url: string;
    title: string;
}

interface PdfViewerState {
    numPages: number;
}

class PdfViewer extends React.Component<PdfViewerProps, PdfViewerState> {
    constructor(props: PdfViewerProps) {
        super(props);
        this.state = {numPages : 0};
    }

    shouldComponentUpdate(nextProps: PdfViewerProps, nextState: PdfViewerState) {
       return !(this.props.url === nextProps.url && this.state.numPages === nextState.numPages);
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
                    loading={<PdfLoader/>}
                    error={<PdfError/>}
                    onLoadSuccess={(object: { numPages: number }) => this.setState({numPages: object.numPages})}
                >
                    <Pages numPages={this.state.numPages}/>
                </Document>
            </div>
        );
    }
}

export default PdfViewer;

const PdfError = () => {
    return (
        <div className="pdfvisning__error">
            <AlertStripeFeil className="vedtaksstotte-alert">Klarte ikke å laste inn PDF, prøv igjen</AlertStripeFeil>
        </div>
    );
};

const PdfLoader = () => {
    return (
        <div className="pdfvisning__loader">
            <NavFrontendSpinner className="vedtaksstotte-spinner" type="XL"/>
        </div>
    );
};

const Pages = (props: { numPages: number }) => {
    return (
        <>
            {Array(props.numPages).fill(0).map((elem, index) =>
                <Page key={index} pageNumber={index + 1} width={800}/>)}
        </>
    );
};

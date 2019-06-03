import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';
import './pdf-viewer.less';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
    url: string;
    title: string;
    children?: React.ReactNode;
}

function PdfViewer(props: PdfViewerProps) {
    const [numPages, setPages] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pdfvisning">
            <div className="pdfvisning__header">
                <Undertittel>{props.title}</Undertittel>
            </div>
            <Document
                className="pdfvisning__document"
                file={{url: props.url}}
                loading={<PdfLoader/>}
                error={<PdfError/>}
                onLoadSuccess={(object: { numPages: number }) => setPages(object.numPages)}
            >
                <Pages numPages={numPages}/>
            </Document>
            {props.children}
        </div>
    );
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

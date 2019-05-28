import React, { useContext, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { useFetchState } from '../../components/providers/fetch-provider';
import { Status } from '../../utils/fetch-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './forhandsvisning.less';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const veilarbvedtakkUrl = (fnr: string) => process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/test.pdf'
    : VedtaksstotteApi.hentForhandsvisningURL(fnr);

export function Forhandsvisning(props: { fnr: string }) {
    const [numPages, setPages] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [vedtak, setVedtak] = useFetchState('vedtak');
    const {dispatch} = useContext(ViewDispatch);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const Pages = () => {
        return (
            <>
                {Array(numPages).fill(0).map((elem, index) =>
                    <Page key={index} pageNumber={index + 1} width={800}/>)}
            </>
        );
    };

    const handleOnSendClicked = () => {
        if (isSending) {
            return;
        }

        setIsSending(true);
        VedtaksstotteApi.sendVedtak(props.fnr).then(() => {
            setIsSending(false);
            setVedtak({status: Status.NOT_STARTED, data: null as any});
            dispatch({view: ActionType.HOVEDSIDE});
        }).catch(() => {
            setIsSending(false);
        });
    };

    return (
        <div className="pdfvisning">
            <div className="pdfvisning__header">
                <Undertittel> Forhåndsvisning av vedtaksbrevet</Undertittel>
            </div>
            <Document
                className="pdfvisning__document"
                file={{url: veilarbvedtakkUrl(props.fnr)}}
                loading={<PdfLoader/>}
                onLoadSuccess={(object: { numPages: number }) => setPages(object.numPages)}
            >
                <Pages/>
            </Document>
            <footer className="pdfvisning__footer">
                <div className="pdfvisning__aksjoner">
                    <Hovedknapp
                        onClick={handleOnSendClicked}
                        className="pdfvisning__knapp-sender"
                        spinner={isSending}
                    >
                        Send
                    </Hovedknapp>
                    <Knapp
                        htmlType="button"
                        onClick={() => dispatch({view: ActionType.UTKAST})}
                    >
                        Tilbake til utkast
                    </Knapp>
                </div>
            </footer>
        </div>
    );
}

const PdfLoader = () => {
    return (
        <div className="pdfvisning__loader">
            <div className="page-spinner">
                <NavFrontendSpinner type="XL"/>
            </div>
        </div>
    );
};

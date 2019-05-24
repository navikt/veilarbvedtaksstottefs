import React, { useContext, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './forhandsvisning.less';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { useFetchState } from '../../components/providers/fetch-provider';
import { Status } from '../../utils/fetch-utils';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const veilarbvedtakkUrl = (fnr: string) => process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/test.pdf'
    : VedtaksstotteApi.hentForhandsvisningURL(fnr);

export function TilInnsending (props: {fnr: string}) {
    const [numPages, setPages] = useState(0);
    const [vedtak, setVedtak] = useFetchState('vedtak');
    const {dispatch} = useContext(ViewDispatch);

    const Pages = () => {
        return (
            <>
                {Array(numPages).fill(0).map((elem, index) =>
                    <Page key={index} pageNumber={index + 1} width={800}/>)}
            </>
        );
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        VedtaksstotteApi.sendVedtak(props.fnr).then(() => {
            setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
            dispatch({view: ActionType.HOVEDSIDE});
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="pdfvisning">
                <div className="pdfvisning__tittel">
                    <Undertittel> Forhandsvisning av vedtaksbrevet</Undertittel>
                </div>
                <div className="pdfvisning__pdfcontent">
                    <Document
                        file={{url: veilarbvedtakkUrl(props.fnr)}}
                        onLoadSuccess={(object: {numPages: number}) => setPages(object.numPages)}
                    >
                        <Pages/>
                    </Document>
                </div>
                <div className="pdfvisning__aksjoner">
                    <Hovedknapp className="btn--mr3" htmlType="submit">Send</Hovedknapp>
                    <Flatknapp className="btn--ml3" htmlType="button" onClick={() => dispatch({view: ActionType.UTKAST})}>Tilbake til utkast</Flatknapp>
                </div>
            </div>
        </form>
    );
}

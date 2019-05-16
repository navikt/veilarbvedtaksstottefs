import React, { useContext, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import './forhandsvisning.less';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { Status } from '../../utils/hooks/useFetch';
import { AppContext, ViewDispatch } from '../../components/app-provider/app-provider';
import Api from '../../api/api';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const veilarbvedtakkUrl = (fnr: string) => process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/test.pdf'
    : Api.hentForhandsvisningURL(fnr);

export function TilInnsending (props: {fnr: string}) {
    const [numPages, setPages] = useState(0);
    const {dispatch} = useContext(ViewDispatch);
    const {setVedtak} = useContext(AppContext);

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
        Api.sendVedtak(props.fnr).then(() => {
            setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
            dispatch({view: ActionType.HOVEDSIDE});
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="forhandsvisning">
                <div className="forhandsvisning__tittel">
                    <Undertittel> Forhandsvisning av vedtaksbrevet</Undertittel>
                </div>
                <div className="forhandsvisning__pdfcontent">
                    <Document
                        file={{url: veilarbvedtakkUrl(props.fnr)}}
                        onLoadSuccess={(object: {numPages: number}) => setPages(object.numPages)}
                    >
                        <Pages/>
                    </Document>
                </div>
                <div className="forhandsvisning__aksjoner">
                    <Hovedknapp className="btn--mr3" htmlType="submit">Send</Hovedknapp>
                    <Flatknapp className="btn--ml3" htmlType="button" onClick={() => dispatch({view: ActionType.UTKAST})}>Tilbake til utkast</Flatknapp>
                </div>
            </div>
        </form>
    );
}

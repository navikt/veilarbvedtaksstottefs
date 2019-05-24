import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import React, { useContext, useState } from 'react';
import { ViewDispatch } from '../../components/providers/view-provider';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { Undertittel } from 'nav-frontend-typografi';
import { Document, Page, pdfjs } from 'react-pdf';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';
import { useFetchState } from '../../components/providers/fetch-provider';

const veilarbvedtakUrl = (fnr: string, dokumentInfoId?: string, journalpostId?: string) => process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/test.pdf'
    : VedtaksstotteApi.hentVedtakPdfURL(fnr, dokumentInfoId || '', journalpostId || '');

export function VedtakbrevPdfVisning (props: {fnr: string, vedtakId: number}) {
    const [numPages, setPages] = useState(0);
    const {dispatch} = useContext(ViewDispatch);
    const [vedtak] = useFetchState('vedtak');
    const vedtaksObjekt = vedtak.data.find(v => v.id === props.vedtakId);

    const journalpostId = vedtaksObjekt && vedtaksObjekt.journalpostId;
    const dokumentInfoId = vedtaksObjekt && vedtaksObjekt.dokumentInfoId;
    return (
        <div className="pdfvisning">
            <TilbakeKnapp tilbake={() => dispatch({view: ActionType.VIS_VEDTAK, props: {id: props.vedtakId}})}/>
            <div className="pdfvisning__tittel">
                <Undertittel> Vedtaksbrev</Undertittel>
            </div>
            <div className="pdfvisning__pdfcontent">
                <Document
                    file={{url: veilarbvedtakUrl(props.fnr, dokumentInfoId, journalpostId)}}
                    onLoadSuccess={(object: {numPages: number}) => setPages(object.numPages)}
                >
                    <Pages numPages={numPages}/>
                </Document>
            </div>
        </div>
    );
}

const Pages = (props: {numPages: number}) => {
    return (
        <>
            {Array(props.numPages).fill(0).map((elem, index) =>
                <Page key={index} pageNumber={index + 1} width={800}/>)}
        </>
    );
};

import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import React, { useContext } from 'react';
import { ViewDispatch } from '../../components/providers/view-provider';
import { useFetchState } from '../../components/providers/fetch-provider';
import PdfViewer from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import './vedtaksbrev-visning.less';

export function VedtaksbrevVisning (props: {fnr: string, vedtakId: number}) {
    const {dispatch} = useContext(ViewDispatch);
    const [vedtak] = useFetchState('vedtak');
    const vedtaksObjekt = vedtak.data.find(v => v.id === props.vedtakId);

    if (!vedtaksObjekt) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    const journalpostId = vedtaksObjekt.journalpostId as string;
    const dokumentInfoId = vedtaksObjekt.dokumentInfoId as string;
    const url = env.isDevelopment
        ? vedtaksBrevUrl
        : VedtaksstotteApi.hentVedtakPdfURL(props.fnr, dokumentInfoId, journalpostId);

    return (
       <>
        <PdfViewer url={url} title="Visning av vedtaksbrev"/>
            <Footer>
                <div className="vedtaksbrev-visning__aksjoner">
                    <Hovedknapp
                        onClick={() => dispatch({view: ActionType.VIS_VEDTAK, props: {id: props.vedtakId}})}
                    >
                        Tilbake til vedtak
                    </Hovedknapp>
                </div>
            </Footer>
        </>
    );
}
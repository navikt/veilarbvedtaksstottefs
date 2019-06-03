import React, { useContext, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { useFetchState } from '../../components/providers/fetch-provider';
import { Status } from '../../utils/fetch-utils';
import PdfViewer from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import './forhandsvisning.less';


export function Forhandsvisning(props: { fnr: string }) {
    const [isSending, setIsSending] = useState(false);
    const [vedtak, setVedtak] = useFetchState('vedtak');
    const {dispatch} = useContext(ViewDispatch);
    const url = env.isDevelopment
        ? vedtaksBrevUrl
        : VedtaksstotteApi.hentForhandsvisningURL(props.fnr);

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
        <PdfViewer url={url} title="Forhåndsvisning av vedtaksbrevet">
            <Footer>
                <div className="forhandsvisning__aksjoner">
                    <Hovedknapp
                        onClick={handleOnSendClicked}
                        className="forhandsvisning__knapp-sender"
                        spinner={isSending}
                    >
                        Send til bruker
                    </Hovedknapp>
                    <Knapp
                        htmlType="button"
                        onClick={() => dispatch({view: ActionType.UTKAST})}
                    >
                        Tilbake til utkast
                    </Knapp>
                </div>
            </Footer>
        </PdfViewer>
    );
}


import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import React, { useContext, useEffect, useState } from 'react';
import { ViewDispatch } from '../../components/providers/view-provider';
import { useFetchState } from '../../components/providers/fetch-provider';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import './vedtaksbrev-visning.less';
import { OrNothing } from '../../utils/types/ornothing';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';
import { SpinnerModal } from '../../components/modal/spinner-modal';
import { ModalViewDispatch } from '../../components/providers/modal-provider';
import { logMetrikk } from '../../utils/frontend-logger';
import { feilVidVisningProps } from '../../components/modal/feil-modal-tekster';

export function VedtaksbrevVisning (props: {fnr: string, vedtakId: number}) {
    const {dispatch} = useContext(ViewDispatch);
    const [vedtak] = useFetchState('vedtak');
    const vedtaksObjekt = vedtak.data.find(v => v.id === props.vedtakId);
    const [pdfStatus, setPdfStatus] = useState<OrNothing<PDFStatus>>('NOT_STARTED');
    const {modalViewDispatch} = useContext(ModalViewDispatch);

    useEffect(() => logMetrikk('vis-vedtaksbrev'), []);

    if (!vedtaksObjekt) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    useEffect(() => {
        switch (pdfStatus) {
            case 'NOT_STARTED':
            case 'LOADING':
                return modalViewDispatch({modalView: ModalActionType.MODAL_LASTER_DATA});
            case 'SUCCESS':
                return modalViewDispatch({modalView: null});
            case 'ERROR':
                return modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: feilVidVisningProps(props.vedtakId)});
            default:
                return;
        }
    }, [pdfStatus]);

    const journalpostId = vedtaksObjekt.journalpostId as string;
    const dokumentInfoId = vedtaksObjekt.dokumentInfoId as string;
    const url = env.isDevelopment
        ? vedtaksBrevUrl
        : VedtaksstotteApi.hentVedtakPdfURL(props.fnr, dokumentInfoId, journalpostId);

    return (
        <>
            <SpinnerModal/>
            <PdfViewer
                url={url}
                title="Visning av vedtaksbrev"
                onStatusUpdate={setPdfStatus}

            />
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

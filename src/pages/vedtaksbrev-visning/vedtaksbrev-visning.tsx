import React, { useContext, useEffect, useState } from 'react';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import './vedtaksbrev-visning.less';
import { OrNothing } from '../../utils/types/ornothing';
import { ModalActionType } from '../../stores/modal-reducer';
import { SpinnerModal } from '../../components/modal/spinner-modal';
import { ModalViewDispatch } from '../../stores/modal-provider';
import { logMetrikk } from '../../utils/frontend-logger';
import { feilVedVisningProps } from '../../components/modal/feil-modal-tekster';
import { useFetchStoreContext } from '../../stores/fetch-store';
import { lagHentVedtakPdfUrl } from '../../rest/api';
import { useAppStoreContext } from '../../stores/app-store';
import { useViewStoreContext, View } from '../../stores/view-store';

export function VedtaksbrevVisning (props: {vedtakId: number}) {
    const { fnr } = useAppStoreContext();
    const { vedtak } = useFetchStoreContext();
    const { changeView } = useViewStoreContext();
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
                return modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: feilVedVisningProps(props.vedtakId)});
            default:
                return;
        }
    }, [pdfStatus]);

    const journalpostId = vedtaksObjekt.journalpostId as string;
    const dokumentInfoId = vedtaksObjekt.dokumentInfoId as string;
    const url = env.isDevelopment
        ? vedtaksBrevUrl
        : lagHentVedtakPdfUrl(fnr, dokumentInfoId, journalpostId);

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
                        mini={true}
                        onClick={() => changeView(View.VEDTAK, { vedtakId: props.vedtakId})}
                    >
                        Tilbake til vedtak
                    </Hovedknapp>
                </div>
            </Footer>
        </>
    );
}

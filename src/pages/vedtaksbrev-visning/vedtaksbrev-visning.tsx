import React, { useEffect, useState } from 'react';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../utils/types/ornothing';
import { logMetrikk } from '../../utils/frontend-logger';
import { useFetchStore } from '../../stores/fetch-store';
import { lagHentVedtakPdfUrl } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, View } from '../../stores/view-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import './vedtaksbrev-visning.less';

export function VedtaksbrevVisning (props: {vedtakId: number}) {
    const { fnr } = useAppStore();
    const { vedtak } = useFetchStore();
    const { changeView } = useViewStore();
    const { showModal } = useModalStore();

    const vedtaksObjekt = vedtak.data.find(v => v.id === props.vedtakId);
    const [pdfStatus, setPdfStatus] = useState<OrNothing<PDFStatus>>('NOT_STARTED');

    useEffect(() => logMetrikk('vis-vedtaksbrev'), []);

    if (!vedtaksObjekt) {
        return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
    }

    useEffect(() => {
        switch (pdfStatus) {
            // case 'NOT_STARTED':
            // case 'LOADING':
            //     return modalViewDispatch({modalView: ModalActionType.MODAL_LASTER_DATA});
            // case 'SUCCESS':
            //     return modalViewDispatch({modalView: null});
            case 'ERROR':
                showModal(ModalType.FEIL_VED_VISNING);
                break;
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

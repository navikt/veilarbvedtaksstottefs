import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import './forhandsvisning.less';
import { STOPPE_VEDTAKSINNSENDING_TOGGLE } from '../../rest/data/features';
import { utkastetSkalKvalitetssikrets } from '../../components/skjema/skjema-utils';
import { VedtakData } from '../../rest/data/vedtak';
import { OrNothing } from '../../utils/types/ornothing';
import { logMetrikk } from '../../utils/frontend-logger';
import { useFetchStore } from '../../stores/fetch-store';
import { lagHentForhandsvisningUrl, lagSendVedtakFetchInfo } from '../../rest/api';
import { fetchWithInfo } from '../../rest/utils';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, View } from '../../stores/view-store';
import { ModalType, useModalStore } from '../../stores/modal-store';

export function Forhandsvisning() {
    const {fnr} = useAppStore();
    const {changeView} = useViewStore();
    const {vedtak, features} = useFetchStore();
    const {showModal} = useModalStore();

    const [pdfStatus, setPdfStatus] = useState<OrNothing<PDFStatus>>('NOT_STARTED');

    const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');
    const kvalitetssikresVarsel = utkastetSkalKvalitetssikrets(utkast && utkast.innsatsgruppe);

    const stoppeInnsendingfeatureToggle = features.data[STOPPE_VEDTAKSINNSENDING_TOGGLE];

    const url = env.isDevelopment
        ? vedtaksBrevUrl
        : lagHentForhandsvisningUrl(fnr);

    const tilbakeTilSkjema = () => {
        changeView(View.UTKAST);
        logMetrikk('tilbake-fra-forhandsvisning');
    };

    useEffect(() => {
        switch (pdfStatus) {
            // TODO: Use spinner on page
            // case 'NOT_STARTED':
            // case 'LOADING':
            //     return modalViewDispatch({modalView: ModalActionType.MODAL_LASTER_DATA});
            // case 'SUCCESS':
            //     return modalViewDispatch({modalView: null});
            case 'ERROR':
                showModal(ModalType.FEIL_VED_FORHANDSVISNING);
                break;
            default:
                return;
        }
    }, [pdfStatus]);

    const tilbakeTilHovedsiden = () => {
        vedtak.fetch({fnr});
        changeView(View.HOVEDSIDE);
        showModal(ModalType.VEDTAK_SENT_SUKSESS);
    };

    const sendVedtak = (beslutter?: string) => {
        showModal(ModalType.LASTER_DATA);

        fetchWithInfo(lagSendVedtakFetchInfo({fnr, beslutter}))
            .then(() => {
                tilbakeTilHovedsiden();
            })
            .catch((err) => {
                showModal(ModalType.FEIL_VED_SENDING);
                logMetrikk('feil-ved-sending', err);
            });
    };

    const handleOnSendClicked = () => {

        if (stoppeInnsendingfeatureToggle) {
            showModal(ModalType.FEIL_INNSENDING_STOPPET);
            return;
        }

        if (kvalitetssikresVarsel) {
            showModal(ModalType.KVALITETSSIKRING, { sendVedtak });
            return;
        }

        sendVedtak();
    };

    return (
        <>
            <PdfViewer
                url={url}
                title="Forhåndsvisning av vedtaksbrevet"
                onStatusUpdate={setPdfStatus}
            />
            <Footer className="forhandsvisning__footer">
                <div className="forhandsvisning__aksjoner">
                    <Hovedknapp
                        mini={true}
                        onClick={handleOnSendClicked}
                        className="forhandsvisning__knapp-sender"
                    >
                        Send til bruker
                    </Hovedknapp>
                    <Knapp
                        mini={true}
                        htmlType="button"
                        onClick={tilbakeTilSkjema}
                    >
                        Tilbake til utkast
                    </Knapp>
                </div>
            </Footer>
        </>
    );
}

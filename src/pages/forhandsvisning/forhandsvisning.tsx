import React, { useContext, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalActionType } from '../../stores/modal-reducer';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import './forhandsvisning.less';
import { STOPPE_VEDTAKSINNSENDING_TOGGLE } from '../../rest/data/features';
import { ModalViewDispatch } from '../../stores/modal-provider';
import { utkastetSkalKvalitetssikrets } from '../../components/skjema/skjema-utils';
import { KvalitetsSikringModalInnsending } from './kvalitetssikring';
import { VedtakData } from '../../rest/data/vedtak';
import { SpinnerModal } from '../../components/modal/spinner-modal';
import { OrNothing } from '../../utils/types/ornothing';
import { logMetrikk } from '../../utils/frontend-logger';
import {
    feilVidForhandsvisnigProps,
    feilVidSendningProps,
    stoppeInnsendingFeatureToggleProps
} from '../../components/modal/feil-modal-tekster';
import { useFetchStoreContext } from '../../stores/fetch-store';
import { lagHentForhandsvisningUrl, lagSendVedtakFetchInfo } from '../../rest/api';
import { fetchWithInfo } from '../../rest/utils';
import { useAppStoreContext } from '../../stores/app-store';
import { useViewStoreContext, View } from '../../stores/view-store';

export function Forhandsvisning() {
    const { fnr } = useAppStoreContext();
    const { changeView } = useViewStoreContext();
    const { vedtak, features } = useFetchStoreContext();

    const [pdfStatus, setPdfStatus] = useState<OrNothing<PDFStatus>>('NOT_STARTED');
    const {modalViewDispatch} = useContext(ModalViewDispatch);

    const utkast =  vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');
    const kvalitetssikresVarsel = utkastetSkalKvalitetssikrets(utkast && utkast.innsatsgruppe);

    const stoppeInnsendingfeatureToggle = features.data[STOPPE_VEDTAKSINNSENDING_TOGGLE];

    const url = env.isDevelopment
        ? vedtaksBrevUrl
        : lagHentForhandsvisningUrl(fnr);

    const tilbakeTilSkjema  = () => {
        changeView(View.UTKAST);
        logMetrikk('tilbake-fra-forhandsvisning');
    };

    useEffect(() => {
        switch (pdfStatus) {
            case 'NOT_STARTED':
            case 'LOADING':
                return modalViewDispatch({modalView: ModalActionType.MODAL_LASTER_DATA});
            case 'SUCCESS':
                return modalViewDispatch({modalView: null});
            case 'ERROR': {
                return modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: feilVidForhandsvisnigProps});
            }
            default:
                return;
        }
    }, [pdfStatus]);

    const tilbakeTilHovedsiden = () => {
        vedtak.fetch({ fnr });
        changeView(View.HOVEDSIDE);
        modalViewDispatch({modalView: ModalActionType.MODAL_VEDTAK_SENT_SUKSESS});
    };

    const sendVedtak = (beslutter?: string) => {
        modalViewDispatch({modalView: ModalActionType.MODAL_LASTER_DATA});

        fetchWithInfo(lagSendVedtakFetchInfo({ fnr, beslutter }))
            .then(() => {
                tilbakeTilHovedsiden();
            })
            .catch((err) => {
                modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: feilVidSendningProps});
                logMetrikk('feil-ved-sending', err);
            });
    };

    const handleOnSendClicked = () => {

        if (stoppeInnsendingfeatureToggle) {
            modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: stoppeInnsendingFeatureToggleProps});
            return;
        }

        if (kvalitetssikresVarsel) {
            modalViewDispatch({modalView: ModalActionType.MODAL_KVALITETSSIKRING});
            return;
        }

        sendVedtak();
    };

    return (
        <>
            <KvalitetsSikringModalInnsending sendVedtak={sendVedtak}/>
            <SpinnerModal/>
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

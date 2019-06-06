import React, { useContext, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { useFetchState } from '../../components/providers/fetch-provider';
import { Status } from '../../utils/fetch-utils';
import PdfViewer, { PDFStatus } from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import './forhandsvisning.less';
import { STOPPE_VEDTAKSINNSENDING_TOGGLE } from '../../api/feature-toggle-api';
import { ModalViewDispatch } from '../../components/providers/modal-provider';
import { utkastetSkalKvalitetssikrets } from '../../components/skjema/skjema-utils';
import { KvalitetsSikringModalInnsending } from './kvalitetssikring';
import { VedtakData } from '../../utils/types/vedtak';
import { SpinnerModal } from '../../components/modal/spinner-modal';
import { OrNothing } from '../../utils/types/ornothing';
import { FeilModalInnsending } from './feilmodal';
import { logEvent } from '../../utils/frontend-logger';
import { APP_NAME } from '../../utils/constants';

export function Forhandsvisning(props: { fnr: string }) {
    const [pdfStatus, setPdfStatus] = useState<OrNothing<PDFStatus>>('NOT_STARTED');

    const {dispatch} = useContext(ViewDispatch);
    const {modalViewDispatch} = useContext(ModalViewDispatch);

    const [vedtak, setVedtak] = useFetchState('vedtak');
    const utkast =  vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');
    const kvalitetssikresVarsel = utkastetSkalKvalitetssikrets(utkast && utkast.innsatsgruppe);

    const [features, setFeatures] = useFetchState('features');
    const stoppeInnsendingfeatureToggle = features.data[STOPPE_VEDTAKSINNSENDING_TOGGLE];

    const url = env.isDevelopment
        ? vedtaksBrevUrl
        : VedtaksstotteApi.hentForhandsvisningURL(props.fnr);

    const tilbakeTilSkjema  = () => {
        dispatch({view: ActionType.UTKAST});
        logEvent(`${APP_NAME}.metrikker.tilbake-fra-forhandsvisning`);
    };

    useEffect(() => {
        switch (pdfStatus) {
            case 'NOT_STARTED':
            case 'LOADING':
                return modalViewDispatch({modalView: ModalActionType.MODAL_LASTER_DATA});
            case 'SUCCESS':
                return modalViewDispatch({modalView: null});
            case 'ERROR':
                return modalViewDispatch({modalView: ModalActionType.MODAL_FEIL_VID_LASTNING});
            default:
                return;
        }
    }, [pdfStatus]);

    const tilbakeTilHovedsiden = () => {
        setVedtak({status: Status.NOT_STARTED, data: null as any});
        dispatch({view: ActionType.HOVEDSIDE});
        modalViewDispatch({modalView: ModalActionType.MODAL_VEDTAK_SENT_SUKSESS});
    };

    const sendVedtak = () => {
        modalViewDispatch({modalView: ModalActionType.MODAL_LASTER_DATA});

        VedtaksstotteApi.sendVedtak(props.fnr).then(() => {
            tilbakeTilHovedsiden();
        }).catch((err) => {
            modalViewDispatch({modalView: ModalActionType.MODAL_FEIL_VID_LASTNING});
            logEvent(`${APP_NAME}.metrikker.feil-ved-sending`, err);
        });
    };

    const handleOnSendClicked = () => {

        if (stoppeInnsendingfeatureToggle) {
            modalViewDispatch({modalView: ModalActionType.MODAL_FEIL_VID_LASTNING});
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
            <FeilModalInnsending/>
            <KvalitetsSikringModalInnsending sendVedtak={sendVedtak}/>
            <SpinnerModal/>
            <PdfViewer
                url={url}
                title="Forhåndsvisning av vedtaksbrevet"
                onStatusUpdate={setPdfStatus}
            />
            <Footer>
                <div className="forhandsvisning__aksjoner">
                    <Hovedknapp
                        onClick={handleOnSendClicked}
                        className="forhandsvisning__knapp-sender"
                    >
                        Send til bruker
                    </Hovedknapp>
                    <Knapp
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

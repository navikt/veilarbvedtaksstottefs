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
import { logMetrikk } from '../../utils/frontend-logger';

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
                const modalProps = {
                    tittel: 'Problemer med forhåndsvisning',
                    beskrivelse: 'Vi får dessverre ikke forhåndsvist vedtaksbrevet for øyeblikket. Vennligst gå tilbake til utkastet og prøv igjen senare.',
                    viewAction: ActionType.UTKAST,
                    knappeTekst : 'Tilbake til vedtakskjema'
                };
                return modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: modalProps});
            }
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
            const modalProps = {
                tittel: 'Problemer med å sende',
                beskrivelse: 'Vedtaksbrevet kan dessverrre ikke sendes for øyeblikket. Vennligst prøv igjen senare.',
                viewAction: ActionType.UTKAST,
                knappeTekst : 'Tilbake til vedtakskjema'
            };
            modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: modalProps});
            logMetrikk('feil-ved-sending', err);
        });
    };

    const handleOnSendClicked = () => {

        if (stoppeInnsendingfeatureToggle) {
            const modalProps = {
                tittel: 'Problemer med å sende',
                beskrivelse: 'Det er problemer med å sende vedtak for øyeblikket. Vi jobber med å løse saken',
                viewAction: ActionType.UTKAST,
                knappeTekst : 'Tilbake til vedtakskjema'
            };
            modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: modalProps});
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

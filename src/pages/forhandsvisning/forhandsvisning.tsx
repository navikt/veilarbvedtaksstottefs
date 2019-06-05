import React, { useContext, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { useFetchState } from '../../components/providers/fetch-provider';
import { Status } from '../../utils/fetch-utils';
import PdfViewer from '../../components/pdf-viewer/pdf-viewer';
import Footer from '../../components/footer/footer';
import env from '../../utils/environment';
import vedtaksBrevUrl from '../../mock/vedtaksbrev-url';
import './forhandsvisning.less';
import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { STOPPE_VEDTAKSINNSENDING_TOGGLE } from '../../api/feature-toggle-api';
import { ModalViewDispatch } from '../../components/providers/modal-provider';
import { utkastetSkalKvalitetssikrets } from '../../components/skjema/skjema-utils';
import { KvalitetsSikringModalInnsending } from './kvalitetssikring';
import { VedtakData } from '../../utils/types/vedtak';

export function Forhandsvisning(props: { fnr: string }) {
    const [isSending, setIsSending] = useState(false);
    const [isFeilModalOpen, setIsFeilModalOpen] = useState(false);
    const [isKvalitetsSikringsModalOpen, setIsKvalitetsSikringsModalOpen] = useState(false);

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

    const tilbakeTilSkjema  = () => dispatch({view: ActionType.UTKAST});

    const tilbakeTilHovedsiden = () => {
        setVedtak({status: Status.NOT_STARTED, data: null as any});
        dispatch({view: ActionType.HOVEDSIDE});
        modalViewDispatch({modalView: ModalActionType.MODAL_VEDTAK_SENT_SUKSESS});
    };

    const sendVedtak = () => {
        if (isSending) {
            return;
        }

        setIsSending(true);
        VedtaksstotteApi.sendVedtak(props.fnr).then(() => {
            setIsSending(false);
            tilbakeTilHovedsiden();
        }).catch(() => {
            setIsSending(false);
            setIsFeilModalOpen(true);
        });
    };

    const handleOnSendClicked = () => {

        if (stoppeInnsendingfeatureToggle) {
            setIsFeilModalOpen(true);
            return;
        }

        if (kvalitetssikresVarsel) {
            setIsKvalitetsSikringsModalOpen(true);
            return;
        }
        sendVedtak();
    };

    return (
        <>
            <FeilModalInnsending
                isFeilModalOpen={isFeilModalOpen}
                onRequestClose={() => setIsFeilModalOpen(false)}
                tilbakeTilSkjema={tilbakeTilSkjema}
            />
            <KvalitetsSikringModalInnsending
                onRequestClose={() => setIsKvalitetsSikringsModalOpen(false)}
                isModalOpen={isKvalitetsSikringsModalOpen}
                sendVedtak={sendVedtak}
            />
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
                            onClick={tilbakeTilSkjema}
                        >
                            Tilbake til utkast
                        </Knapp>
                    </div>
                </Footer>
            </PdfViewer>
        </>
    );
}

function FeilModalInnsending (props: {onRequestClose: () => void, isFeilModalOpen: boolean, tilbakeTilSkjema: () => void}) {
    return (
        <VarselModal
            isOpen={props.isFeilModalOpen}
            contentLabel="Problem med sende vedtak"
            onRequestClose={props.onRequestClose}
            type="FEIL"
        >
            <Systemtittel>Problemer med å sende</Systemtittel>
            <Normaltekst>Det er problemer med å sende vedtak før øyeblikket. Vi jobber med å løse saken</Normaltekst>
            <Knapp onClick={props.tilbakeTilSkjema}>Tilbake til vedtakskjema</Knapp>
        </VarselModal>
    );
}

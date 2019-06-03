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
import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { STOPPE_VEDTAKSINNSENDING_TOGGLE } from '../../api/feature-toggle-api';

export function Forhandsvisning(props: { fnr: string }) {
    const [isSending, setIsSending] = useState(false);
    const [isFeilModalOpen, setIsFeilModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const {dispatch} = useContext(ViewDispatch);

    const [vedtak, setVedtak] = useFetchState('vedtak');
    const [features, setFeatures] = useFetchState('features');

    const stoppeInnsendingfeatureToggle = features.data[STOPPE_VEDTAKSINNSENDING_TOGGLE];
    const url = env.isDevelopment
        ? vedtaksBrevUrl
        : VedtaksstotteApi.hentForhandsvisningURL(props.fnr);

    const tilbakeTilSkjema  = () => dispatch({view: ActionType.UTKAST});

    const tilbakeTilHovedsiden = () => {
        setVedtak({status: Status.NOT_STARTED, data: null as any});
        dispatch({view: ActionType.HOVEDSIDE});
    };

    const handleOnSendClicked = () => {
        if (stoppeInnsendingfeatureToggle) {
            setIsFeilModalOpen(true);
            return;
        }

        if (isSending) {
            return;
        }

        setIsSending(true);
        VedtaksstotteApi.sendVedtak(props.fnr).then(() => {
            setIsSending(false);
            setIsSuccessModalOpen(true);
        }).catch(() => {
            setIsSending(false);
            setIsFeilModalOpen(true);
        });
    };

    return (
        <PdfViewer url={url} title="Forhåndsvisning av vedtaksbrevet">
            <FeilModalInnsending
                isFeilModalOpen={isFeilModalOpen}
                onRequestClose={() => setIsFeilModalOpen(false)}
                tilbakeTilSkjema={tilbakeTilSkjema}
            />
            <SuksessModalInnsending
                isSuccesModalOpen={isSuccessModalOpen}
                onRequestClose={tilbakeTilHovedsiden}
            />
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

function SuksessModalInnsending (props: {onRequestClose: () => void, isSuccesModalOpen: boolean}) {
    return (
        <VarselModal
            isOpen={props.isSuccesModalOpen}
            contentLabel="Vedtaket sendt til bruker"
            onRequestClose={props.onRequestClose}
            type="SUKSESS"
        >
            <Systemtittel>Vedtak sendt til bruker</Systemtittel>
            <Normaltekst>Du finner innholdet i vedtaket på fanen for oppfølgingsvedtak. Brukeren får vedtaksbrevet digitalt eller i posten</Normaltekst>
        </VarselModal>
    );
}
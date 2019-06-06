import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import React, { useContext, useEffect, useState } from 'react';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import { ModalViewDispatch } from  '../../components/providers/modal-provider';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';
import './kvalitetetssikring.less';

export function KvalitetsSikringModalInnsending (props: {sendVedtak: () => void}) {
    const {modalViewState, modalViewDispatch} = useContext(ModalViewDispatch);

    const skalViseModal = modalViewState.modalView === ModalActionType.MODAL_KVALITETSSIKRING;
    const [erKvalitetssikret, setErKvalitetssikret] = useState(false);
    const [error, setError] = useState<{feilmelding: string} | undefined>(undefined);
    const [harForsoktSende, setHarForsoktSende] = useState<boolean>(false);

    const handleSend = () => {
        setHarForsoktSende(true);
        if (erKvalitetssikret) {
            props.sendVedtak();
        } else {
            setError({feilmelding: 'Du må bekrefte før du får sendt vedtaket'});
        }
    };

    useEffect(() => {
        if (harForsoktSende && erKvalitetssikret) {
            setError(undefined);
        }
    }, [erKvalitetssikret]);

    return (
        <VarselModal
            isOpen={skalViseModal}
            contentLabel="Arbeidsevnevurderingen må godkjennes av beslutter"
            onRequestClose={() => modalViewDispatch({modalView: null})}
            type="ADVARSEL"
            shouldCloseOnOverlayClick={false}
            className="kvalitetssikring"
        >
            <Systemtittel>Kvalitetssikring</Systemtittel>
            <BekreftCheckboksPanel
                label="Jeg bekrefter at arbeidsevnevurderingen er godkjent av beslutter."
                onChange={(e: any) => setErKvalitetssikret(e.target.checked)}
                checked={erKvalitetssikret}
                feil={error}
            />
            <div className="knapper kvalitetssikring__knapper">
                <Hovedknapp onClick={handleSend}>Send til bruker</Hovedknapp>
                <Flatknapp onClick={() => modalViewDispatch({modalView: null})}>Avbryt</Flatknapp>
            </div>
        </VarselModal>
    );
}
import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { BekreftCheckboksPanel, Input } from 'nav-frontend-skjema';
import React, { useContext, useEffect, useState } from 'react';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import { ModalViewDispatch } from  '../../components/providers/modal-provider';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';
import './kvalitetetssikring.less';

interface KvalitetsSikringModalInnsendingProps {
    sendVedtak: (beslutter?: string) => void;
}

export function KvalitetsSikringModalInnsending (props: KvalitetsSikringModalInnsendingProps) {
    const {modalViewState, modalViewDispatch} = useContext(ModalViewDispatch);

    const skalViseModal = modalViewState.modalView === ModalActionType.MODAL_KVALITETSSIKRING;
    const [beslutter, setBeslutter] = useState('');
    const [error, setError] = useState<{feilmelding: string} | undefined>(undefined);
    const [harForsoktSende, setHarForsoktSende] = useState<boolean>(false);
    const harFyltUtBeslutter = beslutter.length > 0;

    const handleSend = () => {
        setHarForsoktSende(true);
        if (harFyltUtBeslutter) {
            props.sendVedtak(beslutter);
        } else {
            setError({feilmelding: 'Skriv inn navn på beslutter som har kvalitetssikret for å sende vedtaket'});
        }
    };

    useEffect(() => {
        if (harForsoktSende && harFyltUtBeslutter) {
            setError(undefined);
        }
    }, [beslutter]);

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
            <Input
                label="Navn på beslutter:"
                onChange={(e) => setBeslutter(e.target.value)}
                value={beslutter}
                feil={error}
                className="kvalitetssikring__input"
            />
            <div className="knapper kvalitetssikring__knapper">
                <Hovedknapp onClick={handleSend}>Send til bruker</Hovedknapp>
                <Flatknapp onClick={() => modalViewDispatch({modalView: null})}>Avbryt</Flatknapp>
            </div>
        </VarselModal>
    );
}

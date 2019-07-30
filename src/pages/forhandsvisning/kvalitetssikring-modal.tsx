import React, { useEffect, useState } from 'react';
import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import { ModalProps } from '../../components/modal/modal-props';
import { useModalStore } from '../../stores/modal-store';
import './kvalitetetssikring-modal.less';

interface KvalitetsSikringModalInnsendingProps extends ModalProps {
    sendVedtak: (beslutter?: string) => void;
}

export function KvalitetsSikringModalInnsending (props: KvalitetsSikringModalInnsendingProps) {
    const { hideModal } = useModalStore();
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
            isOpen={props.isOpen}
            contentLabel="Arbeidsevnevurderingen må godkjennes av beslutter"
            onRequestClose={hideModal}
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
                <Flatknapp onClick={hideModal}>Avbryt</Flatknapp>
            </div>
        </VarselModal>
    );
}

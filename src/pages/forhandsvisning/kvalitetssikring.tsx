import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import React, { useEffect, useState } from 'react';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';

export function KvalitetsSikringModalInnsending (props: {onRequestClose: () => void, isModalOpen: boolean, sendVedtak: () => void}) {
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
            isOpen={props.isModalOpen}
            contentLabel="Arbeidsevnevurderingen må godkjennes av beslutter"
            onRequestClose={props.onRequestClose}
            type="ADVARSEL"
        >
            <Systemtittel>Kvalitetssikring</Systemtittel>
            <BekreftCheckboksPanel
                label="Jeg bekrefter at arbeidsevnevurderingen er godkjent av beslutter."
                onChange={(e: any) => setErKvalitetssikret(e.target.checked)}
                checked={erKvalitetssikret}
                feil={error}
            />
            <Hovedknapp onClick={handleSend}>Send til bruker</Hovedknapp>
            <Flatknapp onClick={props.onRequestClose}>Avbryt</Flatknapp>
        </VarselModal>
    );
}
import * as React from 'react';
import './aksjoner.less';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ReactComponent as SlettIkon } from './slett.svg';
import { useState } from 'react';
import { VarselModal } from '../../modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface AksjonerProps {
    handleSubmit: (e: any) => void;
    handleLagreOgTilbake: (e: any) => void;
    handleSlett: () => void;
}

function Aksjoner (props: AksjonerProps) {
    const [isSlettModalOpen, setIsSlettModalOpen] = useState(false);
    return (
        <div className="aksjoner">
            <SlettModal
                isSlettModalOpen={isSlettModalOpen}
                onRequestClose={() => setIsSlettModalOpen(false)}
                slettVedtak={props.handleSlett}
            />
            <div className="aksjoner__lagre">
                <Hovedknapp htmlType="submit" onClick={props.handleSubmit}>
                    Forhåndsvis og ferdigstill
                </Hovedknapp>
                <Knapp htmlType="button" onClick={props.handleLagreOgTilbake}>
                    Lagre og gå tilbake
                </Knapp>
            </div>
            <div className="aksjoner__slett">
                <Flatknapp htmlType="button" onClick={() => setIsSlettModalOpen(true)}>
                    <SlettIkon className="aksjoner__slett-ikon"/>
                    Slett
                </Flatknapp>
            </div>
        </div>
    );

}

function SlettModal (props: {onRequestClose: () => void, isSlettModalOpen: boolean, slettVedtak: () => void}) {
    return (
        <VarselModal
            isOpen={props.isSlettModalOpen}
            contentLabel="Bekreft slett utkast"
            onRequestClose={props.onRequestClose}
            type="ADVARSEL"
        >
            <Systemtittel>Slett utkast</Systemtittel>
            <Normaltekst>Er du sikker på at du vil slette utkastet?</Normaltekst>
            <div className="knapper">
                <Hovedknapp className="btn--mr1" onClick={props.slettVedtak}>Slett</Hovedknapp>
                <Knapp onClick={props.onRequestClose}> Avbryt</Knapp>
            </div>
        </VarselModal>
    );
}

export default Aksjoner;

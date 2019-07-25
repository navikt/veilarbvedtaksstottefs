import React from 'react';
import './aksjoner.less';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ReactComponent as SlettIkon } from './slett.svg';
import { ModalType, useModalStore } from '../../../stores/modal-store';

interface AksjonerProps {
    handleForhandsvis: (e: any) => void;
    handleLagreOgTilbake: (e: any) => void;
}

function Aksjoner (props: AksjonerProps) {
    const { showModal } = useModalStore();




    return (
        <div className="aksjoner">
            <div className="aksjoner__knapper">
                <Hovedknapp mini={true} htmlType="submit" onClick={props.handleForhandsvis}>
                    Forhåndsvis og ferdigstill
                </Hovedknapp>
                <Knapp mini={true} htmlType="button" onClick={props.handleLagreOgTilbake}>
                    Lagre og gå tilbake
                </Knapp>
            </div>
            <Flatknapp
                className="aksjoner__slett"
                mini={true} htmlType="button"
                onClick={() => showModal(ModalType.BEKREFT_SLETT_UTKAST)}
            >
                <SlettIkon className="aksjoner__slett-ikon"/>
                Slett
            </Flatknapp>
        </div>
    );

}

export default Aksjoner;

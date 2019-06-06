import { VarselModal } from '../../components/modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Knapp } from 'nav-frontend-knapper';
import React, { useContext } from 'react';
import { ModalViewDispatch } from '../../components/providers/modal-provider';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';
import { ViewDispatch } from '../../components/providers/view-provider';
import { ActionType } from '../../components/viewcontroller/view-reducer';

export function FeilModalInnsending () {
    const {modalViewState, modalViewDispatch} = useContext(ModalViewDispatch);

    const skalViseModal = modalViewState.modalView === ModalActionType.MODAL_FEIL_VID_LASTNING;
    const {dispatch} = useContext(ViewDispatch);
    return (
        <VarselModal
            isOpen={skalViseModal}
            contentLabel="Problem med sende vedtak"
            onRequestClose={() => modalViewDispatch({modalView: null})}
            type="FEIL"
            shouldCloseOnOverlayClick={false}
        >
            <Systemtittel>Problemer med å sende</Systemtittel>
            <Normaltekst>Det er problemer med å sende vedtak før øyeblikket. Vi jobber med å løse saken</Normaltekst>
            <Knapp
                onClick={() => {
                    dispatch({view: ActionType.UTKAST});
                    modalViewDispatch({modalView: null});
                }}
            >
                Tilbake til vedtakskjema
            </Knapp>
        </VarselModal>
    );
}
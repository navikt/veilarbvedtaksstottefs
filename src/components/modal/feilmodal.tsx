import { useContext } from 'react';
import { ModalViewDispatch } from '../providers/modal-provider';
import { ModalActionType } from '../modalcontroller/modal-reducer';
import { ViewDispatch } from '../providers/view-provider';
import { VarselModal } from './varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Knapp } from 'nav-frontend-knapper';
import React from 'react';

export function FeilModal (props: {children: React.ReactNode}) {
    const {modalViewState, modalViewDispatch} = useContext(ModalViewDispatch);
    const skalViseModal = modalViewState.modalView === ModalActionType.MODAL_FEIL;
    const {tittel, beskrivelse, viewAction, knappeTekst} = modalViewState.props || {tittel: '', beskrivelse: '', viewAction: null, knappeTekst: ''};
    const {dispatch} = useContext(ViewDispatch);

    const view = typeof viewAction === 'object' ?  viewAction : {view: viewAction};
    return (
        <>
            <VarselModal
                isOpen={skalViseModal}
                contentLabel="Feil vid hentning av data"
                onRequestClose={() => modalViewDispatch({modalView: null})}
                type="FEIL"
                shouldCloseOnOverlayClick={false}
            >
                <Systemtittel>{tittel}</Systemtittel>
                <Normaltekst>{beskrivelse}</Normaltekst>
                <Knapp
                    onClick={() => {
                        dispatch(view);
                        modalViewDispatch({modalView: null});
                    }}
                >
                    {knappeTekst}
                </Knapp>
            </VarselModal>
            {props.children}
        </>
    );
}
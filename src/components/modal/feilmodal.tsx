import React from 'react';
import { useContext } from 'react';
import { VarselModal } from './varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Knapp } from 'nav-frontend-knapper';


export function FeilModal() {
    // const skalViseModal = modalViewState.modalView === ModalActionType.MODAL_FEIL;
    // const {tittel, beskrivelse, viewAction, knappeTekst} = modalViewState.props || {
    //     tittel: '',
    //     beskrivelse: '',
    //     viewAction: null,
    //     knappeTekst: ''
    // };
    // const {dispatch} = useContext(ViewDispatch);
    //
    // const view = typeof viewAction === 'object' ? viewAction : {view: viewAction};
    // return (
    //     <VarselModal
    //         isOpen={skalViseModal}
    //         contentLabel="Feil vid hentning av data"
    //         onRequestClose={() => modalViewDispatch({modalView: null})}
    //         type="FEIL"
    //         shouldCloseOnOverlayClick={false}
    //     >
    //         <Systemtittel>{tittel}</Systemtittel>
    //         <Normaltekst>{beskrivelse}</Normaltekst>
    //         {knappeTekst &&
    //         <Knapp
    //             onClick={() => {
    //                 dispatch(view);
    //                 modalViewDispatch({modalView: null});
    //             }}
    //         >
    //             {knappeTekst}
    //         </Knapp>}
    //     </VarselModal>
    // );
    return null;
}

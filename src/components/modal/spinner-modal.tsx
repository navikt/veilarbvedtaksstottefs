import React, { useContext } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import './modal.less';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { ModalViewDispatch } from '../../stores/modal-provider';
import { ModalActionType } from '../../stores/modal-reducer';

export function SpinnerModal() {
    const {modalViewState} = useContext(ModalViewDispatch);

    const skalViseModal = modalViewState.modalView === ModalActionType.MODAL_LASTER_DATA;
    return (
        <ModalWrapper
            isOpen={skalViseModal}
            contentLabel="Laster data"
            onRequestClose={() => {}} // tslint:disable-line:no-empty
            closeButton={false}
            portalClassName="veilarbvedtaksstottefs-modal spinner-modal"
        >
            <div className="modal__innehold">
                <NavFrontendSpinner type="XXL"/>
            </div>
        </ModalWrapper>
    );
}

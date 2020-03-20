import { useState } from 'react';
import createUseContext from 'constate';

export enum ModalType {
	INGEN = 'INGEN',
	VEDTAK_SENT_SUKSESS = 'VEDTAK_SENT_SUKSESS',
	LASTER = 'LASTER_DATA',
	BEKREFT_SLETT_UTKAST = 'BEKREFT_SLETT_UTKAST',
	BEKREFT_TA_OVER_UTKAST = 'BEKREFT_TA_OVER_UTKAST',
	FEIL_VED_OPPRETTING_AV_UTKAST = 'FEIL_VED_OPPRETTING_AV_UTKAST',
	FEIL_UTSENDING_STOPPET = 'FEIL_UTSENDING_STOPPET',
	FEIL_VED_FORHANDSVISNING = 'FEIL_VED_FORHANDSVISNING',
	FEIL_VED_SENDING = 'FEIL_VED_SENDING',
	FEIL_VED_SLETTING = 'FEIL_VED_SLETTING',
	FEIL_VED_OVERTAKELSE = 'FEIL_VED_OVERTAKELSE',
	FEIL_VED_VISNING = 'FEIL_VED_VISNING',
	FEIL_VED_LAGRING = 'FEIL_VED_LAGRING',
	FEIL_VED_START_BESLUTTER_PROSESS = 'FEIL_VED_START_BESLUTTER_PROSESS',
	FEIL_VED_UTSENDING_AV_DIALOG_MELDING = 'FEIL_VED_UTSENDING_AV_DIALOG_MELDING'
}

export const useModalStore = createUseContext(() => {
	const [modalType, setModalType] = useState<ModalType>(ModalType.INGEN);
	const [modalProps, setModalProps] = useState<any>({});

	const showModal = (type: ModalType, props: object = {}) => {
		setModalProps(props);
		setModalType(type);
	};

	const hideModal = () => {
		setModalType(ModalType.INGEN);
	};

	return { modalType, modalProps, showModal, hideModal };
});

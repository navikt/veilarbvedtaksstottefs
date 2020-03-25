import React from 'react';
import { ModalType, useModalStore } from '../stores/modal-store';
import { FeilModal } from './modal/feil-modal/feil-modal';
import {
	FeilModalConfig,
	feilVedBliBeslutterConfig,
	feilVedForhandsvisnigConfig,
	feilVedLagringConfig,
	feilVedOpprettingAvUtkast,
	feilVedOvertakelseAvUtkastConfig,
	feilVedSendningConfig,
	feilVedSlettingAvUtkastConfig, feilVedStartBeslutterProsessConfig, feilVedUtsendingAvDialogMelding,
	feilVedVisningConfig,
	stoppeUtsendingFeatureToggleConfig
} from './modal/feil-modal/feil-modal-config';
import { SpinnerModal } from './modal/spinner-modal/spinner-modal';
import { VedtakSendtModal  } from './modal/vedtak-sendt/vedtak-sendt-modal';
import SlettUtkastModal from './modal/slett-utkast-modal';
import TaOverModal from './modal/ta-over-modal/ta-over-modal';

function finnFeilModalConfig(modalType: ModalType): FeilModalConfig | null {
	switch (modalType) {
		case ModalType.FEIL_VED_OPPRETTING_AV_UTKAST:
			return feilVedOpprettingAvUtkast;
		case ModalType.FEIL_VED_SENDING:
			return feilVedSendningConfig;
		case ModalType.FEIL_UTSENDING_STOPPET:
			return stoppeUtsendingFeatureToggleConfig;
		case ModalType.FEIL_VED_FORHANDSVISNING:
			return feilVedForhandsvisnigConfig;
		case ModalType.FEIL_VED_SLETTING:
			return feilVedSlettingAvUtkastConfig;
		case ModalType.FEIL_VED_VISNING:
			return feilVedVisningConfig;
		case ModalType.FEIL_VED_LAGRING:
			return feilVedLagringConfig;
		case ModalType.FEIL_VED_OVERTAKELSE:
			return feilVedOvertakelseAvUtkastConfig;
		case ModalType.FEIL_VED_START_BESLUTTER_PROSESS:
			return feilVedStartBeslutterProsessConfig;
		case ModalType.FEIL_VED_BLI_BESLUTTER:
			return feilVedBliBeslutterConfig;
		case ModalType.FEIL_VED_UTSENDING_AV_DIALOG_MELDING:
			return feilVedUtsendingAvDialogMelding;
		default:
			return null;
	}
}

export function ModalController() {
	const { modalType, modalProps } = useModalStore();
	const feilModalConfig = finnFeilModalConfig(modalType);

	return (
		<>
			<SpinnerModal isOpen={modalType === ModalType.LASTER} />
			<VedtakSendtModal
				isOpen={modalType === ModalType.VEDTAK_SENT_SUKSESS}
				sendesVedtakDigitalt={modalProps.sendesVedtakDigitalt}
			/>
			<SlettUtkastModal isOpen={modalType === ModalType.BEKREFT_SLETT_UTKAST} />
			<TaOverModal isOpen={modalType === ModalType.BEKREFT_TA_OVER_UTKAST} />
			{feilModalConfig && <FeilModal isOpen={feilModalConfig != null} config={feilModalConfig} />}
		</>
	);
}

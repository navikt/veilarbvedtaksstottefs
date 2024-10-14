import { ModalType, useModalStore } from '../store/modal-store';
import { FeilModal } from './modal/feil-modal/feil-modal';
import {
	FeilModalConfig,
	feilVedAvbrytBeslutterProsessConfig,
	feilVedBliBeslutterConfig,
	feilVedForhandsvisnigConfig,
	feilVedGodkjenningAvBeslutterConfig,
	feilVedLagringConfig,
	feilVedOppdaterBeslutterProsessStatusConfig,
	feilVedOpprettingAvUtkastConfig,
	feilVedOvertakelseAvUtkastConfig,
	feilVedSendingConfig,
	feilVedSlettingAvUtkastConfig,
	feilVedStartBeslutterProsessConfig,
	feilVedUtsendingAvDialogMeldingConfig,
	feilVedValideringAvUtkastConfig,
	feilVedVisningConfig,
	stoppeUtsendingFeatureToggleConfig
} from './modal/feil-modal/feil-modal-config';
import SpinnerModal from './modal/spinner-modal/spinner-modal';
import BekreftSendVedtakModal from './modal/bekreft-send-vedtak-modal';
import SlettUtkastModal from './modal/slett-utkast-modal';
import TaOverModal from './modal/ta-over-modal';
import AvbrytBeslutterProsessModal from './modal/avbryt-beslutterprosess-modal';
import GodkjennModal from './modal/godkjenn-modal';

function finnFeilModalConfig(modalType: ModalType): FeilModalConfig | null {
	switch (modalType) {
		case ModalType.FEIL_VED_OPPRETTING_AV_UTKAST:
			return feilVedOpprettingAvUtkastConfig;
		case ModalType.FEIL_VED_SENDING:
			return feilVedSendingConfig;
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
		case ModalType.FEIL_VED_AVBRYT_BESLUTTER_PROSESS:
			return feilVedAvbrytBeslutterProsessConfig;
		case ModalType.FEIL_VED_BLI_BESLUTTER:
			return feilVedBliBeslutterConfig;
		case ModalType.FEIL_VED_UTSENDING_AV_DIALOG_MELDING:
			return feilVedUtsendingAvDialogMeldingConfig;
		case ModalType.FEIL_VED_OPPDATER_BESLUTTER_PROSESS_STATUS:
			return feilVedOppdaterBeslutterProsessStatusConfig;
		case ModalType.FEIL_VED_GODKJENT_AV_BESLUTTER:
			return feilVedGodkjenningAvBeslutterConfig;
		case ModalType.FEIL_VED_VALIDERING_AV_UTKAST:
			return feilVedValideringAvUtkastConfig;
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
			<BekreftSendVedtakModal
				isOpen={modalType === ModalType.BEKREFT_SEND_VEDTAK}
				onSendVedtakBekreftet={modalProps.onSendVedtakBekreftet}
			/>
			<SlettUtkastModal isOpen={modalType === ModalType.BEKREFT_SLETT_UTKAST} />
			<TaOverModal isOpen={modalType === ModalType.BEKREFT_TA_OVER_UTKAST} />
			<GodkjennModal
				isOpen={modalType === ModalType.BEKREFT_SEND_TIL_GODKJENNING}
				onGodkjennUtkastBekreftet={modalProps.onGodkjennVedtakBekreftet}
			/>
			<AvbrytBeslutterProsessModal
				isOpen={modalType === ModalType.BEKREFT_AVBRYT_BESLUTTER_PROSESS}
				innsatsgruppe={modalProps.innsatsgruppe}
			/>
			{feilModalConfig && <FeilModal isOpen={feilModalConfig != null} config={feilModalConfig} />}
		</>
	);
}

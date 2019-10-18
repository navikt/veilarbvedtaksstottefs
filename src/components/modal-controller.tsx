import React from 'react';
import { ModalType, useModalStore } from '../stores/modal-store';
import { FeilModal } from './modal/feil-modal/feil-modal';
import {
	FeilModalConfig,
	feilVedForhandsvisnigConfig,
	feilVedLagringConfig, feilVedOpprettingAvBeslutterOppgave,
	feilVedOpprettingAvUtkast,
	feilVedSendningConfig,
	feilVedSlettingAvUtkastConfig,
	feilVedVisningConfig,
	stoppeInnsendingFeatureToggleConfig
} from './modal/feil-modal/feil-modal-config';
import { SpinnerModal } from './modal/spinner-modal/spinner-modal';
import { KvalitetsSikringModalInnsending } from './modal/kvalitetssikring-modal/kvalitetssikring-modal';
import { SuksessModalInnsending } from './modal/sukssessmodal-innsending';
import SlettUtkastModal from './modal/slett-utkast-modal';
import { BeslutterOppgaveModal } from './modal/beslutter-oppgave-modal/beslutter-oppgave-modal';

function finnFeilModalConfig(modalType: ModalType): FeilModalConfig | null {
	switch (modalType) {
		case ModalType.FEIL_VED_OPPRETTING_AV_BESLUTTER_OPPGAVE:
			return feilVedOpprettingAvBeslutterOppgave;
		case ModalType.FEIL_VED_OPPRETTING_AV_UTKAST:
			return feilVedOpprettingAvUtkast;
		case ModalType.FEIL_VED_SENDING:
			return feilVedSendningConfig;
		case ModalType.FEIL_INNSENDING_STOPPET:
			return stoppeInnsendingFeatureToggleConfig;
		case ModalType.FEIL_VED_FORHANDSVISNING:
			return feilVedForhandsvisnigConfig;
		case ModalType.FEIL_VED_SLETTING:
			return feilVedSlettingAvUtkastConfig;
		case ModalType.FEIL_VED_VISNING:
			return feilVedVisningConfig;
		case ModalType.FEIL_VED_LAGRING:
			return feilVedLagringConfig;
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
			<KvalitetsSikringModalInnsending
				isOpen={modalType === ModalType.KVALITETSSIKRING}
				sendVedtak={modalProps.sendVedtak}
				beslutter={modalProps.beslutterNavn}
			/>
			<BeslutterOppgaveModal isOpen={modalType === ModalType.BESLUTTER_OPPGAVE} />
			<SuksessModalInnsending isOpen={modalType === ModalType.VEDTAK_SENT_SUKSESS} />
			<SlettUtkastModal isOpen={modalType === ModalType.BEKREFT_SLETT_UTKAST} />
			{feilModalConfig && <FeilModal isOpen={feilModalConfig != null} config={feilModalConfig} />}
		</>
	);
}

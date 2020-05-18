import React from 'react';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import './vedtak-sendt-modal.less';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { fetchWithInfo } from '../../../rest/utils';
import { lagSendVedtakFetchInfo } from '../../../rest/api';
import { useAppStore } from '../../../stores/app-store';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { useDataFetcherStore } from '../../../stores/data-fetcher-store';
import { frontendlogger } from '../../../utils/frontend-logger';

export function BekreftVedtakSendtModal(props: ModalProps) {
	const { fnr } = useAppStore();
	const { resetSkjema } = useSkjemaStore();
	const { hideModal } = useModalStore();
	const { showModal } = useModalStore();
	const { changeView } = useViewStore();
	const { vedtakFetcher } = useDataFetcherStore();

	const sendVedtak = () => {
		fetchWithInfo(lagSendVedtakFetchInfo({fnr}))
			.then(() => {
				resetSkjema();
				vedtakFetcher.fetch({fnr}, () => {
					changeView(ViewType.HOVEDSIDE);
					showModal(ModalType.VEDTAK_SENT_SUKSESS);
				});
			})
			.catch(err => {
				showModal(ModalType.FEIL_VED_SENDING);
				frontendlogger.logMetrikk('feil-ved-sending', err);
			});
	};

	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Vedtaket sendt til bruker"
			onRequestClose={hideModal}
			varselIkonType={VarselIkonType.INGEN}
			portalClassName="vedtak-sendt-modal"
		>
			      <Systemtittel className="vedtak-sendt-modal__tekst">Er du sikker på at du vil sende vedtaksbrev til bruker?</Systemtittel>
			      <div className="varsel-modal__knapper">
			      		<Hovedknapp onClick={() => sendVedtak()}>JA, SEND NÅ</Hovedknapp>
			      		<Knapp onClick={hideModal}>AVBRYT</Knapp>
			      </div>
		</VarselModal>
	);
}

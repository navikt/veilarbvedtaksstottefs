import React, { useEffect, useState } from 'react';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../stores/modal-store';
import ModalWrapper from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import { fetchWithInfo, hasData, hasFailed, isNotStartedOrPending } from '../../../rest/utils';
import {
	lagHentVeiledereFetchInfo, lagOpprettBeslutterOppgaveFetchInfo
} from '../../../rest/api';
import { useAppStore } from '../../../stores/app-store';
import useFetch from '../../../rest/use-fetch';
import { VeiledereData } from '../../../rest/data/veiledere';
import { BeslutterOppgaveData, BeslutterOppgaveModalInnhold } from './beslutter-oppgave-modal-innhold';
import Spinner from '../../spinner/spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import Show from '../../show';
import { useFetchStore } from '../../../stores/fetch-store';
import { useViewStore, ViewType } from '../../../stores/view-store';
import './beslutter-oppgave-modal.less';

export function BeslutterOppgaveModal(props: ModalProps) {
	const {vedtak} = useFetchStore();
	const {hideModal} = useModalStore();
	const {changeView} = useViewStore();
	const {fnr, enhetId} = useAppStore();
	const onClose = () => {
		hideModal();
		setInnsendingFeilet(false);
	};

	const [senderOppgave, setSenderOppgave] = useState();
	const [innsendingFeilet, setInnsendingFeilet] = useState();
	const veiledere = useFetch<VeiledereData>(lagHentVeiledereFetchInfo);

	useEffect(() => {
		if (isNotStartedOrPending(veiledere) && props.isOpen) {
			veiledere.fetch({enhetId});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.isOpen]);

	function handleSubmit(data: BeslutterOppgaveData) {
		setSenderOppgave(true);

		fetchWithInfo(lagOpprettBeslutterOppgaveFetchInfo({fnr, ...data}))
			.then(() => {
				vedtak.fetch({fnr}, () => {
					hideModal();
					changeView(ViewType.HOVEDSIDE);
				});
			})
			.catch(() => {
				setSenderOppgave(false);
				setInnsendingFeilet(true);
			});
	}

	return (
		<ModalWrapper
			isOpen={props.isOpen}
			contentLabel="Send Gosys-oppgave til beslutter"
			onRequestClose={onClose}
			closeButton={true}
			portalClassName="beslutter-oppgave-modal"
			shouldCloseOnOverlayClick={true}
		>
			<div className="beslutter-oppgave-modal__tittel-wrapper blokk-s">
				<Undertittel className="beslutter-oppgave-modal__tittel">Send Gosys-oppgave til beslutter</Undertittel>
			</div>
			<Show if={hasFailed(veiledere)}>
				<AlertStripeFeil>
					Et problem oppstod under innlastingen av data. Prøv igjen senere.
				</AlertStripeFeil>
			</Show>
			<Show if={isNotStartedOrPending(veiledere)}>
				<Spinner/>
			</Show>
			<Show if={hasData(veiledere)}>
				<BeslutterOppgaveModalInnhold
					veiledereData={veiledere.data}
					onSubmit={handleSubmit}
					onCancel={onClose}
					senderOppgave={senderOppgave}
					innsendingFeilet={innsendingFeilet}
				/>
			</Show>
		</ModalWrapper>
	);
}

import React, { FormEvent, useState } from 'react';
import { ModalProps } from '../modal-props';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import ModalWrapper from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import './beslutter-oppgave-modal.less';
import { Select, Textarea } from 'nav-frontend-skjema';
import { formatInputDate } from '../../../utils/date-utils';
import { fetchWithInfo } from '../../../rest/utils';
import { lagOpprettBeslutterOppgaveFetchInfo, OpprettBeslutterOppgaveFetchParams } from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useFetchStore } from '../../../stores/fetch-store';
import { useAppStore } from '../../../stores/app-store';

const MAX_BESKRIVELSE_LENGDE = 250;

export function BeslutterOppgaveModal(props: ModalProps) {
	const {hideModal, showModal} = useModalStore();
	const {changeView} = useViewStore();
	const {vedtak} = useFetchStore();
	const {fnr} = useAppStore();
	const [aktivFra, setAktivFra] = useState(formatInputDate(new Date()));
	const [frist, setFrist] = useState('');
	const [enhet, setEnhet] = useState('');
	const [beskrivelse, setBeskrivelse] = useState('');
	const [senderOppgave, setSenderOppgave] = useState(false);

	// https://app-q0.adeo.no/veilarbveileder/api/veileder/enheter
	// https://app-q0.adeo.no/veilarbveileder/api/enhet/0219/veiledere

	function handleRequestModalClose() {
		if (!senderOppgave) {
			hideModal();
		}
	}

	function handleBeskrivelseChanged(e: any) {
		const value = e.target.value;
		if (value.length <= MAX_BESKRIVELSE_LENGDE) {
			setBeskrivelse(value);
		}
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const params: OpprettBeslutterOppgaveFetchParams = {
			aktivFra,
			frist,
			beslutter: '',
			enhet,
			beskrivelse
		};

		setSenderOppgave(true);

		fetchWithInfo(lagOpprettBeslutterOppgaveFetchInfo(params))
			.then(() => {
				vedtak.fetch({ fnr }, () => {
					changeView(ViewType.HOVEDSIDE);
				});
			})
			.catch(() => {
				setSenderOppgave(false);
				showModal(ModalType.FEIL_VED_OPPRETTING_AV_BESLUTTER_OPPGAVE);
			});
	}

	return (
		<ModalWrapper
			isOpen={props.isOpen}
			contentLabel="Send Gosys-oppgave til beslutter"
			onRequestClose={handleRequestModalClose}
			closeButton={false}
			portalClassName="veilarbvedtaksstottefs-beslutter-oppgave-modal"
			shouldCloseOnOverlayClick={true}
		>
			<Systemtittel className="blokk-s">Send Gosys-oppgave til beslutter</Systemtittel>
			<form onSubmit={handleSubmit}>
				<div className="blokk-l">
					<Select id="tema" label="Tema" disabled={true}>
						<option value="oppfolging">Oppfølging</option>
					</Select>
					<Select id="oppgavetype" label="Oppgavetype" disabled={true}>
						<option value="vurder_hendvendelse">Vurder henvendelse</option>
					</Select>
					<Select id="prioritet" className="blokk-s" label="Prioritet" disabled={true}>
						<option value="normal">Normal</option>
					</Select>
					<div className="blokk-s to-kol">
						<div>
							<label htmlFor="fraDato">Aktiv fra</label>
							<br/>
							<input id="fraDato" type="date" onChange={(e) => setAktivFra(e.target.value)} value={aktivFra}/>
						</div>
						<div>
							<label htmlFor="frist">Frist</label>
							<br/>
							<input id="frist" type="date" onChange={(e) => setFrist(e.target.value)} value={frist}/>
						</div>
					</div>
					<div className="to-kol">
						<Select id="enhet" label="Enhet">
							<option value="1337">1337, Gotham city</option>
						</Select>
						<Select id="beslutter" label="Beslutter">
							<option value="z1234">Beslutter Besluttersen</option>
						</Select>
					</div>
					<Textarea
						id="beskrivelse"
						maxLength={MAX_BESKRIVELSE_LENGDE}
						label="Beskrivelse"
						value={beskrivelse}
						onChange={handleBeskrivelseChanged}
					/>
				</div>
				<div className="knapperad">
					<Hovedknapp
						spinner={senderOppgave}
						disabled={senderOppgave}
						htmlType="submit"
						mini={true}
					>
						Bekreft
					</Hovedknapp>
					<Knapp
						disabled={senderOppgave}
						htmlType="button"
						mini={true}
						onClick={handleRequestModalClose}
					>
						Avbryt
					</Knapp>
				</div>
			</form>
		</ModalWrapper>
	);
}

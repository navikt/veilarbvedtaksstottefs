import React, { ChangeEvent, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import sendIkon from './send.svg';
import { useDataStore } from '../../../../stores/data-store';
import { fetchWithInfo } from '../../../../rest/utils';
import { lagSendDialogFetchInfo } from '../../../../rest/api';
import { useAppStore } from '../../../../stores/app-store';
import { ModalType, useModalStore } from '../../../../stores/modal-store';
import './skrivefelt.less';

export const Skrivefelt = () => {
	const { fnr } = useAppStore();
	const { leggTilDialogMelding, innloggetVeileder } = useDataStore();
	const { showModal } = useModalStore();
	const [melding, setMelding] = useState('');
	const [senderMelding, setSenderMelding] = useState(false);
	const harIkkeSkrevetMelding = melding.trim().length === 0;

	function handleOnDialogSendClicked() {
		setSenderMelding(true);

		fetchWithInfo(lagSendDialogFetchInfo({ fnr, melding }))
			.then(() => {
				const { ident, navn } = innloggetVeileder;
				leggTilDialogMelding(melding, ident, navn);
				setMelding('');
				setSenderMelding(false);
			}).catch(() => {
				showModal(ModalType.FEIL_VED_UTSENDING_AV_DIALOG_MELDING);
				setSenderMelding(false);
			});
	}

	function handleOnMeldingChanged(e: ChangeEvent<HTMLInputElement>) {
		if (!senderMelding) {
			setMelding(e.target.value);
		}
	}

	return (
    	<div className="skrivefelt">
		    <Input
			    className="skrivefelt__input"
			    label=""
			    value={melding}
			    onChange={handleOnMeldingChanged}
			    placeholder="Skriv en kommentar"
		    />
		    <button disabled={senderMelding || harIkkeSkrevetMelding} className="skrivefelt__send-knapp" onClick={handleOnDialogSendClicked} aria-label="Send">
			    <img className="skrivefelt__send-ikon" src={sendIkon} alt="Send" />
		    </button>
	    </div>
    );
};

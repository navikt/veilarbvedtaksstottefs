import React, { ChangeEvent, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import sendIkon from './send.svg';
import { fetchWithInfo } from '../../../../rest/utils';
import { lagSendDialogFetchInfo } from '../../../../rest/api';
import { useAppStore } from '../../../../stores/app-store';
import { ModalType, useModalStore } from '../../../../stores/modal-store';
import { useDataFetcherStore } from '../../../../stores/data-fetcher-store';
import './skrivefelt.less';

let midlertidigMelding = '';

export const Skrivefelt = () => {
	const { fnr } = useAppStore();
	const { showModal } = useModalStore();
	const { meldingFetcher } = useDataFetcherStore();

	const [melding, setMelding] = useState(midlertidigMelding);
	const [senderMelding, setSenderMelding] = useState(false);
	const harIkkeSkrevetMelding = melding.trim().length === 0;

	function oppdaterMelding(tekst: string) {
		setMelding(tekst);
		midlertidigMelding = tekst;
	}

	function handleOnDialogSendClicked() {
		setSenderMelding(true);

		fetchWithInfo(lagSendDialogFetchInfo({ fnr, melding }))
			.then(() => {
				meldingFetcher.fetch({ fnr }, () => {
					oppdaterMelding('');
					setSenderMelding(false);
				});
			}).catch(() => {
				showModal(ModalType.FEIL_VED_UTSENDING_AV_DIALOG_MELDING);
				setSenderMelding(false);
			});
	}

	function handleOnMeldingChanged(e: ChangeEvent<HTMLInputElement>) {
		if (!senderMelding) {
			oppdaterMelding(e.target.value);
		}
	}

	return (
    	<div className="skrivefelt">
		    <Input
			    className="skrivefelt__input"
			    label=""
			    disabled={senderMelding}
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

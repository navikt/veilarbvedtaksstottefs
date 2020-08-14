import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import sendIkon from './send.svg';
import { fetchMeldinger, fetchSendDialog } from '../../../rest/api';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import './skrivefelt.less';
import ImageButton from '../../image-button/image-button';
import { useDataStore } from '../../../stores/data-store';
import { hentId } from '../../../utils';

let midlertidigMelding = '';

export const Skrivefelt = () => {
	const { showModal } = useModalStore();
	const { utkast, setMeldinger} = useDataStore();

	const [melding, setMelding] = useState(midlertidigMelding);
	const [senderMelding, setSenderMelding] = useState(false);
	const skrivefeltRef = useRef<HTMLInputElement | null>(null);

	const kanSendeMelding = !senderMelding && melding.trim().length > 0;

	function oppdaterMelding(tekst: string) {
		setMelding(tekst);
		midlertidigMelding = tekst;
	}

	function handleSkrivefeltKeyPress(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && kanSendeMelding) {
			sendMelding();
		}
	}

	function sendMelding() {
		setSenderMelding(true);

		fetchSendDialog({vedtakId: hentId(utkast), melding})
			.then(() => fetchMeldinger(hentId(utkast)))
			.then(response => {
				if (response.data) {
					setMeldinger(response.data);
				}
				oppdaterMelding('');
				if (skrivefeltRef.current) {
					skrivefeltRef.current.focus();
				}
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_UTSENDING_AV_DIALOG_MELDING);
			})
			.finally(() => setSenderMelding(false));
	}

	function handleOnMeldingChanged(e: ChangeEvent<HTMLInputElement>) {
		if (!senderMelding) {
			oppdaterMelding(e.target.value);
		}
	}

	return (
    	<div className="skrivefelt">
		    <Input
		        inputRef={(inputRef) => skrivefeltRef.current = inputRef}
			    className="skrivefelt__input"
			    label=""
			    disabled={senderMelding}
			    value={melding}
			    onChange={handleOnMeldingChanged}
			    placeholder="Skriv en kommentar"
			    onKeyPress={handleSkrivefeltKeyPress}
		    />
		    <ImageButton
			    disabled={!kanSendeMelding} src={sendIkon}
			    alt="Send"
			    aria-label="Send"
			    className="skrivefelt__send-knapp"
			    imgClassName="skrivefelt__send-knapp-ikon"
			    onClick={sendMelding}
		    />
	    </div>
    );
};

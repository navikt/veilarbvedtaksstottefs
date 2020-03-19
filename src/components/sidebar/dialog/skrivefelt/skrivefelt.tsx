import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import sendIkon from './send.svg';
import './skrivefelt.less';

export const Skrivefelt = () => {
	const [melding, setMelding] = useState('');

	function handleOnDialogSendClicked() {
		// TODO
	}

    return (
    	<div className="skrivefelt">
		    <Input
			    className="skrivefelt__input"
			    label=""
			    value={melding}
			    onChange={(e) => setMelding(e.target.value)}
			    placeholder="Skriv en kommentar"
		    />
		    <button className="skrivefelt__send-knapp" onClick={handleOnDialogSendClicked} aria-label="Send">
			    <img className="skrivefelt__send-ikon" src={sendIkon} alt="Send" />
		    </button>
	    </div>
    );
};

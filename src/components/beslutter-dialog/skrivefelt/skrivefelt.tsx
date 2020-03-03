import React, { useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import './skrivefelt.less';

export const Skrivefelt = () => {
	const [melding, setMelding] = useState('');

	function handleOnDialogSendClicked() {
		// TODO
	}

    return (
    	<div className="skrivefelt">
		    <Input label="" value={melding} onChange={(e) => setMelding(e.target.value)}/>
		    <button onClick={handleOnDialogSendClicked}>Send</button>
	    </div>
    );
};

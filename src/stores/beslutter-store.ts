import { useState } from 'react';
import createUseContext from 'constate';

export const useBeslutterStore = createUseContext(() => {
	const [beslutterProsessStartet, setBeslutterProsessStartet] = useState(false);
	const [harBeslutter, setHarBeslutter] = useState(false);
	const [godkjentAvBeslutter, setGodkjentAvBeslutter] = useState(false);
	const [visSendEndringer, setVisSendEndringer] = useState(false);

	return {
		beslutterProsessStartet, setBeslutterProsessStartet,
		harBeslutter, setHarBeslutter,
		godkjentAvBeslutter, setGodkjentAvBeslutter,
		visSendEndringer, setVisSendEndringer
	};
});

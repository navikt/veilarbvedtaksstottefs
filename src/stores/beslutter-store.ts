import { useState } from 'react';
import createUseContext from 'constate';

export const useBeslutterStore = createUseContext(() => {
	const [beslutterProsessStartet, setBeslutterProsessStartet] = useState(false);
	const [godkjentAvBeslutter, setGodkjentAvBeslutter] = useState(false);

	return {
		beslutterProsessStartet, setBeslutterProsessStartet,
		godkjentAvBeslutter, setGodkjentAvBeslutter,
	};
});

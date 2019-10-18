import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

interface BeslutterProps {
	beslutterNavn: string;
}

export function Beslutter({ beslutterNavn }: BeslutterProps) {
	return (
		<div style={{ display: 'flex' }}>
			<Undertekst className="label">Beslutter: </Undertekst>
			<Undertekst>
				{beslutterNavn}
			</Undertekst>
		</div>
	);
}

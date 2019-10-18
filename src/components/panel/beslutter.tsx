import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

interface BeslutterProps {
	beslutter: string;
}

export function Beslutter({ beslutter }: BeslutterProps) {
	return (
		<div style={{ display: 'flex' }}>
			<Undertekst className="label">Beslutter: </Undertekst>
			<Undertekst>
				{beslutter}
			</Undertekst>
		</div>
	);
}

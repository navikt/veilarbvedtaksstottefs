import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

interface BeslutterProps {
	beslutterNavn: string;
	className?: string;
}

export function Beslutter({ beslutterNavn, className }: BeslutterProps) {
	return (
		<div className={className} style={{ display: 'flex' }}>
			<Undertekst className="label">Beslutter: </Undertekst>
			<Undertekst>{beslutterNavn}</Undertekst>
		</div>
	);
}

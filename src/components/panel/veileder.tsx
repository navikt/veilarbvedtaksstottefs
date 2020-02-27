import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';
import { fiksVeilederNavn } from '../../utils';

interface VeilederProps {
	enhetId: string;
	enhetNavn: string;
	veilederNavn: string;
	text: string;
	className?: string;
}

export function Veileder({ enhetId, enhetNavn, veilederNavn, text, className }: VeilederProps) {
	return (
		<div className={className} style={{ display: 'flex' }}>
			<Undertekst className="label">{text}: </Undertekst>
			<Undertekst>
				{fiksVeilederNavn(veilederNavn)}, {enhetId} {enhetNavn}
			</Undertekst>
		</div>
	);
}

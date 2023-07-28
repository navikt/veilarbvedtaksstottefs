import { Undertekst } from 'nav-frontend-typografi';

interface VeilederProps {
	veilederNavn: string;
	text: string;
	className?: string;
}

export function Veileder({ veilederNavn, text, className }: VeilederProps) {
	return (
		<div className={className} style={{ display: 'flex' }}>
			<Undertekst className="label">{text}: </Undertekst>
			<Undertekst>{veilederNavn}</Undertekst>
		</div>
	);
}

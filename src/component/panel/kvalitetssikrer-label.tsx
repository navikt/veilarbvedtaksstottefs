import { Undertekst } from 'nav-frontend-typografi';

interface BeslutterProps {
	beslutterNavn: string;
	className?: string;
}

export function KvalitetssikrerLabel({ beslutterNavn, className }: BeslutterProps) {
	return (
		<div className={className} style={{ display: 'flex' }}>
			<Undertekst className="label">Kvalitetssikrer: </Undertekst>
			<Undertekst>{beslutterNavn}</Undertekst>
		</div>
	);
}

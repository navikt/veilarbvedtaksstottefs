import { useState } from 'react';
import { Button, Textarea } from '@navikt/ds-react';
import './rediger-kilde.css';
import { Kilde } from '../../../../../api/veilarbvedtaksstotte';

interface RedigerKildeProps {
	kilde: Kilde | null;
	negativeBtn: 'CANCEL' | 'DELETE';
	onTekstSubmit: (kilde: Kilde) => void;
	onTekstDeleteOrCancel: () => void;
}

const KILDE_MAX_LENGTH = 150;

export function RedigerKilde({
	kilde,
	negativeBtn,
	onTekstSubmit,
	onTekstDeleteOrCancel
}: Readonly<RedigerKildeProps>) {
	const [tekst, setTekst] = useState(kilde ? kilde.tekst : '');

	return (
		<div className="rediger-kilde">
			<Textarea
				size="small"
				label="Legg til kilde og dato"
				value={tekst}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					let nyKildetekst = e.target.value;
					if (nyKildetekst.length > KILDE_MAX_LENGTH) {
						nyKildetekst = nyKildetekst.slice(0, KILDE_MAX_LENGTH);
					}
					setTekst(nyKildetekst);
				}}
				maxLength={KILDE_MAX_LENGTH}
				// eslint-disable-next-line jsx-a11y/no-autofocus
				autoFocus
			/>
			<div className="rediger-kilde__handlinger">
				<Button size="small" variant="secondary" onClick={onTekstDeleteOrCancel}>
					{negativeBtn === 'CANCEL' ? 'Avbryt' : 'Slett'}
				</Button>
				<Button
					size="small"
					onClick={() => onTekstSubmit({ kildeId: kilde?.kildeId ?? crypto.randomUUID(), tekst })}
				>
					Lagre
				</Button>
			</div>
		</div>
	);
}

import { useState } from 'react';
import { Button, Textarea } from '@navikt/ds-react';
import './rediger-kilde.css';

interface RedigerKildeProps {
	kildenavn: string;
	negativeBtn: 'CANCEL' | 'DELETE';
	onTekstSubmit: (kilde: string) => void;
	onTekstDeleteOrCancel: () => void;
}

const KILDE_MAX_LENGTH = 150;

export function RedigerKilde({
	kildenavn,
	negativeBtn,
	onTekstSubmit,
	onTekstDeleteOrCancel
}: Readonly<RedigerKildeProps>) {
	const [tekst, setTekst] = useState(kildenavn);

	return (
		<div className="rediger-kilde">
			<Textarea
				size="small"
				label="Legg til kilde og dato"
				value={tekst}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					let nyKilde = e.target.value;
					if (nyKilde.length > KILDE_MAX_LENGTH) {
						nyKilde = nyKilde.substr(0, KILDE_MAX_LENGTH);
					}
					setTekst(nyKilde);
				}}
				maxLength={KILDE_MAX_LENGTH}
				// eslint-disable-next-line jsx-a11y/no-autofocus
				autoFocus
			/>
			<div className="rediger-kilde__handlinger">
				<Button size="small" variant="secondary" onClick={onTekstDeleteOrCancel}>
					{negativeBtn === 'CANCEL' ? 'Avbryt' : 'Slett'}
				</Button>
				<Button size="small" onClick={() => onTekstSubmit(tekst)}>
					Lagre
				</Button>
			</div>
		</div>
	);
}

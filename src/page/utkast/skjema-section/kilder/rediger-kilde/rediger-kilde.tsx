import { useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Kilde } from '../kilder';
import { Button } from '@navikt/ds-react';
import './rediger-kilde.less';

interface RedigerKildeProps {
	kilde: Kilde;
	negativeBtn: 'CANCEL' | 'DELETE';
	onTekstSubmit: (kilde: Kilde) => void;
	onTekstDeleteOrCancel: () => void;
}

const KILDE_MAX_LENGTH = 150;

export function RedigerKilde(props: RedigerKildeProps) {
	const { kilde, negativeBtn, onTekstSubmit, onTekstDeleteOrCancel } = props;
	const [tekst, setTekst] = useState(kilde.navn);

	function onSubmit() {
		onTekstSubmit({ navn: tekst, erValgt: true });
	}

	return (
		<div className="rediger-kilde">
			<Textarea
				label=""
				value={tekst}
				placeholder="Legg til kilde og dato"
				maxLength={KILDE_MAX_LENGTH}
				onChange={(e: any) => {
					let nyKilde = e.target.value;
					if (nyKilde.length > KILDE_MAX_LENGTH) {
						nyKilde = nyKilde.substr(0, KILDE_MAX_LENGTH);
					}
					setTekst(nyKilde);
				}}
				autoFocus={true}
			/>
			<div className="rediger-kilde__aksjoner">
				<Button size="small" onClick={onSubmit}>
					Lagre
				</Button>
				<Button size="small" variant="secondary" onClick={onTekstDeleteOrCancel}>
					{negativeBtn === 'CANCEL' ? 'Avbryt' : 'Slett'}
				</Button>
			</div>
		</div>
	);
}

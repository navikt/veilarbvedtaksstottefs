import React, { useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Opplysning } from '../opplysninger';
import './rediger-opplysning.less';

interface OpplysningProps {
	opplysning: Opplysning;
	negativeBtn: 'CANCEL' | 'DELETE';
	onTekstSubmit: (opplysning: Opplysning) => void;
	onTekstDeleteOrCancel: () => void;
}

const OPPLYSNING_MAX_LENGTH = 150;

export function RedigerOpplysning(props: OpplysningProps) {
	const { opplysning, negativeBtn, onTekstSubmit, onTekstDeleteOrCancel } = props;
	const [tekst, setTekst] = useState(opplysning.navn);

	function onSubmit() {
		onTekstSubmit({ navn: tekst, erValgt: true });
	}

	return (
		<div className="rediger">
			<Textarea
				label=""
				value={tekst}
				maxLength={OPPLYSNING_MAX_LENGTH}
				onChange={(e: any) => {
					let nyOpplysning = e.target.value;
					if (nyOpplysning.length > OPPLYSNING_MAX_LENGTH) {
						nyOpplysning = nyOpplysning.substr(0, OPPLYSNING_MAX_LENGTH);
					}
					setTekst(nyOpplysning);
				}}
				autoFocus={true}
			/>
			<div className="rediger__aksjoner">
				<Hovedknapp mini={true} htmlType="button" onClick={onSubmit}>
					Lagre
				</Hovedknapp>
				<Knapp mini={true} htmlType="button" onClick={onTekstDeleteOrCancel}>
					{negativeBtn === 'CANCEL' ? 'Avbryt' : 'Slett'}
				</Knapp>
			</div>
		</div>
	);
}

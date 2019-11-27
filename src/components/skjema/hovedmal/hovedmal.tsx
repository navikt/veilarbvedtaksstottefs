import React from 'react';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { OrNothing } from '../../../utils/types/ornothing';
import { InnsatsgruppeType } from '../innsatsgruppe/innsatsgruppe';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { EMDASH, swallowEnterKeyPress } from '../../../utils';
import './hovedmal.less';
import { lagSkjemaElementFeil } from '../skjema-utils';

export enum HovedmalType {
	SKAFFE_ARBEID = 'SKAFFE_ARBEID',
	BEHOLDE_ARBEID = 'BEHOLDE_ARBEID'
}

export const getHovedmalNavn = (hovedmal: OrNothing<HovedmalType>) => {
	const hovedmalobjekt = hovedmalliste.find(h => h.value === hovedmal);
	return (hovedmalobjekt && hovedmalobjekt.label) || EMDASH;
};

const hovedmalliste = [
	{
		label: 'Skaffe arbeid',
		value: HovedmalType.SKAFFE_ARBEID
	},
	{
		label: 'Beholde arbeid',
		value: HovedmalType.BEHOLDE_ARBEID
	}
];

function Hovedmal() {
	const {innsatsgruppe, hovedmal, setHovedmal, errors} = useSkjemaStore();
	const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;
	return (
		<SkjemaBolk id="hovedmal-scroll-to" tittel="Hovedmål" tittelId="hovedmal-tittel">
			<SkjemaGruppe feil={lagSkjemaElementFeil(errors.hovedmal)}>
				{erVarigTilpassetInnsats ? (
					<AlertStripeInfo className="hovedmal-info">
						<span className="hovedmal-info__tekst">
							Hovedmål kan ikke velges ved varig tilpasset innsats (varig nedsatt arbeidsevne)
						</span>
					</AlertStripeInfo>
				) : (
					<HovedmalRadioButtons handleHovedmalChanged={setHovedmal} hovedmal={hovedmal}/>
				)}
			</SkjemaGruppe>
		</SkjemaBolk>
	);
}

export default Hovedmal;

interface HovedmalRadioButtonsProps {
	handleHovedmalChanged: (e: any) => void;
	hovedmal: OrNothing<HovedmalType>;
}

function HovedmalRadioButtons(props: HovedmalRadioButtonsProps) {
	return (
		<div className="hovedmal">
			{hovedmalliste.map((mal, idx) => (
				<RadioPanel
					name="hovedmal"
					key={idx}
					label={mal.label}
					value={mal.value}
					onChange={(e: any) => props.handleHovedmalChanged(e.target.value)}
					checked={props.hovedmal === mal.value}
					inputProps={{onKeyPress: swallowEnterKeyPress}}
				/>
			))}
		</div>
	);
}

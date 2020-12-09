import React from 'react';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { OrNothing } from '../../../../utils/types/ornothing';
import { useSkjemaStore } from '../../../../stores/skjema-store';
import { lagSkjemaelementFeilmelding, swallowEnterKeyPress } from '../../../../utils';
import { HovedmalType, InnsatsgruppeType } from '../../../../rest/data/vedtak';
import { alleHovedmal } from '../../../../utils/hovedmal';
import FeltHeader from '../felt-header/felt-header';
import './hovedmal.less';

function Hovedmal() {
	const { innsatsgruppe, hovedmal, setHovedmal, errors } = useSkjemaStore();
	const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;

	return (
		<div className="hovedmal-bolk" id="hovedmal-scroll-to">
			<FeltHeader tittel="Hovedmål" tittelId="hovedmal-tittel" />
			<SkjemaGruppe feil={lagSkjemaelementFeilmelding(errors.hovedmal)}>
				{erVarigTilpassetInnsats ? (
					<span className="hovedmal__empty-tekst">
						Settes ikke for brukere med liten mulighet til å jobbe
					</span>
				) : (
					<HovedmalRadioButtons handleHovedmalChanged={setHovedmal} hovedmal={hovedmal} />
				)}
			</SkjemaGruppe>
		</div>
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
			{alleHovedmal.map((mal, idx) => (
				<Radio
					name="hovedmal"
					key={idx}
					label={mal.label}
					value={mal.value}
					onChange={(e: any) => props.handleHovedmalChanged(e.target.value)}
					checked={props.hovedmal === mal.value}
					onKeyPress={swallowEnterKeyPress}
				/>
			))}
		</div>
	);
}

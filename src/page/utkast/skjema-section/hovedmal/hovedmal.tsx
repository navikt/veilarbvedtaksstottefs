import React from 'react';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import FeltHeader from '../felt-header/felt-header';
import './hovedmal.less';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { HovedmalType, InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { lagSkjemaelementFeilmelding, swallowEnterKeyPress } from '../../../../util';
import { OrNothing } from '../../../../util/type/ornothing';
import { alleHovedmal } from '../../../../util/hovedmal';

function Hovedmal() {
	const { innsatsgruppe, hovedmal, setHovedmal, errors } = useSkjemaStore();
	const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;

	return (
		<div className="hovedmal-felt" id="hovedmal-scroll-to">
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

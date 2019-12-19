import React from 'react';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { OrNothing } from '../../../utils/types/ornothing';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { swallowEnterKeyPress } from '../../../utils';
import { lagSkjemaElementFeil } from '../skjema-utils';
import { HovedmalType, InnsatsgruppeType } from '../../../rest/data/vedtak';
import { alleHovedmal } from '../../../utils/hovedmal';
import './hovedmal.less';

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
			{alleHovedmal.map((mal, idx) => (
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

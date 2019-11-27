import React from 'react';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { OrNothing } from '../../../utils/types/ornothing';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { lagSkjemaElementFeil, trengerBeslutter } from '../skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import './innsatsgruppe.less';
import { swallowEnterKeyPress } from '../../../utils';

export enum InnsatsgruppeType {
	STANDARD_INNSATS = 'STANDARD_INNSATS',
	SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
	SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
	GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
	VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS'
}

export const getInnsatsgruppeNavn = (innsatsgruppeType: OrNothing<InnsatsgruppeType>) => {
	const innsatsgruppe = innsatsgrupper.find(elem => elem.value === innsatsgruppeType);
	return innsatsgruppe && innsatsgruppe.label;
};

export const innsatsgrupper = [
	{
		label: 'Standard innsats (Gode muligheter)',
		value: InnsatsgruppeType.STANDARD_INNSATS
	},
	{
		label: 'Situasjonsbestemt innsats (Trenger veiledning)',
		value: InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS
	},
	{
		label: 'Spesielt tilpasset innsats (Nedsatt arbeidsevne)',
		value: InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS
	},
	{
		label: 'Delvis varig tilpasset innsats (Delvis varig nedsatt arbeidsevne)',
		value: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS
	},

	{
		label: 'Varig tilpasset innsats (Varig nedsatt arbeidsevne)',
		value: InnsatsgruppeType.VARIG_TILPASSET_INNSATS
	}
];

function Innsatsgruppe() {
	const {innsatsgruppe, setInnsatsgruppe, setHovedmal, errors} = useSkjemaStore();
	const trengerVedtakBeslutter = trengerBeslutter(innsatsgruppe);
	return (
		<SkjemaBolk id="innsatsgruppe-scroll-to" tittel="Innsatsgruppe" tittelId="innsatsgruppe-tittel">
			{trengerVedtakBeslutter && (
				<AlertStripeAdvarsel className="innsatsgruppe-advarsel">
					<span className="innsatsgruppe-advarsel__tekst">
						Ved <i>delvis varig tilpasset innsats</i> og <i>varig tilpasset innsats</i> må
						arbeidsevnevurderingen godkjennes av beslutter etter gjeldende rutine.
					</span>
				</AlertStripeAdvarsel>
			)}
			<SkjemaGruppe feil={lagSkjemaElementFeil(errors.innsatsgruppe)}>
				<InnsatsgruppeRadioButtons
					handleInnsatsgruppeChanged={setInnsatsgruppe}
					innsatsgruppe={innsatsgruppe}
					setHovedmal={setHovedmal}
				/>
			</SkjemaGruppe>
		</SkjemaBolk>
	);
}

export default Innsatsgruppe;

interface InnsatsgruppeRadioProps {
	handleInnsatsgruppeChanged: (e: any) => void;
	setHovedmal: (e: any) => void;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
}

function InnsatsgruppeRadioButtons(props: InnsatsgruppeRadioProps) {
	return (
		<div className="innsatsgruppe" aria-labelledby="innsatsgruppe-tittel">
			{innsatsgrupper.map((innsatsgruppeObject, index) => (
				<RadioPanel
					name="innsatsgruppe"
					key={index}
					label={innsatsgruppeObject.label}
					value={innsatsgruppeObject.value}
					checked={props.innsatsgruppe === innsatsgruppeObject.value}
					inputProps={{onKeyPress: swallowEnterKeyPress}}
					onChange={(e: any) => {
						const innsatsgruppe = e.target.value;
						props.handleInnsatsgruppeChanged(innsatsgruppe);
						if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
							props.setHovedmal(null);
						}
					}}
				/>
			))}
		</div>
	);
}

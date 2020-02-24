import React from 'react';
import cls from 'classnames';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { lagSkjemaElementFeil, trengerBeslutter } from '../skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { swallowEnterKeyPress } from '../../../utils';
import './innsatsgruppe.less';
import { InnsatsgruppeTekst, innsatsgruppeTekster } from '../../../utils/innsatsgruppe';
import { InnsatsgruppeType } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import { Element, Normaltekst } from 'nav-frontend-typografi';

function Innsatsgruppe() {
	const {innsatsgruppe, setInnsatsgruppe, setHovedmal, errors, isReadOnly} = useSkjemaStore();
	const trengerVedtakBeslutter = trengerBeslutter(innsatsgruppe);
	return (
		<SkjemaBolk id="innsatsgruppe-scroll-to" tittel="Innsatsgruppe" tittelId="innsatsgruppe-tittel">
			{trengerVedtakBeslutter && (
				<AlertStripeInfo className="innsatsgruppe-info">
					Vurderingen skal sendes til beslutter når du vurderer at brukeren enten har liten mulighettil å jobbe eller har mulighet til å jobbe delvis.
					Når du går videre får du sendt til beslutter.
				</AlertStripeInfo>
			)}
			<SkjemaGruppe feil={lagSkjemaElementFeil(errors.innsatsgruppe)}>
				<InnsatsgruppeRadioButtons
					handleInnsatsgruppeChanged={setInnsatsgruppe}
					innsatsgruppe={innsatsgruppe}
					setHovedmal={setHovedmal}
					disabled={isReadOnly}
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
	disabled: boolean
}

function InnsatsgruppeRadioButtons(props: InnsatsgruppeRadioProps) {
	return (
		<div className="innsatsgruppe">
			{innsatsgruppeTekster.map(innsatsgruppeTekst => (
					<RadioPanel
						name="innsatsgruppe"
						label={(
							<InnatsgruppeVisning
								erValgt={props.innsatsgruppe === innsatsgruppeTekst.value}
								innsatsgruppeTekst={innsatsgruppeTekst}
							/>
						)}
						key={innsatsgruppeTekst.value}
						value={innsatsgruppeTekst.value}
						checked={props.innsatsgruppe === innsatsgruppeTekst.value}
						inputProps={{onKeyPress: swallowEnterKeyPress, 'aria-labelledby': 'innsatsgruppe-tittel'}}
						disabled={props.disabled}
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

function InnatsgruppeVisning({innsatsgruppeTekst, erValgt}: {erValgt: boolean, innsatsgruppeTekst: InnsatsgruppeTekst}) {
	return (
		<div className="innsatsgruppe-label">
			<Element>{innsatsgruppeTekst.tittel}</Element>
			<Normaltekst
				className={
					cls('innsatsgruppe-label__undertekst', { 'innsatsgruppe-label__undertekst--valgt': erValgt})
				}
			>
				{innsatsgruppeTekst.undertekst}
			</Normaltekst>
		</div>
	);
}

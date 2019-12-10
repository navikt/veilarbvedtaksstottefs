import React from 'react';
import cls from 'classnames';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
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

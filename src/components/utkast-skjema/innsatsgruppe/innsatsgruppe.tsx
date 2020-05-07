import React from 'react';
import cls from 'classnames';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import {
	lagSkjemaElementFeil,
	trengerBeslutter, harSkrevetBegrunnelse
} from '../skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { erBeslutterProsessStartet, finnGjeldendeVedtak, finnUtkastAlltid, swallowEnterKeyPress } from '../../../utils';
import './innsatsgruppe.less';
import {
	erStandard, erVarigEllerGradertVarig,
	InnsatsgruppeTekst,
	innsatsgruppeTekster
} from '../../../utils/innsatsgruppe';
import { InnsatsgruppeType } from '../../../rest/data/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Show from '../../show';
import { useTilgangStore } from '../../../stores/tilgang-store';
import { useDataStore } from '../../../stores/data-store';
import { erAnsvarligVeileder } from '../../../utils/tilgang';

function Innsatsgruppe() {
	const {innsatsgruppe, begrunnelse, setInnsatsgruppe, setHovedmal, errors} = useSkjemaStore();
	const {kanEndreUtkast, veilederTilgang} = useTilgangStore();
	const {vedtak} = useDataStore();

	const erStandardInnsatsValgt = erStandard(innsatsgruppe);
	const gjeldendeVedtak = finnGjeldendeVedtak(vedtak);
	const utkast = finnUtkastAlltid(vedtak);
	const erGjeldendeInnsatsVarig = gjeldendeVedtak && erVarigEllerGradertVarig(gjeldendeVedtak.innsatsgruppe);
	const visInfomelding = trengerBeslutter(innsatsgruppe)
		&& erAnsvarligVeileder(veilederTilgang)
		&& !erBeslutterProsessStartet(utkast.beslutterProsessStatus);

	return (
		<SkjemaBolk id="innsatsgruppe-scroll-to" tittel="Innsatsgruppe" tittelId="innsatsgruppe-tittel">
			<Show if={visInfomelding}>
				<AlertStripeInfo className="innsatsgruppe__alertstripe">
					Vurderingen skal kvalitetssikres av en beslutter når bruker anses å ha liten eller delvis mulighet til å jobbe.
				</AlertStripeInfo>
			</Show>
			<Show if={!harSkrevetBegrunnelse(begrunnelse) && erStandardInnsatsValgt && erGjeldendeInnsatsVarig}>
				<AlertStripe form="inline" type="advarsel" className="innsatsgruppe__alertstripe">
					Begrunnelse må i dette tilfellet også fylles ut for standard innsats.
					Dette er fordi gjeldende vedtak viser varig eller delvis varig tilpasset innsats.
					Når det gjøres en ny vurdering er det viktig å fremheve hva som er årsaken til endring i brukers situasjon.
				</AlertStripe>
			</Show>
			<SkjemaGruppe feil={lagSkjemaElementFeil(errors.innsatsgruppe)}>
				<InnsatsgruppeRadioButtons
					handleInnsatsgruppeChanged={setInnsatsgruppe}
					innsatsgruppe={innsatsgruppe}
					setHovedmal={setHovedmal}
					disabled={!kanEndreUtkast}
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
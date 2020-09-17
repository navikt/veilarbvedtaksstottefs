import React from 'react';
import cls from 'classnames';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { harSkrevetBegrunnelse, lagSkjemaElementFeil, trengerBeslutter } from '../../../../utils/skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../../stores/skjema-store';
import { erBeslutterProsessStartet, finnGjeldendeVedtak, swallowEnterKeyPress } from '../../../../utils';
import './innsatsgruppe.less';
import { useDataStore } from '../../../../stores/data-store';
import {
	erStandard,
	erVarigEllerGradertVarig,
	InnsatsgruppeTekst,
	innsatsgruppeTekster
} from '../../../../utils/innsatsgruppe';
import Show from '../../../../components/show';
import { OrNothing } from '../../../../utils/types/ornothing';
import { InnsatsgruppeType } from '../../../../rest/data/vedtak';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { ModalType, useModalStore } from '../../../../stores/modal-store';

function Innsatsgruppe() {
	const {innsatsgruppe, begrunnelse, setInnsatsgruppe, beslutterProsessStatus, setHovedmal, errors} = useSkjemaStore();
	const {fattedeVedtak, utkast} = useDataStore();

	const erStandardInnsatsValgt = erStandard(innsatsgruppe);
	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);
	const erGjeldendeInnsatsVarig = gjeldendeVedtak && erVarigEllerGradertVarig(gjeldendeVedtak.innsatsgruppe);
	const visInfomelding = trengerBeslutter(innsatsgruppe) && !erBeslutterProsessStartet(beslutterProsessStatus);

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
				/>
			</SkjemaGruppe>
		</SkjemaBolk>
	);
}

export default Innsatsgruppe;

interface InnsatsgruppeRadioProps {
	handleInnsatsgruppeChanged: (e: InnsatsgruppeType) => void;
	setHovedmal: (e: any) => void;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
}

function InnsatsgruppeRadioButtons(props: InnsatsgruppeRadioProps) {
	const {beslutterProsessStatus} = useSkjemaStore();
	const {showModal} = useModalStore();

	function handleInnsatsgruppeChanged(innsatsgruppe: InnsatsgruppeType) {
		if (erBeslutterProsessStartet(beslutterProsessStatus) && !trengerBeslutter(innsatsgruppe)) {
			showModal(ModalType.AVBRYT_BESLUTTER_PROSESS, {Innsatsgruppe: innsatsgruppe});
		} else {
			props.handleInnsatsgruppeChanged(innsatsgruppe);
		}
	}

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
							handleInnsatsgruppeChanged(innsatsgruppe);
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

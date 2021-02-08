import React from 'react';
import { Radio, RadioGruppe, SkjemaGruppe } from 'nav-frontend-skjema';
import AlertStripe from 'nav-frontend-alertstriper';
import FeltHeader from '../felt-header/felt-header';
import { InnsatsgruppeTipsInnhold } from './innsatsgruppe-tips-innhold';
import { harSkrevetBegrunnelse, trengerKvalitetssikrer } from '../../../../util/skjema-utils';
import Show from '../../../../component/show';
import {
	erBeslutterProsessStartet,
	finnGjeldendeVedtak,
	lagSkjemaelementFeilmelding,
	swallowEnterKeyPress
} from '../../../../util';
import { InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { OrNothing } from '../../../../util/type/ornothing';
import { ModalType, useModalStore } from '../../../../store/modal-store';
import { useDataStore } from '../../../../store/data-store';
import { erStandard, erVarigEllerGradertVarig, innsatsgruppeTekster } from '../../../../util/innsatsgruppe';
import { useSkjemaStore } from '../../../../store/skjema-store';
import './innsatsgruppe.less';
import { useDialogSection } from '../../../../store/dialog-section-store';

function Innsatsgruppe() {
	const { innsatsgruppe, begrunnelse, setInnsatsgruppe, setHovedmal, errors } = useSkjemaStore();
	const { fattedeVedtak } = useDataStore();

	const erStandardInnsatsValgt = erStandard(innsatsgruppe);
	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);
	const erGjeldendeInnsatsVarig = gjeldendeVedtak && erVarigEllerGradertVarig(gjeldendeVedtak.innsatsgruppe);

	return (
		<div className="innsatsgruppe-felt" id="innsatsgruppe-scroll-to">
			<FeltHeader
				tittel="Innsatsgruppe"
				tittelId="innsatsgruppe-tittel"
				tipsId="innsatsgruppe-tips"
				tipsInnhold={<InnsatsgruppeTipsInnhold />}
				tipsAriaLabel="Tips for innsatsgruppe"
			/>
			<Show if={!harSkrevetBegrunnelse(begrunnelse) && erStandardInnsatsValgt && erGjeldendeInnsatsVarig}>
				<AlertStripe form="inline" type="advarsel" className="innsatsgruppe__alertstripe">
					Begrunnelse må i dette tilfellet også fylles ut for standard innsats. Dette er fordi gjeldende
					vedtak viser varig eller delvis varig tilpasset innsats. Når det gjøres en ny vurdering er det
					viktig å fremheve hva som er årsaken til endring i brukers situasjon.
				</AlertStripe>
			</Show>
			<SkjemaGruppe feil={lagSkjemaelementFeilmelding(errors.innsatsgruppe)}>
				<InnsatsgruppeRadioButtons
					handleInnsatsgruppeChanged={setInnsatsgruppe}
					innsatsgruppe={innsatsgruppe}
					setHovedmal={setHovedmal}
				/>
			</SkjemaGruppe>
		</div>
	);
}

export default Innsatsgruppe;

interface InnsatsgruppeRadioProps {
	handleInnsatsgruppeChanged: (e: InnsatsgruppeType) => void;
	setHovedmal: (e: any) => void;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
}

function InnsatsgruppeRadioButtons(props: InnsatsgruppeRadioProps) {
	const { setShowSection } = useDialogSection();
	const { showModal } = useModalStore();
	const { utkast } = useDataStore();

	function handleInnsatsgruppeChanged(innsatsgruppe: InnsatsgruppeType) {
		if (
			erBeslutterProsessStartet(utkast && utkast.beslutterProsessStatus) &&
			!trengerKvalitetssikrer(innsatsgruppe)
		) {
			showModal(ModalType.BEKREFT_AVBRYT_BESLUTTER_PROSESS, { innsatsgruppe });
		} else {
			props.handleInnsatsgruppeChanged(innsatsgruppe);
		}

		if (trengerKvalitetssikrer(innsatsgruppe)) {
			setShowSection(true);
		}

		if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
			props.setHovedmal(null);
		}
	}

	return (
		<div className="innsatsgruppe">
			<RadioGruppe legend={null}>
				{innsatsgruppeTekster.map(innsatsgruppeTekst => (
					<Radio
						key={innsatsgruppeTekst.value}
						label={innsatsgruppeTekst.tittel}
						name="innsatsgruppe"
						value={innsatsgruppeTekst.value}
						onKeyPress={swallowEnterKeyPress}
						checked={props.innsatsgruppe === innsatsgruppeTekst.value}
						onChange={(e: any) => handleInnsatsgruppeChanged(e.target.value)}
					/>
				))}
			</RadioGruppe>
		</div>
	);
}

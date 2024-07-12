import FeltHeader from '../felt-header/felt-header';
import { InnsatsgruppeTipsInnhold } from './innsatsgruppe-tips-innhold';
import { harSkrevetBegrunnelse, trengerKvalitetssikrer } from '../../../../util/skjema-utils';
import { erBeslutterProsessStartet, finnGjeldendeVedtak, swallowEnterKeyPress } from '../../../../util';
import { InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { OrNothing } from '../../../../util/type/ornothing';
import { ModalType, useModalStore } from '../../../../store/modal-store';
import { useDataStore } from '../../../../store/data-store';
import { erStandard, erVarigEllerGradertVarig, innsatsgruppeTekster } from '../../../../util/innsatsgruppe';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { useDialogSection } from '../../../../store/dialog-section-store';
import { Alert, Radio, RadioGroup } from '@navikt/ds-react';
import './innsatsgruppe.css';

function Innsatsgruppe() {
	const { innsatsgruppe, begrunnelse, setInnsatsgruppe, setHovedmal } = useSkjemaStore();
	const { fattedeVedtak } = useDataStore();

	const erStandardInnsatsValgt = erStandard(innsatsgruppe);
	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);
	const erGjeldendeInnsatsVarig = gjeldendeVedtak && erVarigEllerGradertVarig(gjeldendeVedtak.innsatsgruppe);

	return (
		<div className="innsatsgruppe-felt" id="innsatsgruppe-scroll-to">
			<FeltHeader
				id="innsatsgruppe-tittel"
				tittel="Innsatsgruppe"
				tipsId="innsatsgruppe-tips"
				tipsInnhold={<InnsatsgruppeTipsInnhold />}
				tipsAriaLabel="Tips for innsatsgruppe"
			/>
			{!harSkrevetBegrunnelse(begrunnelse) && erStandardInnsatsValgt && erGjeldendeInnsatsVarig && (
				<Alert size="small" variant="warning" inline className="innsatsgruppe__alertstripe">
					Begrunnelse må i dette tilfellet også fylles ut for standard innsats. Dette er fordi gjeldende
					vedtak viser varig eller delvis varig tilpasset innsats. Når det gjøres en ny vurdering er det
					viktig å fremheve hva som er årsaken til endring i brukers situasjon.
				</Alert>
			)}
			<InnsatsgruppeRadioButtons
				innsatsgruppe={innsatsgruppe}
				endreInnsatsgruppe={setInnsatsgruppe}
				endreHovedmal={setHovedmal}
			/>
		</div>
	);
}

export default Innsatsgruppe;

interface InnsatsgruppeRadioProps {
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	endreInnsatsgruppe: (e: InnsatsgruppeType) => void;
	endreHovedmal: (e: any) => void;
}

function InnsatsgruppeRadioButtons(props: InnsatsgruppeRadioProps) {
	const { setShowSection } = useDialogSection();
	const { showModal } = useModalStore();
	const { utkast } = useDataStore();
	const { errors } = useSkjemaStore();

	function handleInnsatsgruppeChanged(innsatsgruppe: InnsatsgruppeType) {
		if (
			erBeslutterProsessStartet(utkast && utkast.beslutterProsessStatus) &&
			!trengerKvalitetssikrer(innsatsgruppe)
		) {
			showModal(ModalType.BEKREFT_AVBRYT_BESLUTTER_PROSESS, { innsatsgruppe });
		} else {
			props.endreInnsatsgruppe(innsatsgruppe);
		}

		if (trengerKvalitetssikrer(innsatsgruppe)) {
			setShowSection(true);
		}

		if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
			props.endreHovedmal(null);
		}
	}

	return (
		<RadioGroup
			size="small"
			legend="Valg av innsatsgruppe"
			hideLegend
			onChange={nyInnsatsgruppe => handleInnsatsgruppeChanged(nyInnsatsgruppe)}
			value={props.innsatsgruppe}
			error={errors.innsatsgruppe}
		>
			{innsatsgruppeTekster.map(innsatsgruppetekst => (
				<Radio key={innsatsgruppetekst.value} value={innsatsgruppetekst.value} onKeyDown={swallowEnterKeyPress}>
					{innsatsgruppetekst.tittel}
				</Radio>
			))}
		</RadioGroup>
	);
}

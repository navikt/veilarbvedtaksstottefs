import FeltHeader from '../felt-header/felt-header';
import { InnsatsgruppeTipsInnhold } from './innsatsgruppe-tips-innhold';
import { harSkrevetBegrunnelse, trengerKvalitetssikrer } from '../../../../util/skjema-utils';
import { erBeslutterProsessStartet, finnGjeldendeVedtak, swallowEnterKeyPress } from '../../../../util';
import { HovedmalType, InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { OrNothing } from '../../../../util/type/ornothing';
import { ModalType, useModalStore } from '../../../../store/modal-store';
import { useDataStore } from '../../../../store/data-store';
import { erStandard, erVarigEllerGradertVarig, innsatsgruppeTekst } from '../../../../util/innsatsgruppe';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { useDialogSection } from '../../../../store/dialog-section-store';
import { Alert, Link, Radio, RadioGroup } from '@navikt/ds-react';
import './innsatsgruppe.css';

function Innsatsgruppe() {
	const { innsatsgruppe, begrunnelse, setInnsatsgruppe, setHovedmal } = useSkjemaStore();
	const { fattedeVedtak } = useDataStore();

	const erStandardInnsatsValgt = erStandard(innsatsgruppe);
	const gjeldendeVedtak = finnGjeldendeVedtak(fattedeVedtak);
	const erGjeldendeInnsatsVarig = gjeldendeVedtak && erVarigEllerGradertVarig(gjeldendeVedtak.innsatsgruppe);

	return (
		<div className="innsatsgruppe-felt" id="innsatsgruppe__scroll-til-feil">
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
	endreHovedmal: (e: OrNothing<HovedmalType>) => void;
}

function InnsatsgruppeRadioButtons(props: InnsatsgruppeRadioProps) {
	const { setShowSection } = useDialogSection();
	const { showModal } = useModalStore();
	const { utkast } = useDataStore();
	const { errors } = useSkjemaStore();


	const AapVarsel = () => (
		<Alert variant="warning" size="small" className="paminnelse_i_innsatsgrupper">
			Hvis brukeren skal ha AAP etter § 11-18, må<br/> du huske å sende Gosys-oppgave til Nav<br/> arbeid og ytelser, se{' '}
			<Link
				href="https://navno.sharepoint.com/sites/fag-og-ytelser-regelverk-og-rutiner/SitePages/Arbeidsevnen%20avklart%20mot%20varig%20tilpasset%20innsats.aspx?web=1"
				target="_blank"
				rel="noopener noreferrer"
			>
				servicerutine på Navet
			</Link>
			.
		</Alert>
	);

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

			<Radio key={InnsatsgruppeType.STANDARD_INNSATS} value={InnsatsgruppeType.STANDARD_INNSATS} onKeyDown={swallowEnterKeyPress}>
				{innsatsgruppeTekst[InnsatsgruppeType.STANDARD_INNSATS]}
			</Radio>

			<Radio key={InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS} value={InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS} onKeyDown={swallowEnterKeyPress}>
				{innsatsgruppeTekst[InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS]}
			</Radio>

			<Radio key={InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS} value={InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS} onKeyDown={swallowEnterKeyPress}>
				{innsatsgruppeTekst[InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS]}
			</Radio>

			<Radio key={InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS} value={InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS} onKeyDown={swallowEnterKeyPress}>
				{innsatsgruppeTekst[InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS]}
			</Radio>
			{props.innsatsgruppe === InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS && AapVarsel()}

			<Radio key={InnsatsgruppeType.VARIG_TILPASSET_INNSATS} value={InnsatsgruppeType.VARIG_TILPASSET_INNSATS} onKeyDown={swallowEnterKeyPress}>
				{innsatsgruppeTekst[InnsatsgruppeType.VARIG_TILPASSET_INNSATS]}
			</Radio>
			{props.innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS && AapVarsel() }

		</RadioGroup>
	);
}

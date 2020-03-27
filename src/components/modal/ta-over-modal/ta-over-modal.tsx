import React, { useState } from 'react';
import { ModalProps } from '../modal-props';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { finnUtkast } from '../../../utils';
import { useAppStore } from '../../../stores/app-store';
import { useDataStore } from '../../../stores/data-store';
import Show from '../../show';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { fetchWithInfo } from '../../../rest/utils';
import { lagBliBeslutterFetchInfo, lagTaOverUtkastFetchInfo } from '../../../rest/api';
import { useTilgangStore } from '../../../stores/tilgang-store';
import { VeilederTilgang } from '../../../utils/tilgang';
import './ta-over-modal.less';

enum TaOverFor {
	VEILEDER = 'VEILEDER',
	BESLUTTER = 'BESLUTTER'
}

const taOverOptions = [
	{label: 'Veileder', value: TaOverFor.VEILEDER},
	{label: 'Beslutter', value: TaOverFor.BESLUTTER}
];

function mapTaOverForTilTekst(taOverFor: TaOverFor): string {
	switch (taOverFor) {
		case TaOverFor.BESLUTTER:
			return 'beslutter';
		case TaOverFor.VEILEDER:
			return 'veileder';
		default:
			return '';
	}
}

function TaOverModal(props: ModalProps) {
	const {fnr} = useAppStore();
	const {hideModal, showModal} = useModalStore();
	const {setVeilederTilgang} = useTilgangStore();
	const {vedtak, innloggetVeileder,
		   setUtkastBeslutter, setUtkastVeileder,
		   leggTilSystemMelding} = useDataStore();

	const [taOverFor, setTaOverFor] = useState<TaOverFor>();
	const [vedtakOvertatt, setVedtakOvertatt] = useState(false);
	const [laster, setLaster] = useState(false);

	const utkast = finnUtkast(vedtak);

	if (!utkast) {
		return null;
	}

	const visValg = utkast.beslutterProsessStartet && utkast.beslutterNavn != null;

	function handleTaOverVedtak() {
		const fetchInfo = taOverFor === TaOverFor.BESLUTTER
			? lagBliBeslutterFetchInfo({fnr})
			: lagTaOverUtkastFetchInfo({fnr});

		setLaster(true);

		fetchWithInfo(fetchInfo)
			.then(() => {
				const navn = innloggetVeileder.navn;
				const ident = innloggetVeileder.ident;
				const tattOverFor = taOverFor || TaOverFor.VEILEDER;
				const tilgang = tattOverFor === TaOverFor.VEILEDER
					? VeilederTilgang.ANSVARLIG_VEILEDER
					: VeilederTilgang.BESLUTTER;

				if (tilgang === VeilederTilgang.ANSVARLIG_VEILEDER) {
					setUtkastVeileder(ident, navn);
					leggTilSystemMelding(`${innloggetVeileder.navn} er ny ansvarlig veileder`);
				} else {
					setUtkastBeslutter(ident, navn);
					leggTilSystemMelding(`${innloggetVeileder.navn} er ny beslutter`);
				}

				setVeilederTilgang(tilgang);
				setVedtakOvertatt(true);
			})
			.catch(() => showModal(ModalType.FEIL_VED_OVERTAKELSE))
			.finally(() => setLaster(false));
	}

	function handleOnRequestCloseModal() {
		if (!laster) {
			hideModal();
		}
	}

	const OvertaForVeilederVisning = (
		<>
			<Normaltekst className="varsel-modal__tekstinnehold">
				Vil du overta ansvaret for vedtaket fra
				<br/>
				{`${utkast.veilederNavn}?`}
			</Normaltekst>
			<div className="varsel-modal__knapper">
				<Hovedknapp spinner={laster} disabled={laster} onClick={() => handleTaOverVedtak()}>Ta over for
					veileder</Hovedknapp>
				<Knapp disabled={laster} onClick={hideModal}>Avbryt</Knapp>
			</div>
		</>
	);

	const OvertaValgVisning = (
		<>
			<div className="ta-over-modal__radiopanel">
				<RadioPanelGruppe
					name="taovervedtakfor"
					legend="Hvem ønsker du å ta over for?"
					radios={taOverOptions}
					onChange={(e: any) => setTaOverFor(e.target.value)}
					checked={taOverFor}
				/>

				<Show if={taOverFor}>
					<div className="varsel-modal__knapper">
						<Hovedknapp
							mini={true}
							htmlType="submit"
							onClick={handleTaOverVedtak}
							spinner={laster}
							disabled={laster}
						>
							Ta over som {mapTaOverForTilTekst(taOverFor as TaOverFor)}
						</Hovedknapp>
					</div>
				</Show>
			</div>
		</>
	);

	const VedtakOvertattVisning = (
		<>
			<Normaltekst className="varsel-modal__tekstinnehold">
				Du har nå tatt over som {mapTaOverForTilTekst(taOverFor || TaOverFor.VEILEDER)}
			</Normaltekst>
			<Hovedknapp
				mini={true}
				htmlType="button"
				onClick={hideModal}
				className="varsel-modal__knapper"
			>
				Ok
			</Hovedknapp>
		</>
	);

	let Innhold;

	if (vedtakOvertatt) {
		Innhold = VedtakOvertattVisning;
	} else if (visValg) {
		Innhold = OvertaValgVisning;
	} else {
		Innhold = OvertaForVeilederVisning;
	}

	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Ta over utkast"
			onRequestClose={handleOnRequestCloseModal}
			varselIkonType={VarselIkonType.ADVARSEL}
			portalClassName="ta-over-modal"
		>
			{Innhold}
		</VarselModal>
	)
}

export default TaOverModal;

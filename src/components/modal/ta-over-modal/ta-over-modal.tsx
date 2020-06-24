import React, { useState } from 'react';
import { ModalProps } from '../modal-props';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { erBeslutterProsessStartet, hentId } from '../../../utils';
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
import { SystemMeldingType } from '../../../utils/types/melding-type';

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
	const {hideModal, showModal} = useModalStore();
	const {setVeilederTilgang} = useTilgangStore();
	const {utkast, innloggetVeileder, setUtkastBeslutter, setUtkastVeileder, leggTilSystemMelding} = useDataStore();

	const [taOverFor, setTaOverFor] = useState<TaOverFor>();
	const [vedtakOvertatt, setVedtakOvertatt] = useState(false);
	const [laster, setLaster] = useState(false);

	if (!utkast) {
		return null;
	}

	const visValg = erBeslutterProsessStartet(utkast.beslutterProsessStatus) && utkast.beslutterNavn != null;

	function handleTaOverVedtak() {
		const fetchInfo = taOverFor === TaOverFor.BESLUTTER
			? lagBliBeslutterFetchInfo({vedtakId: hentId(utkast)})
			: lagTaOverUtkastFetchInfo({vedtakId: hentId(utkast)});

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
					leggTilSystemMelding(SystemMeldingType.TATT_OVER_SOM_VEILEDER);
				} else {
					setUtkastBeslutter(ident, navn);
					leggTilSystemMelding(SystemMeldingType.TATT_OVER_SOM_BESLUTTER);
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
			varselIkonType={VarselIkonType.INGEN}
			portalClassName="ta-over-modal"
		>
			{Innhold}
		</VarselModal>
	)
}

export default TaOverModal;

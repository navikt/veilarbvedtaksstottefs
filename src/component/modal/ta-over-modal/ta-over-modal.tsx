import React, { useState } from 'react';
import { ModalProps } from '../modal-props';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { erBeslutterProsessStartet, hentId } from '../../../util';
import { useDataStore } from '../../../store/data-store';
import Show from '../../show';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { useTilgangStore } from '../../../store/tilgang-store';
import { VeilederTilgang } from '../../../util/tilgang';
import './ta-over-modal.less';
import { SystemMeldingType } from '../../../util/type/melding-type';
import { useVarselStore } from '../../../store/varsel-store';
import { VarselType } from '../../varsel/varsel-type';
import { bliBeslutter } from '../../../api/veilarbvedtaksstotte/beslutter';
import { fetchTaOverUtkast } from '../../../api/veilarbvedtaksstotte/utkast';

enum TaOverFor {
	VEILEDER = 'VEILEDER',
	KVALITETSSIKRER = 'KVALITETSSIKRER'
}

const taOverOptions = [
	{ label: 'Veileder', value: TaOverFor.VEILEDER },
	{ label: 'Kvalitetssikrer', value: TaOverFor.KVALITETSSIKRER }
];

function TaOverModal(props: ModalProps) {
	const { hideModal, showModal } = useModalStore();
	const { setVeilederTilgang } = useTilgangStore();
	const { utkast, innloggetVeileder, setUtkastBeslutter, setUtkastVeileder, leggTilSystemMelding } = useDataStore();
	const { showVarsel } = useVarselStore();

	const [taOverFor, setTaOverFor] = useState<TaOverFor>();
	const [laster, setLaster] = useState(false);

	if (!utkast) {
		return null;
	}

	const visValg = erBeslutterProsessStartet(utkast.beslutterProsessStatus) && utkast.beslutterNavn != null;

	function handleTaOverVedtak() {
		setLaster(true);

		const taOverResponse =
			taOverFor === TaOverFor.KVALITETSSIKRER ? bliBeslutter(hentId(utkast)) : fetchTaOverUtkast(hentId(utkast));

		taOverResponse
			.then(() => {
				const navn = innloggetVeileder.navn;
				const ident = innloggetVeileder.ident;
				const tattOverFor = taOverFor || TaOverFor.VEILEDER;
				const tilgang =
					tattOverFor === TaOverFor.VEILEDER ? VeilederTilgang.ANSVARLIG_VEILEDER : VeilederTilgang.BESLUTTER;

				if (tilgang === VeilederTilgang.ANSVARLIG_VEILEDER) {
					setUtkastVeileder(ident, navn);
					leggTilSystemMelding(SystemMeldingType.TATT_OVER_SOM_VEILEDER);
				} else {
					setUtkastBeslutter(ident, navn);
					leggTilSystemMelding(SystemMeldingType.TATT_OVER_SOM_BESLUTTER);
				}

				setVeilederTilgang(tilgang);
				hideModal();
				visTattOverVarsel();
			})
			.catch(() => showModal(ModalType.FEIL_VED_OVERTAKELSE))
			.finally(() => setLaster(false));
	}

	function visTattOverVarsel() {
		const varselType =
			taOverFor === TaOverFor.KVALITETSSIKRER
				? VarselType.TATT_OVER_SOM_BESLUTTER
				: VarselType.TATT_OVER_SOM_VEILEDER;

		showVarsel(varselType);
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
				<br />
				{`${utkast.veilederNavn}?`}
			</Normaltekst>
			<div className="varsel-modal__knapper">
				<Hovedknapp spinner={laster} disabled={laster} onClick={handleTaOverVedtak}>
					Ta over
				</Hovedknapp>
				<Knapp disabled={laster} onClick={hideModal}>
					Avbryt
				</Knapp>
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
							Ta over
						</Hovedknapp>
					</div>
				</Show>
			</div>
		</>
	);

	const Innhold = visValg ? OvertaValgVisning : OvertaForVeilederVisning;

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
	);
}

export default TaOverModal;

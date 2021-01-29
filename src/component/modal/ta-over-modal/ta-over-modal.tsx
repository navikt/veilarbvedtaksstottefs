import React, { useState } from 'react';
import { ModalProps } from '../modal-props';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { erBeslutterProsessStartet, hentId } from '../../../util';
import { useDataStore } from '../../../store/data-store';
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
	const { setVeilederTilgang, erIkkeAnsvarligVeileder } = useTilgangStore();
	const { utkast, setUtkast, innloggetVeileder, setUtkastBeslutter, leggTilSystemMelding } = useDataStore();
	const { showVarsel } = useVarselStore();

	const [taOverFor, setTaOverFor] = useState<TaOverFor>();
	const [laster, setLaster] = useState(false);

	if (!utkast) {
		return null;
	}

	const visValg =
		erIkkeAnsvarligVeileder &&
		erBeslutterProsessStartet(utkast.beslutterProsessStatus) &&
		utkast.beslutterNavn != null;

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
					setUtkast(prevUtkast => {
						// Hvis beslutter tar over ansvaret for vedtaket, så kan de ikke lenger ha rollen beslutter
						const erAlleredeBeslutter = prevUtkast?.beslutterIdent === innloggetVeileder.ident;
						const veileder = { veilederIdent: ident, veilederNavn: navn };
						const beslutter = erAlleredeBeslutter ? { beslutterIdent: null, beslutterNavn: null } : {};

						return Object.assign(prevUtkast, veileder, beslutter);
					});

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
				veileder {`${utkast.veilederNavn}?`}
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
				<Normaltekst className="varsel-modal__tekstinnehold blokk-s">Hvem ønsker du å ta over for?</Normaltekst>
				<RadioPanelGruppe
					name="taovervedtakfor"
					legend={null}
					radios={taOverOptions}
					onChange={(e: any) => setTaOverFor(e.target.value)}
					checked={taOverFor}
				/>

				<div className="varsel-modal__knapper">
					<Hovedknapp
						htmlType="submit"
						onClick={handleTaOverVedtak}
						spinner={laster}
						disabled={laster || !taOverFor}
					>
						Ta over
					</Hovedknapp>
					<Knapp disabled={laster} onClick={hideModal}>
						Avbryt
					</Knapp>
				</div>
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

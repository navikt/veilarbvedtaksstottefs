import { useState } from 'react';
import { ModalProps } from './modal-props';
import { VarselModal } from './varsel-modal/varsel-modal';
import { ModalType, useModalStore } from '../../store/modal-store';
import { erBeslutterProsessStartet, hentId } from '../../util';
import { useDataStore } from '../../store/data-store';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { useTilgangStore } from '../../store/tilgang-store';
import { VeilederTilgang } from '../../util/tilgang';
import { SystemMeldingType } from '../../util/type/melding-type';
import { useVarselStore } from '../../store/varsel-store';
import { VarselType } from '../varsel/varsel-type';
import { bliBeslutter } from '../../api/veilarbvedtaksstotte/beslutter';
import { fetchTaOverUtkast } from '../../api/veilarbvedtaksstotte/utkast';
import { Button, Heading, Modal } from '@navikt/ds-react';

enum TaOverFor {
	VEILEDER = 'VEILEDER',
	KVALITETSSIKRER = 'KVALITETSSIKRER'
}

const taOverOptions = [
	{ label: 'Veileder', value: TaOverFor.VEILEDER },
	{ label: 'Kvalitetssikrer', value: TaOverFor.KVALITETSSIKRER }
];

function TaOverModal(props: ModalProps) {
	const { resetModalType, showModal } = useModalStore();
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
						if (!prevUtkast) {
							return null;
						}
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
				resetModalType();
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
			resetModalType();
		}
	}

	const OvertaForVeilederVisning = (
		<>
			<Modal.Header>
				<Heading level="1" size="medium">
					Overta ansvar for vedtaket
				</Heading>
			</Modal.Header>
			<Modal.Body>Vil du overta ansvaret for vedtaket fra veileder {`${utkast.veilederNavn}?`}</Modal.Body>
			<Modal.Footer>
				<Button size="small" loading={laster} onClick={handleTaOverVedtak}>
					Ta over
				</Button>
				<Button size="small" variant="secondary" loading={laster} onClick={resetModalType}>
					Avbryt
				</Button>
			</Modal.Footer>
		</>
	);

	const OvertaValgVisning = (
		<>
			<Modal.Header>
				<Heading level="1" size="medium">
					Hvem ønsker du å ta over for?
				</Heading>
			</Modal.Header>
			<Modal.Body>
				<RadioPanelGruppe
					name="taovervedtakfor"
					legend={null}
					radios={taOverOptions}
					onChange={(e: any) => setTaOverFor(e.target.value)}
					checked={taOverFor}
					className="varsel-modal__tekstinnhold"
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button size="small" loading={laster} onClick={handleTaOverVedtak} disabled={!taOverFor}>
					Ta over
				</Button>
				<Button size="small" variant="secondary" loading={laster} onClick={resetModalType}>
					Avbryt
				</Button>
			</Modal.Footer>
		</>
	);

	const Innhold = visValg ? OvertaValgVisning : OvertaForVeilederVisning;

	return (
		<VarselModal isOpen={props.isOpen} onRequestClose={handleOnRequestCloseModal} contentLabel="Ta over utkast">
			{Innhold}
		</VarselModal>
	);
}

export default TaOverModal;

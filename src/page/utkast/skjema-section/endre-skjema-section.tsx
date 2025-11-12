import { useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import Kilder from './kilder/kilder';
import Begrunnelse from './begrunnelse/begrunnelse';
import Innsatsgruppe from './innsatsgruppe/innsatsgruppe';
import Hovedmal from './hovedmal/hovedmal';
import './skjema-section.less';
import { hentBeslutterprosessStatus, oppdaterVedtakUtkast } from '../../../api/veilarbvedtaksstotte/utkast';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { useSkjemaStore } from '../../../store/skjema-store';
import { useVarselStore } from '../../../store/varsel-store';
import { useDataStore } from '../../../store/data-store';
import { useIsAfterFirstRender } from '../../../util/hooks';
import { hentMalformFraData, SkjemaData } from '../../../util/skjema-utils';
import { SkjemaLagringStatus } from '../../../util/type/skjema-lagring-status';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	finnGjeldendeVedtak,
	hentId
} from '../../../util';
import { BeslutterProsessStatus } from '../../../api/veilarbvedtaksstotte';
import { VarselType } from '../../../component/varsel/varsel-type';

const TEN_SECONDS = 10000;

export function EndreSkjemaSection() {
	const { fattedeVedtak, malform, utkast, setBeslutterProsessStatus } = useDataStore();
	const { showModal } = useModalStore();
	const {
		valgteKilder,
		hovedmal,
		innsatsgruppe,
		begrunnelse,
		setSistOppdatert,
		validerSkjema,
		validerBegrunnelseLengde,
		lagringStatus,
		setLagringStatus,
		harForsoktAForhandsvise
	} = useSkjemaStore();
	const { showVarsel } = useVarselStore();

	const pollBeslutterstatusIntervalRef = useRef<number>(undefined);
	const isAfterFirstRender = useIsAfterFirstRender();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const oppdaterUtkast = useCallback(
		debounce((skjema: SkjemaData) => {
			const malformType = hentMalformFraData(malform);

			setLagringStatus(SkjemaLagringStatus.LAGRER);
			oppdaterVedtakUtkast(hentId(utkast), malformType, skjema)
				.then(() => {
					setLagringStatus(SkjemaLagringStatus.ALLE_ENDRINGER_LAGRET);
					setSistOppdatert(new Date().toISOString());
				})
				.catch(() => {
					showModal(ModalType.FEIL_VED_LAGRING);
					setLagringStatus(SkjemaLagringStatus.LAGRING_FEILET);
				});
		}, 3000),
		[]
	);

	const vedtakskjema: SkjemaData = { valgteKilder, begrunnelse, innsatsgruppe, hovedmal };

	useEffect(() => {
		// Initialiser når utkastet åpnes
		setLagringStatus(SkjemaLagringStatus.INGEN_ENDRING);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (harForsoktAForhandsvise) {
			validerSkjema(finnGjeldendeVedtak(fattedeVedtak));
		} else {
			validerBegrunnelseLengde();
		}

		if (isAfterFirstRender) {
			if (lagringStatus !== SkjemaLagringStatus.ENDRING_IKKE_LAGRET) {
				setLagringStatus(SkjemaLagringStatus.ENDRING_IKKE_LAGRET);
			}

			oppdaterUtkast(vedtakskjema);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valgteKilder, begrunnelse, innsatsgruppe, hovedmal]);

	useEffect(() => {
		if (!utkast) {
			return;
		}

		const stopPolling = () => {
			if (pollBeslutterstatusIntervalRef.current) {
				clearInterval(pollBeslutterstatusIntervalRef.current);
				pollBeslutterstatusIntervalRef.current = undefined;
			}
		};

		const erStartet = erBeslutterProsessStartet(utkast.beslutterProsessStatus);
		const erGodkjent = erGodkjentAvBeslutter(utkast.beslutterProsessStatus);
		const erHosBeslutter = erKlarTilBeslutter(utkast.beslutterProsessStatus);

		/*
            Hvis beslutterprosessen har startet og innlogget bruker er ansvarlig veileder så skal vi periodisk hente
            status for beslutterprosessen, slik at handlinger kan utføres av veileder ved endringer fra beslutter, uten refresh av siden:
                - hvis beslutter har satt utkastet tilbake til veileder, så kan veileder sette utkastet tilbake til beslutter
                - hvis beslutter har godkjent utkastet, så kan veileder sende vedtaket

            Polling skjer kun dersom utkastet er hos beslutter, så dersom utkastet er hos veileder og beslutter godkjenner, så vil ikke
            statusen bli oppdatert av pollingen.
        */
		if (erStartet && !erGodkjent && erHosBeslutter) {
			pollBeslutterstatusIntervalRef.current = window.setInterval(() => {
				hentBeslutterprosessStatus(utkast.id).then(response => {
					if (response.data && response.data.status) {
						varsleBeslutterProsessStatusEndring(response.data.status);
						setBeslutterProsessStatus(response.data.status);
					}
				});
			}, TEN_SECONDS);
		} else if (erGodkjent) {
			// Trenger ikke å polle lenger hvis utkastet er godkjent
			stopPolling();
		}

		return stopPolling;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [utkast]);

	function varsleBeslutterProsessStatusEndring(nyStatus: BeslutterProsessStatus) {
		if (utkast && nyStatus !== utkast.beslutterProsessStatus) {
			switch (nyStatus) {
				case BeslutterProsessStatus.KLAR_TIL_VEILEDER:
					showVarsel(VarselType.BESLUTTERPROSESS_TIL_VEILEDER);
					break;
				case BeslutterProsessStatus.GODKJENT_AV_BESLUTTER:
					showVarsel(VarselType.BESLUTTERPROSESS_GODKJENT);
					break;
			}
		}
	}

	useEffect(() => {
		// Det kan bli problemer hvis gamle oppdateringer henger igjen etter at brukeren har forlatt redigeringssiden.
		// Oppdateringen kan f.eks bli sendt etter at vedtaket har blitt fattet, eller at utkastet blir oppdatert med gammel data.
		return oppdaterUtkast.cancel;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form className="skjema-grid">
			<Kilder />
			<Begrunnelse />
			<Innsatsgruppe />
			<Hovedmal />
		</form>
	);
}

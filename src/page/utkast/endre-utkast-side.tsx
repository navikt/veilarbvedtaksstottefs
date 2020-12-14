import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { hentMalformFraData, SkjemaData } from '../../util/skjema-utils';
import UtkastSkjema from './skjema/utkast-skjema';
import Footer from '../../component/footer/footer';
import { ModalType, useModalStore } from '../../store/modal-store';
import { useSkjemaStore } from '../../store/skjema-store';
import {
	erBeslutterProsessStartet,
	erGodkjentAvBeslutter,
	erKlarTilBeslutter,
	finnGjeldendeVedtak,
	hentId
} from '../../util';
import { useIsAfterFirstRender } from '../../util/hooks';
import { useDataStore } from '../../store/data-store';
import './utkast-side.less';
import { SkjemaLagringStatus } from '../../util/type/skjema-lagring-status';
import EndreUtkastAksjoner from './aksjoner/endre-utkast-aksjoner';
import Opplysninger from './skjema/opplysninger/opplysninger';
import Begrunnelse from './skjema/begrunnelse/begrunnelse';
import Innsatsgruppe from './skjema/innsatsgruppe/innsatsgruppe';
import Hovedmal from './skjema/hovedmal/hovedmal';
import { useVarselStore } from '../../store/varsel-store';
import { VarselType } from '../../component/varsel/varsel-type';
import { BeslutterProsessStatus, Vedtak } from '../../api/veilarbvedtaksstotte';
import { SKRU_AV_POLLING_UTKAST } from '../../api/veilarbpersonflatefs';
import { hentBeslutterprosessStatus, oppdaterVedtakUtkast } from '../../api/veilarbvedtaksstotte/utkast';

const TEN_SECONDS = 10000;

export function EndreUtkastSide() {
	const { fattedeVedtak, malform, utkast, features, setBeslutterProsessStatus } = useDataStore();
	const { showModal } = useModalStore();
	const {
		opplysninger,
		hovedmal,
		innsatsgruppe,
		begrunnelse,
		sistOppdatert,
		setSistOppdatert,
		validerSkjema,
		validerBegrunnelseLengde,
		lagringStatus,
		setLagringStatus
	} = useSkjemaStore();
	const { showVarsel } = useVarselStore();

	const pollBeslutterstatusIntervalRef = useRef<number>();
	const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);
	const isAfterFirstRender = useIsAfterFirstRender();

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

	const vedtakskjema = { opplysninger, begrunnelse, innsatsgruppe, hovedmal };

	useEffect(() => {
		// Initialiser når utkastet åpnes
		setLagringStatus(SkjemaLagringStatus.INGEN_ENDRING);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (harForsoktAttSende) {
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
	}, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);

	useEffect(() => {
		if (!utkast || features[SKRU_AV_POLLING_UTKAST]) {
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
			pollBeslutterstatusIntervalRef.current = (setInterval(() => {
				hentBeslutterprosessStatus(utkast.id).then(response => {
					if (response.data && response.data.status) {
						varsleBeslutterProsessStatusEndring(response.data.status);
						setBeslutterProsessStatus(response.data.status);
					}
				});
			}, TEN_SECONDS) as unknown) as number;
			// NodeJs types are being used instead of browser types so we have to override
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
		<div className="utkast-side page--grey">
			<UtkastSkjema utkast={utkast as Vedtak} sistOppdatert={sistOppdatert}>
				<form className="utkast-side__form">
					<Opplysninger />
					<Begrunnelse />
					<Innsatsgruppe />
					<Hovedmal />
				</form>
			</UtkastSkjema>
			<Footer>
				<EndreUtkastAksjoner
					vedtakskjema={vedtakskjema}
					harForsoktForhandsvisning={() => setHarForsoktAttSende(true)}
				/>
			</Footer>
		</div>
	);
}

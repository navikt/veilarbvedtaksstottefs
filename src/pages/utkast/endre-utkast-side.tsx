import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { hentMalformFraData, SkjemaData } from '../../utils/skjema-utils';
import UtkastSkjema from './skjema/utkast-skjema';
import Footer from '../../components/footer/footer';
import { fetchBeslutterprosessStatus, fetchOppdaterVedtakUtkast } from '../../rest/api';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { erBeslutterProsessStartet, erGodkjentAvBeslutter, erKlarTilBeslutter, finnGjeldendeVedtak, hentId } from '../../utils';
import { useIsAfterFirstRender } from '../../utils/hooks';
import { Vedtak } from '../../rest/data/vedtak';
import { useDataStore } from '../../stores/data-store';
import './utkast-side.less';
import { SkjemaLagringStatus } from '../../utils/types/skjema-lagring-status';
import EndreUtkastAksjoner from './aksjoner/endre-utkast-aksjoner';
import Opplysninger from './skjema/opplysninger/opplysninger';
import Begrunnelse from './skjema/begrunnelse/begrunnelse';
import Innsatsgruppe from './skjema/innsatsgruppe/innsatsgruppe';
import Hovedmal from './skjema/hovedmal/hovedmal';
import { SKRU_AV_POLLING_UTKAST } from '../../rest/data/features';

const TEN_SECONDS = 10000;

export function EndreUtkastSide() {
	const { fattedeVedtak, malform, utkast, setBeslutterProsessStatus, features } = useDataStore();
	const { showModal } = useModalStore();
	const {
		opplysninger, hovedmal, innsatsgruppe, begrunnelse, sistOppdatert,
		setSistOppdatert, validerSkjema, validerBegrunnelseLengde, lagringStatus,
		setLagringStatus
	} = useSkjemaStore();

	const pollBeslutterstatusIntervalRef = useRef<number>();
	const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);
	const isAfterFirstRender = useIsAfterFirstRender();

	const oppdaterUtkast = useCallback(debounce((skjema: SkjemaData) => {
		const malformType = hentMalformFraData(malform);

		setLagringStatus(SkjemaLagringStatus.LAGRER);
		fetchOppdaterVedtakUtkast({ vedtakId: hentId(utkast), skjema, malform: malformType })
			.then(() => {
				setLagringStatus(SkjemaLagringStatus.ALLE_ENDRINGER_LAGRET);
				setSistOppdatert(new Date().toISOString());
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_LAGRING);
				setLagringStatus(SkjemaLagringStatus.LAGRING_FEILET);
			});
	}, 3000), []);

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

			pollBeslutterstatusIntervalRef.current = setInterval(() => {
				fetchBeslutterprosessStatus(utkast.id)
					.then(response => {
						if (response.data && response.data.status) {
							setBeslutterProsessStatus(response.data.status);
						}
					});
			}, TEN_SECONDS) as unknown as number;
			// NodeJs types are being used instead of browser types so we have to override
		} else if (erGodkjent) {
			// Trenger ikke å polle lenger hvis utkastet er godkjent
			stopPolling();
		}

		return stopPolling;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [utkast]);



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
				<EndreUtkastAksjoner vedtakskjema={vedtakskjema} harForsoktForhandsvisning={() => setHarForsoktAttSende(true)} />
			</Footer>
		</div>
	);
}

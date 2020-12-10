import React, { useEffect, useRef } from 'react';
import { BeslutterProsessStatus, Vedtak } from '../../../rest/data/vedtak';
import { useDataStore } from '../../../stores/data-store';
import { useTilgangStore } from '../../../stores/tilgang-store';
import { useAppStore } from '../../../stores/app-store';
import { Normaltekst } from 'nav-frontend-typografi';
import { getHovedmalNavn } from '../../../utils/hovedmal';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { getInnsatsgruppeTekst } from '../../../utils/innsatsgruppe';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { OrNothing } from '../../../utils/types/ornothing';
import { fetchFattedeVedtak, fetchUtkast } from '../../../rest/api';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { SKRU_AV_POLLING_UTKAST } from '../../../rest/data/features';
import { useVarselStore } from '../../../stores/varsel-store';
import { VarselType } from '../../../components/varsel/varsel-type';
import isEqual from 'lodash/isEqual';
import FeltHeader from './felt-header/felt-header';
import './skjema-section.less';

const TEN_SECONDS = 10000;

export function LesSkjemaSection() {
	const { fnr } = useAppStore();
	const { utkast, setUtkast, setFattedeVedtak, features } = useDataStore();
	const { changeView } = useViewStore();
	const { erBeslutter } = useTilgangStore();
	const { initSkjema } = useSkjemaStore();
	const { showVarsel } = useVarselStore();
	const refreshUtkastIntervalRef = useRef<number>();

	useEffect(() => {
		/*
			Hvis beslutterprosessen har startet og innlogget bruker er beslutter så skal vi periodisk hente
			det nyeste utkastet slik at man ikke må refreshe manuelt når ansvarlig veileder gjør en endring
		 */
		if (utkast && !features[SKRU_AV_POLLING_UTKAST] && utkast.beslutterProsessStatus != null && erBeslutter) {
			refreshUtkastIntervalRef.current = window.setInterval(() => {
				fetchUtkast(fnr).then(response => {
					if (response.data) {
						if (erVedtakSkjemafeltEndret(utkast, response.data)) {
							showVarsel(VarselType.UTKAST_OPPDATERT);
						}
						varsleBeslutterProsessStatusEndring(response.data.beslutterProsessStatus);
						setUtkast(response.data);
						initSkjema(response.data);
					}
				});
			}, TEN_SECONDS);
		}

		return () => {
			if (refreshUtkastIntervalRef.current) {
				clearInterval(refreshUtkastIntervalRef.current);
				refreshUtkastIntervalRef.current = undefined;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [utkast, erBeslutter]);

	function erVedtakSkjemafeltEndret(v1: Vedtak, v2: Vedtak) {
		return (
			v1.begrunnelse !== v2.begrunnelse ||
			v1.hovedmal !== v2.hovedmal ||
			v1.innsatsgruppe !== v2.innsatsgruppe ||
			!isEqual(v1.opplysninger, v2.opplysninger)
		);
	}

	function varsleBeslutterProsessStatusEndring(nyStatus: OrNothing<BeslutterProsessStatus>) {
		if (
			utkast &&
			nyStatus &&
			nyStatus !== utkast.beslutterProsessStatus &&
			nyStatus === BeslutterProsessStatus.KLAR_TIL_BESLUTTER
		) {
			showVarsel(VarselType.BESLUTTERPROSESS_TIL_BESLUTTER);
		}
	}

	// Utkast kan bli satt til null hvis man er beslutter og veileder fatter et vedtak
	if (utkast == null) {
		fetchFattedeVedtak(fnr).then(response => {
			if (response.data) {
				setFattedeVedtak(response.data);
			}
			changeView(ViewType.HOVEDSIDE);
		});
		return null;
	}

	const { opplysninger, begrunnelse, innsatsgruppe, hovedmal } = utkast;

	return (
		<div className="skjema-grid les-utkast-skjema">
			<div className="opplysninger-felt">
				<FeltHeader tittel="Kilder" />
				<ul className="opplysninger-felt__liste">
					{opplysninger.map((opplysning, idx) => {
						return <li key={idx}>{opplysning}</li>;
					})}
				</ul>
			</div>

			<div className="begrunnelse-felt">
				<FeltHeader tittel="Begrunnelse" />
				<Tekstomrade>{begrunnelse || ''}</Tekstomrade>
			</div>

			<div className="innsatsgruppe-felt">
				<FeltHeader tittel="Innsatsgruppe" />
				<Normaltekst className="text--grey">
					{innsatsgruppe && getInnsatsgruppeTekst(innsatsgruppe).tittel}
				</Normaltekst>
			</div>

			<div className="hovedmal-felt">
				<FeltHeader tittel="Hovedmål" />
				<Normaltekst className="text--grey">{getHovedmalNavn(hovedmal)}</Normaltekst>
			</div>
		</div>
	);
}

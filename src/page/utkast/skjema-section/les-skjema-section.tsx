import React, { useEffect, useRef } from 'react';
import { VarselType } from '../../../component/varsel/varsel-type';
import isEqual from 'lodash.isequal';
import FeltHeader from './felt-header/felt-header';
import './skjema-section.less';
import { useAppStore } from '../../../store/app-store';
import { useViewStore, ViewType } from '../../../store/view-store';
import { useDataStore } from '../../../store/data-store';
import { useTilgangStore } from '../../../store/tilgang-store';
import { useSkjemaStore } from '../../../store/skjema-store';
import { useVarselStore } from '../../../store/varsel-store';
import { fetchUtkast } from '../../../api/veilarbvedtaksstotte/utkast';
import { BeslutterProsessStatus, Utkast } from '../../../api/veilarbvedtaksstotte';
import { OrNothing } from '../../../util/type/ornothing';
import { hentFattedeVedtak } from '../../../api/veilarbvedtaksstotte/vedtak';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Normaltekst } from 'nav-frontend-typografi';
import { getInnsatsgruppeTekst } from '../../../util/innsatsgruppe';
import { getHovedmalNavn } from '../../../util/hovedmal';
import { MalformData, MalformType } from '../../../api/veilarbperson';

const TEN_SECONDS = 10000;

function malformToTekst(malform: OrNothing<MalformData>): string {
	const malformType = malform ? malform.malform : null;

	if (malformType === MalformType.nn || malformType === MalformType.nb) {
		return `Norsk (${malformType === MalformType.nn ? 'Nynorsk' : 'Bokmål'})`;
	} else if (!malformType) {
		return 'Ukjent';
	}

	return malformType;
}

export function LesSkjemaSection() {
	const { fnr } = useAppStore();
	const { utkast, setUtkast, setFattedeVedtak } = useDataStore();
	const { changeView } = useViewStore();
	const { erBeslutter } = useTilgangStore();
	const { initSkjema } = useSkjemaStore();
	const { showVarsel } = useVarselStore();
	const refreshUtkastIntervalRef = useRef<number>();
	const { malform } = useDataStore();

	useEffect(() => {
		/*
			Hvis beslutterprosessen har startet og innlogget bruker er beslutter så skal vi periodisk hente
			det nyeste utkastet slik at man ikke må refreshe manuelt når ansvarlig veileder gjør en endring
		 */
		if (utkast && utkast.beslutterProsessStatus != null && erBeslutter) {
			refreshUtkastIntervalRef.current = window.setInterval(() => {
				fetchUtkast(fnr)
					.then(response => {
						if (response.data) {
							if (erVedtakSkjemafeltEndret(utkast, response.data)) {
								showVarsel(VarselType.UTKAST_OPPDATERT);
							}
							varsleBeslutterProsessStatusEndring(response.data.beslutterProsessStatus);
							setUtkast(response.data);
							initSkjema(response.data);
						}
					})
					.catch();
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

	function erVedtakSkjemafeltEndret(v1: Utkast, v2: Utkast) {
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
		hentFattedeVedtak(fnr)
			.then(response => {
				if (response.data) {
					setFattedeVedtak(response.data);
				}
				changeView(ViewType.HOVEDSIDE);
			})
			.catch();
		return null;
	}

	const { opplysninger, innsatsgruppe, hovedmal } = utkast;
	const begrunnelse = utkast.begrunnelse || '';

	return (
		<div className="skjema-grid les-utkast-skjema">
			<div className="kilder-felt">
				<FeltHeader tittel="Kilder" />
				<ul className="kilder-felt__liste">
					{opplysninger.map((opplysning, idx) => {
						return <li key={idx}>{opplysning}</li>;
					})}
				</ul>
			</div>

			<div className="begrunnelse-felt">
				<FeltHeader
					tittel="Begrunnelse"
					eksternLenke="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Oppdaterte-retningslinjer-for.aspx"
				/>
				<Tekstomrade className="blokk-s">{begrunnelse}</Tekstomrade>
				<Normaltekst className="begrunnelse-felt__antall-tegn">
					<span>{'Brukers målform: ' + malformToTekst(malform)}</span>
					<span className="span-right"> {'Antall tegn: ' + begrunnelse.length}</span>
				</Normaltekst>
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

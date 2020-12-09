import React, { useEffect, useRef } from 'react';
import { BeslutterProsessStatus, InnsatsgruppeType, Vedtak } from '../../rest/data/vedtak';
import { useDataStore } from '../../stores/data-store';
import './utkast-side.less';
import { useTilgangStore } from '../../stores/tilgang-store';
import { useAppStore } from '../../stores/app-store';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getHovedmalNavn } from '../../utils/hovedmal';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { getInnsatsgruppeTekst } from '../../utils/innsatsgruppe';
import { useViewStore, ViewType } from '../../stores/view-store';
import { OrNothing } from '../../utils/types/ornothing';
import { fetchFattedeVedtak, fetchUtkast } from '../../rest/api';
import { useSkjemaStore } from '../../stores/skjema-store';
import { SKRU_AV_POLLING_UTKAST } from '../../rest/data/features';
import SkjemaBolk from './skjema/bolk/skjema-bolk';
import checkmark from './check.svg';
import { BEGRUNNELSE_ANBEFALT_LENGTH } from './skjema/begrunnelse/begrunnelse';
import { useVarselStore } from '../../stores/varsel-store';
import { VarselType } from '../../components/varsel/varsel-type';
import isEqual from 'lodash/isEqual';

const TEN_SECONDS = 10000;

export function LesUtkastSkjema() {
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
			refreshUtkastIntervalRef.current = (setInterval(() => {
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
			}, TEN_SECONDS) as unknown) as number;
			// NodeJs types are being used instead of browser types so we have to override
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
	const begrunnelseLength = begrunnelse ? begrunnelse.length : 0;

	return (
		<div className="les-utkast-skjema">
			<div className="les-utkast-skjema__visning">
				<SkjemaBolk tittel="Kilder" className="les-utkast-skjema__kilder">
					<ul className="kilder-liste">
						{opplysninger.map((o, idx) => {
							return (
								<li key={idx} className="kilder-liste__item">
									<img src={checkmark} alt="Checkmerke" className="kilder-liste__item-icon" />
									<Normaltekst>{o}</Normaltekst>
								</li>
							);
						})}
					</ul>
				</SkjemaBolk>

				<SkjemaBolk tittel="Begrunnelse">
					<div className="begrunnelse__tekstomrade-wrapper">
						<Tekstomrade className="begrunnelse__tekstomrade">{begrunnelse ? begrunnelse : ''}</Tekstomrade>
					</div>
					{begrunnelseLength > BEGRUNNELSE_ANBEFALT_LENGTH ? (
						<div className="begrunnelse__tegnteller">
							<Normaltekst tag="span" className="begrunnelse__tegnteller-tekst">
								Du har {begrunnelseLength - BEGRUNNELSE_ANBEFALT_LENGTH} tegn for mye{' '}
							</Normaltekst>
						</div>
					) : (
						<div className="begrunnelse__tegnteller">
							<Normaltekst tag="span" className="begrunnelse__tegnteller-tekst">
								Du har {BEGRUNNELSE_ANBEFALT_LENGTH - begrunnelseLength} tegn igjen{' '}
							</Normaltekst>
						</div>
					)}
				</SkjemaBolk>

				<SkjemaBolk tittel="Innsatsgruppe">
					<CheckboxVisning>
						<InnsatsgruppeVisning innsatsgruppe={innsatsgruppe} />
					</CheckboxVisning>
				</SkjemaBolk>

				<SkjemaBolk tittel="Hovedmål">
					{hovedmal ? (
						<CheckboxVisning>
							<Normaltekst>{getHovedmalNavn(hovedmal)}</Normaltekst>
						</CheckboxVisning>
					) : (
						<Normaltekst>
							Hovedmål settes ikke ved varig tilpasset innsats (varig nedsatt arbeidsevne)
						</Normaltekst>
					)}
				</SkjemaBolk>
			</div>
		</div>
	);
}

const CheckboxVisning = (props: { children: any }) => {
	return (
		<div className="checkbox-visning">
			<img src={checkmark} alt="Checkmerke" className="checkbox-visning__icon" />
			{props.children}
		</div>
	);
};

const InnsatsgruppeVisning = (props: { innsatsgruppe: OrNothing<InnsatsgruppeType> }) => {
	if (!props.innsatsgruppe) {
		return <Element>Innsatsgruppe ikke valgt</Element>;
	}

	const innsatsgruppeTekst = getInnsatsgruppeTekst(props.innsatsgruppe);

	return (
		<div>
			<Element>{innsatsgruppeTekst.tittel}</Element>
			<Normaltekst className="text--grey">{innsatsgruppeTekst.undertekst}</Normaltekst>
		</div>
	);
};

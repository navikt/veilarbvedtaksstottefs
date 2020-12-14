import React, { useEffect, useRef } from 'react';
import Footer from '../../component/footer/footer';
import { useDataStore } from '../../store/data-store';
import './utkast-side.less';
import { useTilgangStore } from '../../store/tilgang-store';
import { useAppStore } from '../../store/app-store';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getHovedmalNavn } from '../../util/hovedmal';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { getInnsatsgruppeTekst } from '../../util/innsatsgruppe';
import LesUtkastAksjoner from './aksjoner/les-utkast-aksjoner';
import UtkastSkjema from './skjema/utkast-skjema';
import { useViewStore, ViewType } from '../../store/view-store';
import { OrNothing } from '../../util/type/ornothing';
import { useSkjemaStore } from '../../store/skjema-store';
import SkjemaBolk from './skjema/bolk/skjema-bolk';
import checkmark from './check.svg';
import { BEGRUNNELSE_ANBEFALT_LENGTH } from './skjema/begrunnelse/begrunnelse';
import { useVarselStore } from '../../store/varsel-store';
import { VarselType } from '../../component/varsel/varsel-type';
import isEqual from 'lodash/isEqual';
import { BeslutterProsessStatus, InnsatsgruppeType, Vedtak } from '../../api/veilarbvedtaksstotte';
import { SKRU_AV_POLLING_UTKAST } from '../../api/veilarbpersonflatefs';
import { fetchUtkast } from '../../api/veilarbvedtaksstotte/utkast';
import { hentFattedeVedtak } from '../../api/veilarbvedtaksstotte/vedtak';

const TEN_SECONDS = 10000;

export function LesUtkastSide() {
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
		hentFattedeVedtak(fnr).then(response => {
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
		<div className="utkast-side les-utkast-side page--grey">
			<UtkastSkjema utkast={utkast} sistOppdatert={utkast.sistOppdatert}>
				<div className="utkast-side__visning">
					<SkjemaBolk tittel="Kilder" className="les-utkast__kilder">
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
							<Tekstomrade className="begrunnelse__tekstomrade">
								{begrunnelse ? begrunnelse : ''}
							</Tekstomrade>
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
			</UtkastSkjema>
			<Footer>
				<LesUtkastAksjoner />
			</Footer>
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

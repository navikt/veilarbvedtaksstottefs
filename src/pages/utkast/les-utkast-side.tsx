import React, { useEffect, useRef } from 'react';
import Footer from '../../components/footer/footer';
import { InnsatsgruppeType } from '../../rest/data/vedtak';
import { useDataStore } from '../../stores/data-store';
import './utkast-side.less';
import { useTilgangStore } from '../../stores/tilgang-store';
import { useAppStore } from '../../stores/app-store';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getHovedmalNavn } from '../../utils/hovedmal';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { getInnsatsgruppeTekst } from '../../utils/innsatsgruppe';
import LesUtkastAksjoner from './aksjoner/les-utkast-aksjoner';
import UtkastSkjema from './skjema/utkast-skjema';
import { useViewStore, ViewType } from '../../stores/view-store';
import { OrNothing } from '../../utils/types/ornothing';
import { fetchFattedeVedtak, fetchUtkast } from '../../rest/api';
import { useSkjemaStore } from '../../stores/skjema-store';

const TEN_SECONDS = 10000;

export function LesUtkastSide() {
	const {fnr} = useAppStore();
	const {utkast, setUtkast, setFattedeVedtak} = useDataStore();
	const {changeView} = useViewStore();
	const {erBeslutter} = useTilgangStore();
	const {initSkjema} = useSkjemaStore();
	const refreshUtkastIntervalRef = useRef<number>();

	useEffect(() => {
		/*
			Hvis beslutterprosessen har startet og innlogget bruker er beslutter så skal vi periodisk hente
			det nyeste utkastet slik at man ikke må refreshe manuelt når ansvarlig veileder gjør en endring
		 */
		if (utkast && utkast.beslutterProsessStatus != null && erBeslutter) {
			refreshUtkastIntervalRef.current = setInterval(() => {
				fetchUtkast(fnr).then(response => {
					if (response.data) {
						setUtkast(response.data);
						initSkjema(response.data);
					}
				})
			}, TEN_SECONDS) as unknown as number;
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

	// Utkast kan bli satt til null hvis man er beslutter og veileder fatter et vedtak
	if (utkast == null) {
		fetchFattedeVedtak(fnr).then(response => {
			if (response.data) {
				setFattedeVedtak(response.data);
			}
			changeView(ViewType.HOVEDSIDE);
		})
		return null;
	}

	const {opplysninger, begrunnelse, innsatsgruppe, hovedmal} = utkast;

	return (
		<div className="utkast-side page--grey">
			<UtkastSkjema utkast={utkast} sistOppdatert={utkast.sistOppdatert}>
				<div className="utkast-side__visning">

					<div>
						<Element tag="span" className="skjema-visning__label blokk-xxs">Kilder</Element>
						<ul className="skjema-visning__opplysninger">
							{opplysninger.map((o, idx) => (<li key={idx}>{o}</li>))}
						</ul>
					</div>

					<Element tag="span" className="skjema-visning__label blokk-xxs">Begrunnelse</Element>
					<Tekstomrade className="skjema-visning__begrunnelse">{begrunnelse ? begrunnelse : ''}</Tekstomrade>

					<div className="skjema-visning__felter">
						<InnsatsgruppeVisning innsatsgruppe={innsatsgruppe} />

						<div>
							<Element>Hovedmål</Element>
							<Normaltekst className="text--grey">{getHovedmalNavn(hovedmal)}</Normaltekst>
						</div>
					</div>

				</div>
			</UtkastSkjema>
			<Footer>
				<LesUtkastAksjoner />
			</Footer>
		</div>
	);
}

const InnsatsgruppeVisning = (props: {innsatsgruppe: OrNothing<InnsatsgruppeType>}) => {
	if (!props.innsatsgruppe) {
		return (
			<div className="blokk-m">
				<Element>Innsatsgruppe ikke valgt</Element>
			</div>
		);
	}

	const innsatsgruppeTekst = getInnsatsgruppeTekst(props.innsatsgruppe);

	return (
		<div className="blokk-m">
			<Element>{innsatsgruppeTekst.tittel}</Element>
			<Normaltekst className="text--grey">{innsatsgruppeTekst.undertekst}</Normaltekst>
		</div>
	);
};

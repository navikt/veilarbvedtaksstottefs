import React, { useEffect, useRef } from 'react';
import Aksjoner from '../../components/utkast-skjema/aksjoner/aksjoner';
import Footer from '../../components/footer/footer';
import SkjemaHeader from '../../components/utkast-skjema/header/skjema-header';
import { useSkjemaStore } from '../../stores/skjema-store';
import { InnsatsgruppeType, Vedtak } from '../../rest/data/vedtak';
import { useDataStore } from '../../stores/data-store';
import './utkast-side.less';
import { useTilgangStore } from '../../stores/tilgang-store';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { useAppStore } from '../../stores/app-store';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Label } from '../../components/label/label';
import { formatDateStr } from '../../utils/date-utils';
import Show from '../../components/show';
import { getHovedmalNavn } from '../../utils/hovedmal';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { getInnsatsgruppeTekst } from '../../utils/innsatsgruppe';

const TEN_SECONDS = 10000;

export function LesUtkastSide() {
	const {fnr} = useAppStore();
	const {utkast} = useDataStore();
	const {utkastFetcher} = useDataFetcherStore();
	const {erBeslutter} = useTilgangStore();
	const {
		opplysninger, hovedmal, innsatsgruppe, begrunnelse, sistOppdatert
	} = useSkjemaStore();

	const refreshUtkastIntervalRef = useRef<number>();

	const innsatsgruppeTekst = getInnsatsgruppeTekst(innsatsgruppe as InnsatsgruppeType);

	const vedtakskjema = {opplysninger, begrunnelse, innsatsgruppe, hovedmal};

	useEffect(() => {
		/*
			Hvis beslutterprosessen har startet og innlogget bruker er beslutter så skal vi periodisk hente
			det nyeste utkastet slik at man ikke må refreshe manuelt når ansvarlig veileder gjør en endring
		 */
		if (utkast && utkast.beslutterProsessStatus != null && erBeslutter) {
			refreshUtkastIntervalRef.current = setInterval(() => {
				utkastFetcher.fetch({fnr});
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
	}, [utkast]);

	return (
		<div className="utkast-side page--grey">
			<div className="utkast-side__utkast">
				<SkjemaHeader utkast={utkast as Vedtak} sistOppdatert={sistOppdatert}/>
				<div className="skjema-visning">

					<div className="skjema-visning__info">
						<Element tag="span" className="skjema-visning__label blokk-xxs">Kilder</Element>
						<ul className="skjema-visning__opplysninger">{opplysninger.map((o, idx) => (
							<li key={idx}>{o}</li>))}</ul>
					</div>

					<Element tag="span" className="skjema-visning__label blokk-xxs">Begrunnelse</Element>
					<Tekstomrade className="skjema-visning__begrunnelse">{begrunnelse ? begrunnelse : ''}</Tekstomrade>

					<div className="skjema-visning__felter">
						<div className="blokk-m">
							<Element>{innsatsgruppeTekst.tittel}</Element>
							<Normaltekst className="text--grey">{innsatsgruppeTekst.undertekst}</Normaltekst>
						</div>

						<div>
							<Element>Hovedmål</Element>
							<Normaltekst className="text--grey">{getHovedmalNavn(hovedmal)}</Normaltekst>
						</div>
					</div>

				</div>
			</div>
			<Footer>
				<Aksjoner vedtakskjema={vedtakskjema} harForsoktForhandsvisning={() => {}}/>
			</Footer>
		</div>
	);
}

import React from 'react';
import { useViewStore, ViewType } from '../../store/view-store';
import { SkjemaVisningHeader } from './header/skjema-visning-header';
import { Label } from '../label/label';
import { formatDateStr } from '../../util/date-utils';
import Show from '../show';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getInnsatsgruppeTekst } from '../../util/innsatsgruppe';
import './skjema-visning.less';
import { getHovedmalNavn } from '../../util/hovedmal';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { InnsatsgruppeType, Vedtak } from '../../api/veilarbvedtaksstotte';

export function SkjemaVisning(props: { fattetVedtak: Vedtak }) {
	const { changeView } = useViewStore();
	const {
		id,
		hovedmal,
		opplysninger,
		innsatsgruppe,
		begrunnelse,
		beslutterNavn,
		gjeldende,
		veilederNavn,
		oppfolgingsenhetNavn,
		oppfolgingsenhetId,
		utkastSistOppdatert
	} = props.fattetVedtak;

	const innsatsgruppeTekst = getInnsatsgruppeTekst(innsatsgruppe as InnsatsgruppeType);
	const fattetAv = `${veilederNavn}, ${oppfolgingsenhetId} ${oppfolgingsenhetNavn}`;

	return (
		<div className="skjema-visning">
			<SkjemaVisningHeader erGjeldende={gjeldende} />

			<div className="skjema-visning__info">
				<Label
					titleTextClassName="label__title-text--gap-lg"
					className="blokk-xxs"
					titleText="Dato"
					valueText={formatDateStr(utkastSistOppdatert)}
				/>
				<Show if={beslutterNavn}>
					<Label
						titleTextClassName="label__title-text--gap-lg"
						className="blokk-xxs"
						titleText="Kvalitetssikrer"
						valueText={beslutterNavn}
					/>
				</Show>
				<Label titleTextClassName="label__title-text--gap-lg" titleText="Fattet av" valueText={fattetAv} />
			</div>

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

			<Element tag="span" className="skjema-visning__label blokk-xxs">
				Begrunnelse
			</Element>
			<Tekstomrade className="skjema-visning__begrunnelse">{begrunnelse ? begrunnelse : ''}</Tekstomrade>

			<Element tag="span" className="skjema-visning__label blokk-xxs">
				Kilder
			</Element>
			<ul className="skjema-visning__kilder">
				{opplysninger.map((o, idx) => (
					<li key={idx}>{o}</li>
				))}
			</ul>

			<button
				className="skjema-visning__oyblikksbilde-lenke"
				onClick={() => changeView(ViewType.OYBLIKKSBILDE_VISNING, { vedtakId: id })}
			>
				Brukerinformasjon på vedtakstidspunktet
			</button>
		</div>
	);
}

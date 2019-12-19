import React from 'react';
import { InnsatsgruppeType, VedtakData } from '../../rest/data/vedtak';
import { useViewStore, ViewType } from '../../stores/view-store';
import { SkjemaVisningHeader } from './header/skjema-visning-header';
import { Label } from '../label/label';
import { formatDateStr } from '../../utils/date-utils';
import Show from '../show';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getInnsatsgruppeTekst } from '../../utils/innsatsgruppe';
import './skjema-visning.less';
import { getHovedmalNavn } from '../../utils/hovedmal';

export function SkjemaVisning(props: { vedtak: VedtakData }) {
	const { changeView } = useViewStore();
	const {
		id, hovedmal, opplysninger,
		innsatsgruppe, begrunnelse,
		beslutterNavn, gjeldende,
		veilederNavn, veilederEnhetNavn,
		veilederEnhetId, sistOppdatert,
		sendtTilBeslutter
	} = props.vedtak;

	const innsatsgruppeTekst = getInnsatsgruppeTekst(innsatsgruppe as InnsatsgruppeType);
	const fattetAv = `${veilederNavn}, ${veilederEnhetId} ${veilederEnhetNavn}`;

	return (
		<div className="skjema-visning">
			<SkjemaVisningHeader erGjeldende={gjeldende}/>

			<div className="skjema-visning__info">
				<Label
					labelClassName="label__title--gap-lg"
					className="blokk-xxs"
					labelText="Dato"
					valueText={formatDateStr(sistOppdatert)}
				/>
				<Show if={sendtTilBeslutter}>
					<Label
						labelClassName="label__title--gap-lg"
						className="blokk-xxs"
						labelText="Beslutter"
						valueText={beslutterNavn}
					/>
				</Show>
				<Label labelClassName="label__title--gap-lg" labelText="Fattet av" valueText={fattetAv} />
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

			<Element tag="span" className="skjema-visning__label blokk-xxs">Begrunnelse</Element>
			<Normaltekst className="text--grey blokk-m">{begrunnelse}</Normaltekst>

			<Element tag="span" className="skjema-visning__label blokk-xxs">Kilder</Element>
			<ul className="skjema-visning__opplysninger">{opplysninger.map((o, idx) => (<li key={idx}>{o}</li>))}</ul>

			<button
				className="skjema-visning__oyblikksbilde-lenke"
				onClick={() => changeView(ViewType.VEDLEGG, { vedtakId: id })}
			>
				Brukerinformasjon på vedtakstidspunktet
			</button>
		</div>
	);
}

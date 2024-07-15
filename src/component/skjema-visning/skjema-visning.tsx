import { useViewStore, ViewType } from '../../store/view-store';
import { SkjemaVisningHeader } from './header/skjema-visning-header';
import { formatDateStr } from '../../util/date-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getInnsatsgruppeTekst } from '../../util/innsatsgruppe';
import { getHovedmalNavn } from '../../util/hovedmal';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { BodyLong, BodyShort, Button, VStack } from '@navikt/ds-react';
import './skjema-visning.less';

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
		vedtakFattet
	} = props.fattetVedtak;

	const innsatsgruppeTekst = getInnsatsgruppeTekst(innsatsgruppe);
	const fattetAv = `${veilederNavn}, ${oppfolgingsenhetId} ${oppfolgingsenhetNavn}`;

	return (
		<div className="skjema-visning">
			<SkjemaVisningHeader erGjeldende={gjeldende} />

			<VStack gap="2" className="skjema-visning__info">
				<BodyShort size="small">
					<b>Dato:</b> {formatDateStr(vedtakFattet)}
				</BodyShort>
				{beslutterNavn && (
					<BodyShort size="small">
						<b>Kvalitetssikrer:</b> {beslutterNavn}
					</BodyShort>
				)}
				<BodyShort size="small">
					<b>Fattet av:</b> {fattetAv}
				</BodyShort>
			</VStack>

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
			<BodyLong size="small" style={{ whiteSpace: 'pre-wrap' }} spacing>
				{begrunnelse ?? ''}
			</BodyLong>

			<Element tag="span" className="skjema-visning__label blokk-xxs">
				Kilder
			</Element>
			<ul className="skjema-visning__kilder">
				{opplysninger.map((o, idx) => (
					<li key={idx}>{o}</li>
				))}
			</ul>

			<Button variant="tertiary" onClick={() => changeView(ViewType.OYBLIKKSBILDE_VISNING, { vedtakId: id })}>
				Journalført brukerinformasjon på vedtakstidspunktet
			</Button>
		</div>
	);
}

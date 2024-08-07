import { useViewStore, ViewType } from '../../store/view-store';
import { SkjemaVisningHeader } from './header/skjema-visning-header';
import { formatDateStr } from '../../util/date-utils';
import { getInnsatsgruppeTekst } from '../../util/innsatsgruppe';
import { getHovedmalNavn } from '../../util/hovedmal';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { BodyLong, BodyShort, Button, Heading, Label, List, VStack } from '@navikt/ds-react';
import './skjema-visning.css';

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
		<VStack gap="8" className="skjema-visning">
			<SkjemaVisningHeader erGjeldende={gjeldende} />

			<div>
				<BodyShort size="small" spacing>
					<b>Dato:</b> {formatDateStr(vedtakFattet)}
				</BodyShort>
				{beslutterNavn && (
					<BodyShort size="small" spacing>
						<b>Kvalitetssikrer:</b> {beslutterNavn}
					</BodyShort>
				)}
				<BodyShort size="small">
					<b>Fattet av:</b> {fattetAv}
				</BodyShort>
			</div>

			<div>
				<Label size="small" as="p">
					{innsatsgruppeTekst.tittel}
				</Label>
				<BodyShort size="small" spacing>
					{innsatsgruppeTekst.undertekst}
				</BodyShort>

				<Label size="small" as="p">
					Hovedmål
				</Label>
				<BodyShort size="small">{getHovedmalNavn(hovedmal)}</BodyShort>
			</div>

			<div>
				<Heading size="xsmall" level="2" spacing>
					Begrunnelse
				</Heading>
				<BodyLong size="small" style={{ whiteSpace: 'pre-wrap' }}>
					{begrunnelse ?? ''}
				</BodyLong>
			</div>

			<List size="small" title="Kilder">
				{opplysninger.map(opplysning => (
					<List.Item key={opplysning}>{opplysning}</List.Item>
				))}
			</List>

			<Button
				variant="tertiary"
				onClick={() => changeView(ViewType.OYBLIKKSBILDE_VISNING, { vedtakId: id })}
				id="journalfort-info-knapp"
			>
				Journalført brukerinformasjon på vedtakstidspunktet
			</Button>
		</VStack>
	);
}

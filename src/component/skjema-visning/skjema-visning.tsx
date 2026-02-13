import { BodyLong, BodyShort, Box, Button, Heading, List, VStack } from '@navikt/ds-react';
import { useViewStore, ViewType } from '../../store/view-store';
import { SkjemaVisningHeader } from './header/skjema-visning-header';
import { formatDateStr } from '../../util/date-utils';
import { innsatsgruppeTekst } from '../../util/innsatsgruppe';
import { getHovedmalNavnEllerEmdash } from '../../util/hovedmal';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
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

	const fattetAv = `${veilederNavn}, ${oppfolgingsenhetId} ${oppfolgingsenhetNavn}`;

	return (
		<Box
			background={'default'}
			borderColor="neutral-subtle"
			borderWidth="1"
			borderRadius="2"
			padding="space-8"
			marginInline="space-1"
		>
			<VStack gap="space-20" className="skjema-visning">
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
					<Heading size="xsmall" level="2" spacing>
						Innsatsgruppe
					</Heading>
					<BodyShort size="small">{innsatsgruppeTekst[innsatsgruppe]}</BodyShort>
				</div>

				<div>
					<Heading size="xsmall" level="2" spacing>
						Hovedmål
					</Heading>
					<BodyShort size="small">{getHovedmalNavnEllerEmdash(hovedmal)}</BodyShort>
				</div>

				<div>
					<Heading size="xsmall" level="2" spacing>
						Begrunnelse
					</Heading>
					<BodyLong size="small" style={{ whiteSpace: 'pre-wrap' }}>
						{begrunnelse ?? ''}
					</BodyLong>
				</div>

				<div>
					<Heading level="3" size="small">
						Kilder
					</Heading>
					<Box marginBlock="space-16" asChild>
						<List size="small">
							{opplysninger.map(opplysning => (
								<List.Item key={opplysning}>{opplysning}</List.Item>
							))}
						</List>
					</Box>
				</div>

				<Button
					variant="tertiary"
					onClick={() => changeView(ViewType.OYBLIKKSBILDE_VISNING, { vedtakId: id })}
					id="journalfort-info-knapp"
				>
					Journalført brukerinformasjon på vedtakstidspunktet
				</Button>
			</VStack>
		</Box>
	);
}

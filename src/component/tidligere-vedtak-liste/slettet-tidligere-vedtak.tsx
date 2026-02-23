import { BodyShort, Box, Detail } from '@navikt/ds-react';
import { formatDateStr } from '../../util/date-utils';
import { FileParagraphIcon } from '@navikt/aksel-icons';

export const SlettetTidligereVedtak = ({ posisjon, tidspunkt }: { posisjon: number; tidspunkt: string }) => {
	const elemId = `vedtak-panel-tidligere-vedtak-${posisjon}`;

	return (
		<Box aria-describedby={elemId} className="vedtak-panel">
			<FileParagraphIcon fontSize="3.5rem" />
			<div id={elemId}>
				<BodyShort size="small" weight="semibold" className="tidligere-vedtak-panel__innsats--tittel">
					Feilregistrert
				</BodyShort>
				<Detail textColor="subtle">
					Vedtaket slettet {formatDateStr(tidspunkt)} fordi det inneholdt informasjon om en annen bruker.
				</Detail>
			</div>
		</Box>
	);
};

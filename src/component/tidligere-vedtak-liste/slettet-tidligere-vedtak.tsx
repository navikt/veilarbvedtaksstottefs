import { BodyShort, Box, Detail } from '@navikt/ds-react';
import { formatDateStr } from '../../util/date-utils';
import { VedtakSvg } from './VedtakSvg.tsx';

export const SlettetTidligereVedtak = ({ posisjon, tidspunkt }: { posisjon: number; tidspunkt: string }) => {
	const elemId = `vedtak-panel-tidligere-vedtak-${posisjon}`;

	return (
		<Box aria-describedby={elemId} className="vedtak-panel">
			<VedtakSvg />
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

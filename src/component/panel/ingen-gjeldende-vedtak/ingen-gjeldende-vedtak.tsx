import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import ingenGjeldendeVedtakBilde from './ingen_gjeldende_vedtak.svg';
import { BodyShort, Heading } from '@navikt/ds-react';
import './ingen-gjeldende-vedtak-panel.css';

export function IngenGjeldendeVedtakPanel() {
	return (
		<HovedsidePanel className="ingen-gjeldende-vedtak-panel">
			<img src={ingenGjeldendeVedtakBilde} alt="" className="ingen-gjeldende-vedtak-panel__bilde" />
			<Heading size="small" level="2" spacing>
				Ingen gjeldende oppfølgingsvedtak
			</Heading>
			<BodyShort size="small">Denne brukeren er ikke under oppfølging.</BodyShort>
		</HovedsidePanel>
	);
}

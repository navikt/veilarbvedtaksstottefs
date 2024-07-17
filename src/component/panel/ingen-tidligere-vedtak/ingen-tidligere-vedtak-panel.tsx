import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import ingenVedtakBilde from './ingen-vedtak.svg';
import { Heading } from '@navikt/ds-react';
import './ingen-tidligere-vedtak-panel.css';

export function IngenTidligereVedtakPanel() {
	return (
		<HovedsidePanel className="ingen-tidligere-vedtak-panel">
			<img src={ingenVedtakBilde} alt="" className="ingen-tidligere-vedtak-panel__bilde" />
			<Heading size="small" level="2">
				Ingen tidligere vedtak
			</Heading>
		</HovedsidePanel>
	);
}

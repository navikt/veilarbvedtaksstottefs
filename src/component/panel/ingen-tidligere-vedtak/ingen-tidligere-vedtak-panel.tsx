import { HovedsidePanelBox } from '../hovedside-panel/hovedside-panel';
import { FilesIcon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import './ingen-tidligere-vedtak-panel.css';

export function IngenTidligereVedtakPanel() {
	return (
		<HovedsidePanelBox background="sunken" className="ingen-tidligere-vedtak-panel">
			<FilesIcon aria-hidden className="ingen-tidligere-vedtak-panel__bilde" />
			<Heading size="small" level="2">
				Ingen tidligere vedtak
			</Heading>
		</HovedsidePanelBox>
	);
}

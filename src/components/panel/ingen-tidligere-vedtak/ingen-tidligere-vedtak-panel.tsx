import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Panel } from '../panel/panel';
import emptyBox from './empty-box.svg';
import './ingen-tidligere-vedtak-panel.less';

export function IngenTidligereVedtakPanel() {
	return (
		<Panel tittel="Tidligere oppfølgingsvedtak" className="ingen-tidligere-vedtak-panel">
			<section className="ingen-vedtak">
				<img src={emptyBox} alt="Illustrasjon av tom eske" className="ingen-vedtak__bilde" />
				<Undertittel>Ingen tidligere oppfølgingsvedtak</Undertittel>
				<Normaltekst className="ingen-vedtak__forklaring">
					Oppfølgingsvedtak som er fattet i Modia vil bli tilgjengelige her.
				</Normaltekst>
			</section>
		</Panel>
	);
}
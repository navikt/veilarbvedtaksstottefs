import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import ingenVedtakBilde from './ingen-vedtak.svg';
import './ingen-tidligere-vedtak-panel.less';

export function IngenTidligereVedtakPanel() {
	return (
		<section className="ingen-tidligere-vedtak-panel">
			<img src={ingenVedtakBilde} alt="" className="ingen-tidligere-vedtak-panel__bilde"/>
			<Undertittel tag="h1" className="ingen-tidligere-vedtak-panel__tittel">Ingen tidligere vedtak</Undertittel>
			<Normaltekst>Vedtak laget i Arena blir ikke overført til Modia</Normaltekst>
		</section>
	);
}
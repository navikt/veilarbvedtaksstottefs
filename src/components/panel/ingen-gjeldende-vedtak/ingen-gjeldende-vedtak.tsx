import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import ingenGjeldendeVedtakBilde from './ingen_gjeldende_vedtak.svg';
import './ingen-gjeldende-vedtak-panel.less';

export function IngenGjeldendeVedtakPanel() {
    return (
        <HovedsidePanel className="ingen-gjeldende-vedtak-panel">
            <img src={ingenGjeldendeVedtakBilde} alt="" className="ingen-gjeldende-vedtak-panel__bilde"/>
            <Undertittel tag="h1" className="ingen-gjeldende-vedtak-panel__tittel">Ingen gjeldende oppfølgingsvedtak</Undertittel>
            <Normaltekst>Denne bruker er ikke under oppfolging.</Normaltekst>
        </HovedsidePanel>
    );
}
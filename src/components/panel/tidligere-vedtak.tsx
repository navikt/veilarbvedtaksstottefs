import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { VedtakstottePanel } from './veilarbvedtakstotte-panel/vedtakstotte-panel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { TidligereVedtakElement } from './tidligere-vedtak-element';

export function TidligereVedtak(props: {vedtakHistorikk: VedtakData []}) {
    if (props.vedtakHistorikk.length === 0) {
        return (
            <VedtakstottePanel tittel="Tidligare oppfølgingsvedtak" className="tidligere">
                <div className="vedtakstottepanel__content">
                    <Undertittel>Ingen tidligare oppfolgingsvedtak</Undertittel>
                    <Normaltekst>Denne brukeren har ingen tidligare oppfølgingsvedtak (§ 14a)</Normaltekst>
                </div>
            </VedtakstottePanel>
        );
    }

    return (
        <VedtakstottePanel tittel="Tidligare oppfølgingsvedtak" className="tidligere vedtakstottepanel--historisk">
            <ul>
            {props.vedtakHistorikk.map(tidligereVedtak =>
                <TidligereVedtakElement
                    key={tidligereVedtak.sistOppdatert}
                    sistOppdatert={tidligereVedtak.sistOppdatert}
                    innsatsgruppe={tidligereVedtak.innsatsgruppe}
                />
            )}
            </ul>
        </VedtakstottePanel>
    );
}
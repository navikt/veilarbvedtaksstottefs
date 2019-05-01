import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { VedtakstottePanel } from './vedtakstotte-panel';
import { Element, Normaltekst, Undertittel} from 'nav-frontend-typografi';

export function Historikk(props: {vedtakHistorikk: VedtakData []}) {
    return (
        <VedtakstottePanel tittel="Tidligare oppfølgingsvedtak">
            <Undertittel>Ingen tidligare oppfolgingsvedtak</Undertittel>
            <Normaltekst>Denne brukeren har ingen tidligare oppfølgingsvedtak (§ 14a)</Normaltekst>
        </VedtakstottePanel>
   );
}
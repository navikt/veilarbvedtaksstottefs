import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { VedtakstottePanel } from './veilarbvedtakstotte-panel/vedtakstotte-panel';
import { Element, Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import './tidligere-vedtak-liste.less';
import { getInnsatsgruppeNavn } from '../skjema/innsatsgruppe/innsatsgruppe';
import { HoyreChevron } from 'nav-frontend-chevron';

export function TidligereVedtakListe(props: {vedtakHistorikk: VedtakData []}) {
    if (props.vedtakHistorikk.length === 0) {
        return (
            <VedtakstottePanel tittel="Tidligere oppfølgingsvedtak" className="tidligere">
                <div className="vedtakstottepanel__content">
                    <Undertittel>Ingen tidligere oppfølgingsvedtak</Undertittel>
                    <Normaltekst>Denne brukeren har ingen tidligere oppfølgingsvedtak (§ 14a)</Normaltekst>
                </div>
            </VedtakstottePanel>
        );
    }

    return (
        <VedtakstottePanel tittel="Tidligere oppfølgingsvedtak" className="tidligere vedtakstottepanel--historisk">
            <ul className="vedtak-historikk-liste">
                {props.vedtakHistorikk.map((tidligereVedtak, idx) =>
                    <TidligereVedtak
                        key={idx}
                        tidligereVedtak={tidligereVedtak}
                    />
                )}
            </ul>
        </VedtakstottePanel>
    );
}

function handleTidligereVedtakClicked(tidligereVedtak: VedtakData) {
    alert(tidligereVedtak.id);
}

function TidligereVedtak (props: {tidligereVedtak: VedtakData}) {
    const tidligereVedtak = props.tidligereVedtak;
    const innsatsgruppe = getInnsatsgruppeNavn(tidligereVedtak.innsatsgruppe);
    return (
        <li className="vedtak-historikk-liste__item" onClick={() => handleTidligereVedtakClicked(tidligereVedtak)}>
            <div className="tidligere-vedtak">
                <div>
                    <Element>Oppfølgingvedtak: {innsatsgruppe}</Element>
                    <Undertekst>
                        <span className="label">Sendt:</span>{tidligereVedtak.sistOppdatert}
                    </Undertekst>
                </div>
                <HoyreChevron className="tidligere-vedtak__chevron"/>
            </div>
        </li>
    );
}

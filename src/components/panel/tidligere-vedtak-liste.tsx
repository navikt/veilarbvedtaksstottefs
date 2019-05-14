import React, { useContext } from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { VedtakstottePanel } from './veilarbvedtakstotte-panel/vedtakstotte-panel';
import { Element, Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { getInnsatsgruppeNavn } from '../skjema/innsatsgruppe/innsatsgruppe';
import { HoyreChevron } from 'nav-frontend-chevron';
import { formatDate } from '../../utils/date-utils';
import './tidligere-vedtak-liste.less';
import { ViewDispatch } from '../app-provider/app-provider';
import { ActionType } from '../viewcontroller/view-reducer';

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

function handleTidligereVedtakClicked(dispatch: any, tidligereVedtak: VedtakData) {
    dispatch({view: ActionType.VIS_VEDTAK, props: {id: tidligereVedtak.id}});
}

function TidligereVedtak (props: {tidligereVedtak: VedtakData}) {
    const {dispatch} = useContext(ViewDispatch);
    const tidligereVedtak = props.tidligereVedtak;
    const innsatsgruppe = getInnsatsgruppeNavn(tidligereVedtak.innsatsgruppe);
    return (
        <li className="vedtak-historikk-liste__item" onClick={() => handleTidligereVedtakClicked(dispatch, tidligereVedtak)}>
            <div className="tidligere-vedtak">
                <div>
                    <Element>Oppfølgingvedtak: {innsatsgruppe}</Element>
                    <Undertekst>
                        <span className="label">Sendt:</span>{formatDate(tidligereVedtak.sistOppdatert)}
                    </Undertekst>
                </div>
                <HoyreChevron className="tidligere-vedtak__chevron"/>
            </div>
        </li>
    );
}

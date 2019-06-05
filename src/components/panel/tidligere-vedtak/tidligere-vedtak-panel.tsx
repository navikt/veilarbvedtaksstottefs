import React, { useContext } from 'react';
import { VedtakData } from '../../../utils/types/vedtak';
import { Panel } from '../panel/panel';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { getInnsatsgruppeNavn } from '../../skjema/innsatsgruppe/innsatsgruppe';
import { HoyreChevron } from 'nav-frontend-chevron';
import { ViewDispatch } from '../../providers/view-provider';
import { ActionType } from '../../viewcontroller/view-reducer';
import { Dato } from '../dato';
import { Veileder } from '../veileder';
import emptyBox from './empty-box.svg';
import './tidligere-vedtak-panel.less';

export function TidligereVedtakPanel(props: {vedtakHistorikk: VedtakData[]}) {
    if (props.vedtakHistorikk.length === 0) {
        return <IngenTidligereVedtak/>;
    }

    return <HarTidligereVedtak vedtakHistorikk={props.vedtakHistorikk}/>;
}

function IngenTidligereVedtak() {
    return (
        <Panel tittel="Tidligere oppfølgingsvedtak" className="ingen-tidligere-vedtak-panel">
            <section className="ingen-vedtak">
                <img src={emptyBox} alt="Illustrasjon av tom eske" className="ingen-vedtak__bilde"/>
                <Undertittel>Ingen tidligere oppfølgingsvedtak</Undertittel>
                <Normaltekst className="ingen-vedtak__forklaring">
                    Tidligere oppfølgingsvedtak (§ 14a) i ny løsning vil være tilgjengelig her
                </Normaltekst>
            </section>
        </Panel>
    );
}

function HarTidligereVedtak({vedtakHistorikk}: {vedtakHistorikk: VedtakData []}) {
    return (
        <Panel tittel="Tidligere oppfølgingsvedtak" className="tidligere-vedtak-panel">
            <ul className="vedtak-historikk-liste">
                {vedtakHistorikk.map((tidligereVedtak, idx) =>
                    <TidligereVedtak
                        key={idx}
                        tidligereVedtak={tidligereVedtak}
                    />
                )}
            </ul>
        </Panel>
    );
}

function TidligereVedtak(props: {tidligereVedtak: VedtakData}) {
    const {dispatch} = useContext(ViewDispatch);
    const tidligereVedtak = props.tidligereVedtak;
    const innsatsgruppe = getInnsatsgruppeNavn(tidligereVedtak.innsatsgruppe);
    return (
        <li className="vedtak-historikk-liste__item" onClick={() => handleTidligereVedtakClicked(dispatch, tidligereVedtak)}>
            <div className="tidligere-vedtak">
                <div>
                    <Element>Oppfølgingvedtak: {innsatsgruppe}</Element>
                    <Dato sistOppdatert={tidligereVedtak.sistOppdatert} formatType="short" text="Dato"/>
                    <Veileder enhetId={tidligereVedtak.veilederEnhetId} ident={tidligereVedtak.veilederIdent} text="Fattet av"/>
                </div>
                <HoyreChevron className="tidligere-vedtak__chevron"/>
            </div>
        </li>
    );
}

function handleTidligereVedtakClicked(dispatch: any, tidligereVedtak: VedtakData) {
    dispatch({view: ActionType.VIS_VEDTAK, props: {id: tidligereVedtak.id}});
}

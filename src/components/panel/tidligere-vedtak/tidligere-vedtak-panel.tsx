import React, { useContext } from 'react';
import cls from 'classnames';
import { VedtakData } from '../../../rest/data/vedtak';
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
import { logMetrikk } from '../../../utils/frontend-logger';

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
    const harToVedtak = vedtakHistorikk.length === 2;
    return (
        <Panel
            tittel="Tidligere oppfølgingsvedtak"
            className={cls("tidligere-vedtak-panel", {"to-tidligere-vedtak": harToVedtak })}
        >
            <ul className="vedtak-historikk-liste">
                {vedtakHistorikk.map((tidligereVedtak, idx) =>
                    <TidligereVedtak
                        key={idx}
                        tidligereVedtak={tidligereVedtak}
                        index={idx}
                    />
                )}
            </ul>
        </Panel>
    );
}

function TidligereVedtak(props: {tidligereVedtak: VedtakData, index: number}) {
    const {dispatch} = useContext(ViewDispatch);
    const tidligereVedtak = props.tidligereVedtak;
    const innsatsgruppe = getInnsatsgruppeNavn(tidligereVedtak.innsatsgruppe);
    const id = "tidligere-vedtak-" + props.index;
    return (
        <li className="vedtak-historikk-liste__item">
            <button
                aria-describedby={id}
                className="tidligere-vedtak knapp__no-style"
                onClick={() => handleTidligereVedtakClicked(dispatch, tidligereVedtak, props.index)}
            >
                <div className="tidligere-vedtak__innhold">
                    <div id={id}>
                        <Element className="blokk-xxs">{innsatsgruppe}</Element>
                        <Dato sistOppdatert={tidligereVedtak.sistOppdatert} formatType="short" text="Dato"/>
                        <Veileder
                            enhetId={tidligereVedtak.veilederEnhetId}
                            ident={tidligereVedtak.veilederIdent}
                            enhetNavn={tidligereVedtak.veilederEnhetNavn}
                            text="Fattet av"
                        />
                    </div>
                    <HoyreChevron className="tidligere-vedtak__chevron"/>
                </div>
            </button>
        </li>
    );
}

function handleTidligereVedtakClicked(dispatch: any, tidligereVedtak: VedtakData, index: number) {
    dispatch({view: ActionType.VIS_VEDTAK, props: {id: tidligereVedtak.id}});
    logMetrikk('vis-tidligere-vedtak', { index });
}

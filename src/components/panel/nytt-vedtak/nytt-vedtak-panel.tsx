import { useContext } from 'react';
import { ActionType } from '../../viewcontroller/view-reducer';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { VedtakData } from '../../../utils/types/vedtak';
import { Hovedknapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../../utils/types/ornothing';
import { ViewDispatch } from '../../providers/view-provider';
import VedtaksstotteApi from '../../../api/vedtaksstotte-api';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import leggTilVedtakBilde from './legg-til-vedtak.svg';
import './nytt-vedtak-panel.less';
import { useFetchState } from '../../providers/fetch-provider';
import { logMetrikk } from '../../../utils/frontend-logger';
import { Status } from '../../../utils/fetch-utils';
import { fetchData } from '../../../utils/hooks/useFetch';

export function NyttVedtakPanel(props: {utkast: OrNothing<VedtakData>, gjeldendeVedtak: OrNothing<VedtakData>, fnr: string}) {
    const [underOppfolgingData] = useFetchState('underOppfolging');
    const [vedtak, setVedtak] = useFetchState('vedtak');
    const {dispatch} = useContext(ViewDispatch);
    const { utkast, gjeldendeVedtak, fnr } = props;

    if (utkast || !underOppfolgingData.data.underOppfolging) {
        return null;
    }

    if (gjeldendeVedtak) {
        return <NyttVedtakHarGjeldende fnr={fnr} dispatch={dispatch} setVedtak={setVedtak}/>;
    } else {
        return <NyttVedtakIngenGjeldende fnr={props.fnr} dispatch={dispatch} setVedtak={setVedtak}/>;
    }
}

type NyttVedtakProps = {fnr: string, dispatch: Function, setVedtak: Function};

function NyttVedtakIngenGjeldende({fnr, dispatch, setVedtak}: NyttVedtakProps) {
    return (
        <VedtaksstottePanel
            tittel="Gjeldende oppfølgingsvedtak"
            undertittel="Ingen gjeldende oppfølgingsvedtak"
            imgSrc={leggTilVedtakBilde}
            panelKlasse="nytt-vedtak-panel"
            tekstKomponent={
                <Normaltekst>Denne brukeren har ingen gjeldende oppfølgingsvedtak</Normaltekst>
            }
            knappKomponent={
                <Hovedknapp onClick={() => lagNyttVedtakUtkastOgRedirectTilUtkast(fnr, dispatch, setVedtak)}>
                    Lag nytt vedtak
                </Hovedknapp>
            }
        />
    );
}

function NyttVedtakHarGjeldende({fnr, dispatch, setVedtak}: NyttVedtakProps) {
    return (
        <VedtaksstottePanel
            tittel="Lag nytt oppfølgingsvedtak"
            undertittel="Lag nytt vedtak"
            imgSrc={leggTilVedtakBilde}
            panelKlasse="nytt-vedtak-panel"
            tekstKomponent={
                <Normaltekst>Her kan du lage nytt oppfølgingsvedtak for denne brukeren.</Normaltekst>
            }
            knappKomponent={
                <Hovedknapp onClick={() => lagNyttVedtakUtkastOgRedirectTilUtkast(fnr, dispatch, setVedtak)}>
                    Lag nytt vedtak
                </Hovedknapp>
            }
        />
    );
}

function lagNyttVedtakUtkastOgRedirectTilUtkast(fnr: string, dispatch: Function, setVedtak: Function) {
    VedtaksstotteApi.lagNyttVedtakUtkast(fnr).then(() => {
        fetchData(VedtaksstotteApi.lagHentVedtakConfig(fnr), setVedtak).then(() => {
            dispatch({view: ActionType.UTKAST});
        });
    });
    logMetrikk('lag-nytt-vedtak');
}

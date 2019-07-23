import { useContext } from 'react';
import { ActionType } from '../../viewcontroller/view-reducer';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { VedtakData } from '../../../rest/data/vedtak';
import { Hovedknapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../../utils/types/ornothing';
import { ViewDispatch } from '../../providers/view-provider';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import leggTilVedtakBilde from './legg-til-vedtak.svg';
import './nytt-vedtak-panel.less';
import { logMetrikk } from '../../../utils/frontend-logger';
import { useFetchStoreContext } from '../../../stores/fetch-store';
import { fetchWithInfo } from '../../../rest/utils';
import { FnrFetchParams, lagNyttVedtakUtkastFetchInfo } from '../../../rest/api';
import { Fetch } from '../../../rest/use-fetch';

export function NyttVedtakPanel(props: {utkast: OrNothing<VedtakData>, gjeldendeVedtak: OrNothing<VedtakData>, fnr: string}) {
    const { underOppfolging } = useFetchStoreContext();
    const {dispatch} = useContext(ViewDispatch);
    const { utkast, gjeldendeVedtak, fnr } = props;

    if (utkast || !underOppfolging.data.underOppfolging) {
        return null;
    }

    // TODO: FIX setVedtak
    if (gjeldendeVedtak) {
        return <NyttVedtakHarGjeldende fnr={fnr} dispatch={dispatch}/>;
    } else {
        return <NyttVedtakIngenGjeldende fnr={props.fnr} dispatch={dispatch}/>;
    }
}

type NyttVedtakProps = {fnr: string, dispatch: Function};

function NyttVedtakIngenGjeldende({fnr, dispatch}: NyttVedtakProps) {
    const { vedtak } = useFetchStoreContext();
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
                <Hovedknapp onClick={() => lagNyttVedtakUtkastOgRedirectTilUtkast(fnr, dispatch, vedtak)}>
                    Lag nytt vedtak
                </Hovedknapp>
            }
        />
    );
}

function NyttVedtakHarGjeldende({fnr, dispatch}: NyttVedtakProps) {
    const { vedtak } = useFetchStoreContext();
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
                <Hovedknapp onClick={() => lagNyttVedtakUtkastOgRedirectTilUtkast(fnr, dispatch, vedtak)}>
                    Lag nytt vedtak
                </Hovedknapp>
            }
        />
    );
}

function lagNyttVedtakUtkastOgRedirectTilUtkast(fnr: string, dispatch: Function, vedtak: Fetch<VedtakData[], FnrFetchParams>) {
    fetchWithInfo(lagNyttVedtakUtkastFetchInfo({ fnr }))
        .then(() => {
            vedtak.fetch({ fnr }, () => {
                dispatch({view: ActionType.UTKAST});
            });
        });

    logMetrikk('lag-nytt-vedtak');
}

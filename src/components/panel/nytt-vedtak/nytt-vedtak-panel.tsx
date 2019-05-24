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
import ingenVedtakBilde from './ingen_vedtak.svg';
import './nytt-vedtak-panel.less';

export function NyttVedtakPanel(props: {utkast: OrNothing<VedtakData>, gjeldendeVedtak: OrNothing<VedtakData>, fnr: string}) {
    const {dispatch} = useContext(ViewDispatch);
    const { utkast, gjeldendeVedtak, fnr } = props;

    if (utkast) {
        return null;
    }

    if (gjeldendeVedtak) {
        return <NyttVedtakHarGjeldende fnr={fnr} dispatch={dispatch}/>;
    } else {
        return <NyttVedtakIngenGjeldende fnr={props.fnr} dispatch={dispatch}/>;
    }
}

type NyttVedtakProps = {fnr: string, dispatch: Function};

function NyttVedtakIngenGjeldende({fnr, dispatch}: NyttVedtakProps) {
    return (
        <VedtaksstottePanel
            tittel="Gjeldende oppfølgingsvedtak"
            undertittel="Ingen gjeldende oppfølgingsvedtak"
            imgSrc={ingenVedtakBilde}
            panelKlasse="nytt-vedtak-panel"
            tekstKomponent={
                <Normaltekst>Denne brukeren har ingen gjeldende oppfølgingsvedtak (§ 14a) som er gjeldende.</Normaltekst>
            }
            knappKomponent={
                <Hovedknapp onClick={() => lagNyttVedtakUtkastOgRedirectTilUtkast(fnr, dispatch)}>
                    Lag nytt vedtak
                </Hovedknapp>
            }
        />
    );
}

function NyttVedtakHarGjeldende({fnr, dispatch}: NyttVedtakProps) {
    return (
        <VedtaksstottePanel
            tittel="Lag nytt oppfølgingsvedtak"
            undertittel="Lag nytt vedtak"
            imgSrc={ingenVedtakBilde}
            panelKlasse="nytt-vedtak-panel"
            tekstKomponent={
                <Normaltekst>Her kan du lage nytt oppfølgingsvedtak for denne brukeren.</Normaltekst>
            }
            knappKomponent={
                <Hovedknapp onClick={() => lagNyttVedtakUtkastOgRedirectTilUtkast(fnr, dispatch)}>
                    Lag nytt vedtak
                </Hovedknapp>
            }
        />
    );
}

function lagNyttVedtakUtkastOgRedirectTilUtkast(fnr: string, dispatch: Function) {
    VedtaksstotteApi.lagNyttVedtakUtkast(fnr).then(() => dispatch({view: ActionType.UTKAST}));
}

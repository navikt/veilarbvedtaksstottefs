import { useContext } from 'react';
import { ViewDispatch } from '../viewcontroller/view-controller';
import PanelBase from 'nav-frontend-paneler';
import { ActionType } from '../viewcontroller/view-reducer';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';

export function GjeldeneVedtakk(props: {gjeldeneVedtak: VedtakData}) {
    if (!props.gjeldeneVedtak) {
        return null;
    }

    const {dispatch} = useContext(ViewDispatch);

    return (
        <PanelBase border={true}>
            <button className="panel--knapp" onClick={() => dispatch({view: ActionType.GJELDENE_VEDTAK})}>
                <div>
                    <Systemtittel>Vedtakk</Systemtittel>
                    <Normaltekst> Lite tekst om utkast</Normaltekst>
                </div>
            </button>
        </PanelBase>
    );
}
import React, { useContext } from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import PanelBase from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { OrNothing } from '../../utils/types/ornothing';
import './panel.less';
import { ViewDispatch } from '../viewcontroller/view-controller';
import { ActionType } from '../viewcontroller/view-reducer';

export function Utkast(props: {utkast: OrNothing<VedtakData>}) {
    const {dispatch} = useContext(ViewDispatch);

    return (
        <PanelBase border={true}>
            <button className="panel--knapp" onClick={() => dispatch({view: ActionType.UTKAST})}>
                {props.utkast
                    ? <div>
                        <Systemtittel>Utkast</Systemtittel>
                        <Normaltekst> Lite tekst om utkast</Normaltekst>
                    </div>
                    : <Normaltekst> Lag nytt vedtak</Normaltekst>
                }
            </button>
        </PanelBase>
    );
}
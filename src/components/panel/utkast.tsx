import React, { useContext } from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { OrNothing } from '../../utils/types/ornothing';
import './veilarbvedtakstotte-panel/panel.less';
import { ViewDispatch } from '../viewcontroller/view-controller';
import { VedtakstottePanel } from './veilarbvedtakstotte-panel/vedtakstotte-panel';
import { SistEndret } from './sist-endret';
import { EndretAv } from './endret-av';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ActionType } from '../viewcontroller/view-reducer';
import { ReactComponent as UtkastIkon } from './utkast.svg';

export function Utkast(props: {utkast: OrNothing<VedtakData>}) {
    const {dispatch} = useContext(ViewDispatch);

    if (!props.utkast) {
        return null;
    }
    return (
        <VedtakstottePanel tittel="Utkast til oppfølgingsvedtak" className="utkast">
            <div className="vedtakstottepanel__content">
                <UtkastIkon className="vedtakstottepanel__ikon"/>
                <div>
                    <Undertittel>Utkast</Undertittel>
                    <Normaltekst>Her kommer det tekst at det er påbygynt vedtak</Normaltekst>
                    <SistEndret sistOppdatert={props.utkast.sistOppdatert}/>
                    <EndretAv veilederEnhetId={props.utkast.veilederEnhetId} veilederIdent={props.utkast.veilederIdent}/>
                    <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Endre</Hovedknapp>
                </div>
            </div>
        </VedtakstottePanel>
    );
}
import React, { useContext } from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { OrNothing } from '../../utils/types/ornothing';
import './veilarbvedtakstotte-panel/panel.less';
import { VedtakstottePanel } from './veilarbvedtakstotte-panel/vedtakstotte-panel';
import { Dato } from './dato';
import { Veileder } from './veileder';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ActionType } from '../viewcontroller/view-reducer';
import { ReactComponent as UtkastIkon } from './utkast.svg';
import { ViewDispatch } from '../app-provider/app-provider';

export function Utkast(props: {utkast: OrNothing<VedtakData>}) {
    const {dispatch} = useContext(ViewDispatch);

    if (!props.utkast) {
        return null;
    }

    const { sistOppdatert, veilederIdent, veilederEnhetId} = props.utkast;

    return (
        <VedtakstottePanel tittel="Utkast til oppfølgingsvedtak" className="utkast">
            <div className="vedtakstottepanel__content">
                <UtkastIkon className="vedtakstottepanel__ikon"/>
                <div>
                    <Undertittel>Utkast</Undertittel>
                    <Normaltekst>Her kommer det tekst at det er påbygynt vedtak</Normaltekst>
                    <Dato sistOppdatert={sistOppdatert} formatType="long" text="Sist endret"/>
                    <Veileder enhetId={veilederEnhetId} ident={veilederIdent} text="Endret av"/>
                    <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Fortsett</Hovedknapp>
                </div>
            </div>
        </VedtakstottePanel>
    );
}

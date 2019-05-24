import React, { useContext } from 'react';
import { VedtakData } from '../../../utils/types/vedtak';
import { OrNothing } from '../../../utils/types/ornothing';
import { Dato } from '../dato';
import { Veileder } from '../veileder';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ActionType } from '../../viewcontroller/view-reducer';
import utkastIkon from './utkast.svg';
import { ViewDispatch } from '../../providers/view-provider';
import './utkast-panel.less';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';

export function UtkastPanel(props: { utkast: OrNothing<VedtakData> }) {
    const {dispatch} = useContext(ViewDispatch);

    if (!props.utkast) {
        return null;
    }

    const {sistOppdatert, veilederIdent, veilederEnhetId} = props.utkast;

    return (
        <VedtaksstottePanel
            tittel="Utkast til oppfølgingsvedtak"
            undertittel="Utkast til oppfølgingsvedtak"
            imgSrc={utkastIkon}
            panelKlasse="utkast-panel"
            tekstKomponent={
                <>
                    <Dato sistOppdatert={sistOppdatert} formatType="long" text="Sist endret"/>
                    <Veileder enhetId={veilederEnhetId} ident={veilederIdent} text="Endret av"/>
                </>
            }
            knappKomponent={
                <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Fortsett</Hovedknapp>
            }
        />
    );
}

import { useContext } from 'react';
import { ActionType } from '../../viewcontroller/view-reducer';
import React from 'react';
import { VedtakData } from '../../../utils/types/vedtak';
import { Dato } from '../dato';
import { Knapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../../utils/types/ornothing';
import { getInnsatsgruppeNavn } from '../../skjema/innsatsgruppe/innsatsgruppe';
import { ViewDispatch } from '../../providers/view-provider';
import { Veileder } from '../veileder';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import fullfortVedtakIcon from './fullfort.svg';
import './gjeldende-vedtak-panel.less';

export function GjeldendeVedtak(props: { gjeldendeVedtak: OrNothing<VedtakData> }) {

    if (!props.gjeldendeVedtak) {
        return null;
    }

    const {dispatch} = useContext(ViewDispatch);
    const {id, innsatsgruppe, sistOppdatert, veilederEnhetId, veilederIdent} = props.gjeldendeVedtak;
    const innsatsgruppeNavn = getInnsatsgruppeNavn(innsatsgruppe);

    return (
        <VedtaksstottePanel
            tittel="Gjeldende oppfølgingsvedtak"
            undertittel={innsatsgruppeNavn ? innsatsgruppeNavn : ''}
            imgSrc={fullfortVedtakIcon}
            panelKlasse="gjeldende-vedtak-panel"
            tekstKomponent={
                <>
                    <Dato sistOppdatert={sistOppdatert} formatType="short" text="Dato"/>
                    <Veileder
                        text="Fattet av"
                        ident={veilederIdent}
                        enhetId={veilederEnhetId}
                    />
                </>
            }
            knappKomponent={
                <Knapp onClick={() => dispatch({view: ActionType.VIS_VEDTAK, props: {id}})}>Vis vedtak</Knapp>
            }
        />
    );
}

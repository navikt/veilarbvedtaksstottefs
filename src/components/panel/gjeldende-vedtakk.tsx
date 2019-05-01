import { useContext } from 'react';
import { ViewDispatch } from '../viewcontroller/view-controller';
import { ActionType } from '../viewcontroller/view-reducer';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { VedtakstottePanel } from './vedtakstotte-panel';
import { SistEndret } from './sist-endret';
import { EndretAv } from './endret-av';
import { Hovedknapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../utils/types/ornothing';
import { innsatsgrupper } from '../skjema/innsatsgruppe/innsatsgruppe';

export function GjeldendeVedtakk(props: {gjeldendeVedtak: OrNothing<VedtakData>}) {
    const {dispatch} = useContext(ViewDispatch);

    if (!props.gjeldendeVedtak) {
        return (
            <VedtakstottePanel tittel="Gjeldende oppfølgingsvedtak">
                <Undertittel>Ingen tidligare oppfolgingsvedtak</Undertittel>
                <Normaltekst>Denne brukeren har ingen tidligare oppfølgingsvedtak (§ 14a)</Normaltekst>
                <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Lag nytt vedtak</Hovedknapp>
            </VedtakstottePanel>
        );
    }

    const gjeldendeVedtak =  props.gjeldendeVedtak;
    const innsatsgruppe = innsatsgrupper.find(i => i.value === gjeldendeVedtak.innsatsgruppe);

    return (
        <VedtakstottePanel tittel="Gjeldende oppfølgingsvedtak" className="vedtakstottepanel--gron">
            <Undertittel>{innsatsgruppe && innsatsgruppe.label}</Undertittel>
            <Normaltekst>Her kommer det tekst at det er påbygynt vedtak</Normaltekst>
            <SistEndret sistOppdatert={props.gjeldendeVedtak.sistOppdatert}/>
            <EndretAv endretAv={props.gjeldendeVedtak.veileder}/>
            <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Lag nytt vedtak</Hovedknapp>
        </VedtakstottePanel>
    );
}
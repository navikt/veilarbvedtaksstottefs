import { useContext } from 'react';
import { ViewDispatch } from '../viewcontroller/view-controller';
import { ActionType } from '../viewcontroller/view-reducer';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { VedtakstottePanel } from './veilarbvedtakstotte-panel/vedtakstotte-panel';
import { SistEndret } from './sist-endret';
import { EndretAv } from './endret-av';
import { Hovedknapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../utils/types/ornothing';
import { innsatsgrupper } from '../skjema/innsatsgruppe/innsatsgruppe';

export function GjeldendeVedtak(props: {gjeldendeVedtak: OrNothing<VedtakData>, utkast: OrNothing<VedtakData>}) {
    const {dispatch} = useContext(ViewDispatch);

    if (!props.gjeldendeVedtak && props.utkast) {
        return null;
    }

    if (!props.gjeldendeVedtak) {
        return (
            <VedtakstottePanel tittel="Gjeldende oppfølgingsvedtak">
                <div className="vedtakstottepanel__content">
                    <Undertittel>Ingen tidligare oppfolgingsvedtak</Undertittel>
                    <Normaltekst>Denne brukeren har ingen tidligare oppfølgingsvedtak (§ 14a)</Normaltekst>
                    <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Lag nytt vedtak</Hovedknapp>
                </div>
            </VedtakstottePanel>
        );
    }

    const gjeldendeVedtak =  props.gjeldendeVedtak;
    const innsatsgruppe = innsatsgrupper.find(i => i.value === gjeldendeVedtak.innsatsgruppe);

    return (
        <VedtakstottePanel tittel="Gjeldende oppfølgingsvedtak" className="vedtakstottepanel--gron">
            <div className="vedtakstottepanel__content">
                <Undertittel>{innsatsgruppe && innsatsgruppe.label}</Undertittel>
                <Normaltekst>Her kommer det tekst at det er påbygynt vedtak</Normaltekst>
                <SistEndret sistOppdatert={props.gjeldendeVedtak.sistOppdatert}/>
                <EndretAv endretAv={props.gjeldendeVedtak.veileder}/>
                <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Lag nytt vedtak</Hovedknapp>
            </div>
        </VedtakstottePanel>
    );
}
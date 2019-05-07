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
import { getInnsatsgruppeNavn } from '../skjema/innsatsgruppe/innsatsgruppe';
import { ReactComponent as IngenVedtakIcon } from './ingen_vedtak.svg';
import { ReactComponent as FullfortVedtakIcon } from './fullfort.svg';

const BEGRUNNELSE_MAX_LENGTH = 100;

export function GjeldendeVedtak(props: {gjeldendeVedtak: OrNothing<VedtakData>, utkast: OrNothing<VedtakData>}) {
    const {dispatch} = useContext(ViewDispatch);

    if (!props.gjeldendeVedtak && props.utkast) {
        return null;
    }

    if (!props.gjeldendeVedtak) {
        return (
            <VedtakstottePanel tittel="Gjeldende oppfølgingsvedtak" className="gjeldende vedtakstottepanel--orange">
                <div className="vedtakstottepanel__content">
                    <IngenVedtakIcon className="vedtakstottepanel__ikon"/>
                    <div>
                        <Undertittel>Ingen tidligare oppfolgingsvedtak</Undertittel>
                        <Normaltekst>Denne brukeren har ingen gjeldende oppfølgingsvedtak (§ 14a)</Normaltekst>
                        <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Lag nytt vedtak</Hovedknapp>
                    </div>
                </div>
            </VedtakstottePanel>
        );
    }

    const gjeldendeVedtak =  props.gjeldendeVedtak;
    const innsatsgruppe = getInnsatsgruppeNavn(gjeldendeVedtak.innsatsgruppe);
    const begrunnelseTekst = gjeldendeVedtak.begrunnelse.length > BEGRUNNELSE_MAX_LENGTH
        ? `${gjeldendeVedtak.begrunnelse.substring(0, BEGRUNNELSE_MAX_LENGTH)}... `
        : `${gjeldendeVedtak.begrunnelse} `;

    return (
        <VedtakstottePanel tittel="Gjeldende oppfølgingsvedtak" className="gjeldende vedtakstottepanel--gron">
            <div className="vedtakstottepanel__content">
                <FullfortVedtakIcon className="vedtakstottepanel__ikon"/>
                <div>
                    <Undertittel>{innsatsgruppe}</Undertittel>
                    <Normaltekst>{begrunnelseTekst}</Normaltekst>
                    <SistEndret sistOppdatert={gjeldendeVedtak.sistOppdatert}/>
                    <EndretAv endretAv={gjeldendeVedtak.veileder}/>
                    {!props.utkast &&
                        <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Lag nytt vedtak</Hovedknapp>
                    }
                </div>
            </div>
        </VedtakstottePanel>
    );
}

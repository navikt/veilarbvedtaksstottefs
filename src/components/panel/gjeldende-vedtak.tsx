import { useContext } from 'react';
import { ActionType } from '../viewcontroller/view-reducer';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { VedtakstottePanel } from './veilarbvedtakstotte-panel/vedtakstotte-panel';
import { Dato } from './dato';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../utils/types/ornothing';
import { getInnsatsgruppeNavn } from '../skjema/innsatsgruppe/innsatsgruppe';
import { ReactComponent as IngenVedtakIcon } from './ingen_vedtak.svg';
import { ReactComponent as FullfortVedtakIcon } from './fullfort.svg';
import { ViewDispatch } from '../providers/app-provider';
import { Veileder } from './veileder';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';

const BEGRUNNELSE_VISNING_MAX_LENGTH = 100;

export function GjeldendeVedtak(props: {gjeldendeVedtak: OrNothing<VedtakData>, utkast: OrNothing<VedtakData>, fnr: string}) {
    const {dispatch} = useContext(ViewDispatch);

    if (!props.gjeldendeVedtak && props.utkast) {
        return null;
    }

    function lagNyttVedtakUtkastOgRedirectTilUtkast () {
        VedtaksstotteApi.lagNyttVedtakUtkast(props.fnr).then(() => dispatch({view: ActionType.UTKAST}));
    }

    if (!props.gjeldendeVedtak) {
        return (
            <VedtakstottePanel tittel="Gjeldende oppfølgingsvedtak" className="gjeldende vedtakstottepanel--orange">
                <div className="vedtakstottepanel__content">
                    <IngenVedtakIcon className="vedtakstottepanel__ikon"/>
                    <div>
                        <Undertittel>Ingen tidligere oppfølgingsvedtak</Undertittel>
                        <Normaltekst>Denne brukeren har ingen gjeldende oppfølgingsvedtak (§ 14a)</Normaltekst>
                        <Hovedknapp onClick={lagNyttVedtakUtkastOgRedirectTilUtkast}>Lag nytt vedtak</Hovedknapp>
                    </div>
                </div>
            </VedtakstottePanel>
        );
    }

    const { id, innsatsgruppe, sistOppdatert, veilederEnhetId, veilederIdent} =  props.gjeldendeVedtak;

    return (
        <VedtakstottePanel tittel="Gjeldende oppfølgingsvedtak" className="gjeldende vedtakstottepanel--gron">
            <div className="vedtakstottepanel__content">
                <FullfortVedtakIcon className="vedtakstottepanel__ikon"/>
                <div>
                    <Undertittel>{getInnsatsgruppeNavn(innsatsgruppe)}</Undertittel>
                    <Dato sistOppdatert={sistOppdatert} formatType="short" text="Dato"/>
                    <Veileder
                        text="Fattet av"
                        ident={veilederIdent}
                        enhetId={veilederEnhetId}
                    />
                    {!props.utkast &&
                        <Hovedknapp onClick={lagNyttVedtakUtkastOgRedirectTilUtkast}>Lag nytt vedtak</Hovedknapp>
                    }
                    <Knapp onClick={() => dispatch({view: ActionType.VIS_VEDTAK, props: {id}})}>Vis vedtak</Knapp>
                </div>
            </div>
        </VedtakstottePanel>
    );
}

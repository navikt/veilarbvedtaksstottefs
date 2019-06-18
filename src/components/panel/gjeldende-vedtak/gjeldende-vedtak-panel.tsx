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
import { useFetchState } from '../../providers/fetch-provider';
import { Normaltekst } from 'nav-frontend-typografi';
import ingenVedtakBilde from './ingen-vedtak.svg';
import { logMetrikk } from '../../../utils/frontend-logger';

export function GjeldendeVedtakPanel(props: { gjeldendeVedtak: OrNothing<VedtakData> }) {

    const [underOppfolgingData] = useFetchState('underOppfolging');

    if (!underOppfolgingData.data.underOppfolging) {
        return (
            <VedtaksstottePanel
                tittel="Gjeldende oppfølgingsvedtak"
                undertittel="Ingen gjeldende oppfølgingsvedtak"
                imgSrc={ingenVedtakBilde}
                panelKlasse="ikke-under-oppfolging-panel"
                tekstKomponent={
                    <Normaltekst>
                        Denne brukeren er ikke under oppfølging.
                    </Normaltekst>
                }
            />
        );
    } else if (!props.gjeldendeVedtak) {
        return null;
    }

    const {id, innsatsgruppe, sistOppdatert, veilederEnhetId, veilederIdent, veilederEnhetNavn} = props.gjeldendeVedtak;
    const innsatsgruppeNavn = getInnsatsgruppeNavn(innsatsgruppe);
    const {dispatch} = useContext(ViewDispatch);

    const handleVisVedtakClicked = () => {
        dispatch({view: ActionType.VIS_VEDTAK, props: {id}});
        logMetrikk('vis-gjeldende-vedtak');
    };

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
                        enhetNavn={veilederEnhetNavn}
                    />
                </>
            }
            knappKomponent={
                <Knapp onClick={handleVisVedtakClicked}>Vis vedtak</Knapp>
            }
        />
    );
}

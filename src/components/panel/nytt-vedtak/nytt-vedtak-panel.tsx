import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { VedtakData } from '../../../rest/data/vedtak';
import { Hovedknapp } from 'nav-frontend-knapper';
import { OrNothing } from '../../../utils/types/ornothing';
import { VedtaksstottePanel } from '../vedtaksstotte/vedtaksstotte-panel';
import leggTilVedtakBilde from './legg-til-vedtak.svg';
import { frontendlogger } from '../../../utils/frontend-logger';
import { useFetchStore } from '../../../stores/fetch-store';
import { fetchWithInfo } from '../../../rest/utils';
import { lagNyttVedtakUtkastFetchInfo } from '../../../rest/api';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { useAppStore } from '../../../stores/app-store';
import './nytt-vedtak-panel.less';

export function NyttVedtakPanel(props: { utkast: OrNothing<VedtakData>, gjeldendeVedtak: OrNothing<VedtakData> }) {
    const { fnr } = useAppStore();
    const {underOppfolging, vedtak} = useFetchStore();
    const {changeView} = useViewStore();
    const {utkast, gjeldendeVedtak} = props;

    function lagNyttVedtakUtkastOgRedirectTilUtkast() {
        fetchWithInfo(lagNyttVedtakUtkastFetchInfo({ fnr }))
            .then(() => {
                vedtak.fetch({ fnr }, () => {
                    changeView(ViewType.UTKAST);
                });
            });

        frontendlogger.logMetrikk('lag-nytt-vedtak');
    }

    if (utkast || !underOppfolging.data.underOppfolging) {
        return null;
    }

    let tittel;
    let undertittel;
    let tekst;

    if (gjeldendeVedtak) {
        tittel = 'Lag nytt oppfølgingsvedtak';
        undertittel = 'Lag nytt vedtak';
        tekst = 'Her kan du lage nytt oppfølgingsvedtak for denne brukeren';
    } else {
        tittel = 'Gjeldende oppfølgingsvedtak';
        undertittel = 'Ingen gjeldende oppfølgingsvedtak';
        tekst = 'Denne brukeren har ingen gjeldende oppfølgingsvedtak';
    }

    return (
        <VedtaksstottePanel
            tittel={tittel}
            undertittel={undertittel}
            imgSrc={leggTilVedtakBilde}
            panelKlasse="nytt-vedtak-panel"
            tekstKomponent={
                <Normaltekst>{tekst}</Normaltekst>
            }
            knappKomponent={
                <Hovedknapp onClick={lagNyttVedtakUtkastOgRedirectTilUtkast}>
                    Lag nytt vedtak
                </Hovedknapp>
            }
        />
    );

}

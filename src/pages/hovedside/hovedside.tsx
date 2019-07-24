import React from 'react';
import { TidligereVedtakPanel } from '../../components/panel/tidligere-vedtak/tidligere-vedtak-panel';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { VedtakData } from '../../rest/data/vedtak';
import { GjeldendeVedtakPanel } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import Page from '../page/page';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { OrNothing } from '../../utils/types/ornothing';
import { VEDTAK_I_GOSYS_TOGGLE } from '../../rest/data/features';
import { useFetchStore } from '../../stores/fetch-store';
import { useAppStore } from '../../stores/app-store';
import './hovedside.less';

export function Hovedside() {
    const {vedtak, features} = useFetchStore();

    const gjeldendeVedtak = vedtak.data.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.data.filter((v: VedtakData) => !v.gjeldende && v.vedtakStatus === 'SENDT');
    const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');
    const visAlertrstripefeatureToggle = features.data[VEDTAK_I_GOSYS_TOGGLE];

    return (
        <Page>
            <AlertStripeVedtakIArena
                gjeldendeVedtak={gjeldendeVedtak}
                tidligereVedtak={tidligereVedtak}
                visAlertrstripefeatureToggle={visAlertrstripefeatureToggle}
            />
            <div className="hovedside">
                <div className="vedtak-paneler">
                    <UtkastPanel utkast={utkast}/>
                    <GjeldendeVedtakPanel gjeldendeVedtak={gjeldendeVedtak}/>
                    <NyttVedtakPanel gjeldendeVedtak={gjeldendeVedtak} utkast={utkast}/>
                </div>
                <div>
                    <TidligereVedtakPanel vedtakHistorikk={tidligereVedtak}/>
                </div>
            </div>
        </Page>
    );

}

function AlertStripeVedtakIArena(props: { visAlertrstripefeatureToggle: boolean, gjeldendeVedtak: OrNothing<VedtakData>, tidligereVedtak: VedtakData[] }) {
    if (props.visAlertrstripefeatureToggle && (!props.gjeldendeVedtak && props.tidligereVedtak.length === 0)) {
        return (
            <AlertStripeInfo className="blokk-xs">
                Oppfølgingsvedtak utført i Arena før lansering av ny vedtaksstøtte kan hentes og vises i Gosys.
            </AlertStripeInfo>
        );
    }
    return null;
}

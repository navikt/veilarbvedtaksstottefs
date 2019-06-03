import React from 'react';
import { TidligereVedtakPanel } from '../../components/panel/tidligere-vedtak/tidligere-vedtak-panel';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { VedtakData } from '../../utils/types/vedtak';
import { GjeldendeVedtakPanel } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import { useFetchState } from '../../components/providers/fetch-provider';
import Page from '../page/page';
import './hovedside.less';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { OrNothing } from '../../utils/types/ornothing';
import { VEDTAK_I_GOSYS_TOGGLE } from '../../api/feature-toggle-api';
import { SuksessModalInnsending } from './sukssessmodal-innsending';
import { SuksessModalLagretUtkast } from './suksessmodal-lagret';

export function Hovedside (props: {fnr: string}) {
    const [vedtak] = useFetchState('vedtak');
    const [features, setFeatures] = useFetchState('features');

    const gjeldendeVedtak = vedtak.data.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.data.filter((v: VedtakData) => !v.gjeldende && v.vedtakStatus === 'SENDT');
    const utkast =  vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');
    const visAlertrstripefeatureToggle = features.data[VEDTAK_I_GOSYS_TOGGLE];

    return (
        <>
            <Page>
                <AlertStripeVedtakIArena
                    gjeldendeVedtak={gjeldendeVedtak}
                    tidligereVedtak={tidligereVedtak}
                    visAlertrstripefeatureToggle={visAlertrstripefeatureToggle}
                />
                <div className="hovedside">
                    <UtkastPanel utkast={utkast}/>
                    <GjeldendeVedtakPanel gjeldendeVedtak={gjeldendeVedtak}/>
                    <NyttVedtakPanel gjeldendeVedtak={gjeldendeVedtak} utkast={utkast} fnr={props.fnr}/>
                    <TidligereVedtakPanel vedtakHistorikk={tidligereVedtak}/>
                </div>
            </Page>
            <SuksessModalInnsending/>
            <SuksessModalLagretUtkast/>
        </>
    );

}

function AlertStripeVedtakIArena (props: {visAlertrstripefeatureToggle: boolean, gjeldendeVedtak: OrNothing<VedtakData>, tidligereVedtak: VedtakData[]}) {
    if (props.visAlertrstripefeatureToggle && (!props.gjeldendeVedtak && props.tidligereVedtak.length === 0)) {
        return (
            <AlertStripeInfo className="blokk-xs">
                Oppfølgingsvedtak utført i Arena før lansering av ny vedtaksstøtte kan hentes og vises i Gosys.
            </AlertStripeInfo>
        );
    }
    return null;
}

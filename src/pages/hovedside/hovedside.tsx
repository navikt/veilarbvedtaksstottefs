import React from 'react';
import { TidligereVedtakPanel } from '../../components/panel/tidligere-vedtak/tidligere-vedtak-panel';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { VedtakData } from '../../utils/types/vedtak';
import { GjeldendeVedtakPanel } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import { useFetchState } from '../../components/providers/fetch-provider';
import Page from '../page/page';
import './hovedside.less';

export function Hovedside (props: {fnr: string}) {
    const [vedtak] = useFetchState('vedtak');

    const gjeldendeVedtak = vedtak.data.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.data.filter((v: VedtakData) => !v.gjeldende && v.vedtakStatus === 'SENDT');
    const utkast =  vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');

    return (
        <Page className="hovedside">
            <UtkastPanel utkast={utkast}/>
            <GjeldendeVedtakPanel gjeldendeVedtak={gjeldendeVedtak}/>
            <NyttVedtakPanel gjeldendeVedtak={gjeldendeVedtak} utkast={utkast} fnr={props.fnr}/>
            <TidligereVedtakPanel vedtakHistorikk={tidligereVedtak}/>
        </Page>
    );

}

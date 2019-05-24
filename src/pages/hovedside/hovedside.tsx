import React from 'react';
import { TidligereVedtakPanel } from '../../components/panel/tidligere-vedtak/tidligere-vedtak-panel';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { VedtakData } from '../../utils/types/vedtak';
import { GjeldendeVedtak } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import './hovedside.less';
import { useFetchState } from '../../components/providers/fetch-provider';

export function Hovedside (props: {fnr: string}) {
    const [vedtak] = useFetchState('vedtak');

    const gjeldendeVedtak = vedtak.data.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.data.filter((v: VedtakData) => !v.gjeldende && v.vedtakStatus === 'SENDT');
    const utkast =  vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');

    return (
        <div className="hovedside">
            <GjeldendeVedtak gjeldendeVedtak={gjeldendeVedtak}/>
            <NyttVedtakPanel gjeldendeVedtak={gjeldendeVedtak} utkast={utkast} fnr={props.fnr}/>
            <UtkastPanel utkast={utkast}/>
            <TidligereVedtakPanel vedtakHistorikk={tidligereVedtak}/>
        </div>
    );

}

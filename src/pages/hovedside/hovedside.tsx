import React, { useContext } from 'react';
import { AppContext } from '../../components/app-provider/app-provider';
import { TidligereVedtakPanel } from '../../components/panel/tidligere-vedtak-panel/tidligere-vedtak-panel';
import { Utkast } from '../../components/panel/utkast';
import { VedtakData } from '../../utils/types/vedtak';
import Grid from '../../components/grid/grid';
import { GjeldendeVedtak } from '../../components/panel/gjeldende-vedtak';
import './hovedside.less';

export function Hovedside (props: {fnr: string}) {
    const {vedtak} = useContext(AppContext);

    const gjeldendeVedtak = vedtak.data.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.data.filter((v: VedtakData) => !v.gjeldende && v.vedtakStatus === 'SENDT');
    const utkast =  vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');

    return (
        <Grid columns={2}>
            <Utkast utkast={utkast}/>
            <GjeldendeVedtak gjeldendeVedtak={gjeldendeVedtak} utkast={utkast} fnr={props.fnr}/>
            <TidligereVedtakPanel vedtakHistorikk={tidligereVedtak}/>
        </Grid>
    );

}

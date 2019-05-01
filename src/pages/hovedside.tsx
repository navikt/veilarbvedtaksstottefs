import React, { useContext } from 'react';
import { AppContext } from '../components/app-provider/app-provider';
import { TidligereVedtak } from '../components/panel/tidligere-vedtak';
import { Utkast } from '../components/panel/utkast';
import { VedtakData } from '../utils/types/vedtak';
import Grid from '../components/grid/grid';
import { GjeldendeVedtak } from '../components/panel/gjeldende-vedtak';

export function Hovedside () {
    const {vedtakUtkast, vedtak} = useContext(AppContext);

    const gjeldendeVedtak = vedtak.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.filter((v: VedtakData) => !v.gjeldende);

    return (
        <Grid columns={2}>
            <Utkast utkast={vedtakUtkast}/>
            <TidligereVedtak vedtakHistorikk={tidligereVedtak}/>
            <GjeldendeVedtak gjeldendeVedtak={gjeldendeVedtak} utkast={vedtakUtkast}/>
        </Grid>
    );

}
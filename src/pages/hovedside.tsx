import React, { useContext } from 'react';
import { AppContext } from '../components/app-provider/app-provider';
import { Historikk } from '../components/panel/historikk';
import { Utkast } from '../components/panel/utkast';
import { VedtakData } from '../utils/types/vedtak';
import Grid from '../components/grid/grid';
import { GjeldendeVedtakk } from '../components/panel/gjeldende-vedtakk';

export function Hovedside () {
    const {vedtakUtkast, vedtak} = useContext(AppContext);

    const gjeldendeVedtak = vedtak.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.filter((v: VedtakData) => !v.gjeldende);

    return (
        <Grid columns={2}>
            <Utkast utkast={vedtakUtkast}/>
            <Historikk vedtakHistorikk={tidligereVedtak}/>
            <GjeldendeVedtakk gjeldendeVedtak={gjeldendeVedtak}/>
        </Grid>
    );

}
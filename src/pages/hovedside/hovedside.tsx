import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../components/app-provider/app-provider';
import { TidligereVedtakListe } from '../../components/panel/tidligere-vedtak-liste';
import { Utkast } from '../../components/panel/utkast';
import { VedtakData } from '../../utils/types/vedtak';
import Grid from '../../components/grid/grid';
import { GjeldendeVedtak } from '../../components/panel/gjeldende-vedtak';
import './hovedside.less';

export function Hovedside () {
    const {utkast, vedtak} = useContext(AppContext);

    const gjeldendeVedtak = useMemo(() => vedtak.data.find((v: VedtakData) => v.gjeldende), [vedtak.data]);
    const tidligereVedtak = useMemo(() => vedtak.data.filter((v: VedtakData) => !v.gjeldende), [vedtak.data]);

    return (
        <Grid columns={2}>
            <Utkast utkast={utkast.data}/>
            <GjeldendeVedtak gjeldendeVedtak={gjeldendeVedtak} utkast={utkast.data}/>
            <TidligereVedtakListe vedtakHistorikk={tidligereVedtak}/>
        </Grid>
    );

}

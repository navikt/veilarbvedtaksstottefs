import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../components/app-provider/app-provider';
import { TidligereVedtakListe } from '../../components/panel/tidligere-vedtak-liste';
import { Utkast } from '../../components/panel/utkast';
import { VedtakData } from '../../utils/types/vedtak';
import Grid from '../../components/grid/grid';
import { GjeldendeVedtak } from '../../components/panel/gjeldende-vedtak';
import './hovedside.less';

export function Hovedside (props: {fnr: string}) {
    const {vedtak} = useContext(AppContext);

    const gjeldendeVedtak = useMemo(() => vedtak.data.find((v: VedtakData) => v.gjeldende), [vedtak.data]);
    const tidligereVedtak = useMemo(() => vedtak.data.filter((v: VedtakData) => !v.gjeldende), [vedtak.data]);
    const utkast = useMemo(() => vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST'), [vedtak.data]);

    return (
        <Grid columns={2}>
            <Utkast utkast={utkast}/>
            <GjeldendeVedtak gjeldendeVedtak={gjeldendeVedtak} utkast={utkast} fnr={props.fnr}/>
            <TidligereVedtakListe vedtakHistorikk={tidligereVedtak}/>
        </Grid>
    );

}

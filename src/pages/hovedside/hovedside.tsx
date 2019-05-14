import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../components/app-provider/app-provider';
import { TidligereVedtakListe } from '../../components/panel/tidligere-vedtak-liste';
import { Utkast } from '../../components/panel/utkast';
import { VedtakData } from '../../utils/types/vedtak';
import Grid from '../../components/grid/grid';
import { GjeldendeVedtak } from '../../components/panel/gjeldende-vedtak';
import './hovedside.less';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeilSolid } from 'nav-frontend-alertstriper';

export function Hovedside (props: {fnr: string}) {
    const {vedtak} = useContext(AppContext);

    const gjeldendeVedtak = vedtak.data.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.data.filter((v: VedtakData) => !v.gjeldende && v.vedtakStatus === 'SENDT');
    const utkast =  vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');
    const status = vedtak.status;

    if (status === 'NOT_STARTED' || status === 'LOADING') {
        return <NavFrontendSpinner type="XL"/>;
    }

    if (status === 'ERROR') {
        return <AlertStripeFeilSolid>Noe gikk galt, prøv igjen</AlertStripeFeilSolid>;
    }

    return (
        <Grid columns={2}>
            <Utkast utkast={utkast}/>
            <GjeldendeVedtak gjeldendeVedtak={gjeldendeVedtak} utkast={utkast} fnr={props.fnr}/>
            <TidligereVedtakListe vedtakHistorikk={tidligereVedtak}/>
        </Grid>
    );

}

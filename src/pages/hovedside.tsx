import React, { useContext } from 'react';
import { AppContext } from '../components/app-provider/app-provider';
import Card from '../components/card/card';
import { Historikk } from '../components/panel/historikk';
import { Utkast } from '../components/panel/utkast';
import { VedtakData } from '../utils/types/vedtak';

export function Hovedside () {
    const {vedtakUtkast, vedtak} = useContext(AppContext);

    const gjeldendeVedtak = vedtak.find((v: VedtakData) => v.gjeldende);
    const tidligereVedtak = vedtak.filter((v: VedtakData) => !v.gjeldende);

    return (
        <Card className="skjema">
            <Utkast utkast={vedtakUtkast}/>
            <Historikk vedtakHistorikk={tidligereVedtak}/>
        </Card>
    );

}
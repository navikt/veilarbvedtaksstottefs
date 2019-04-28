import React, { useContext } from 'react';
import { AppContext } from '../components/app-provider/app-provider';
import Card from '../components/card/card';
import { Historikk } from '../components/panel/historikk';
import { Utkast } from '../components/panel/utkast';

export function Hovedside () {
    const {vedtakUtkast, gjeldeneVedtak, vedtakHistorikk} = useContext(AppContext);

    return (
        <Card className="skjema">
            <Utkast utkast={vedtakUtkast}/>
            <Historikk vedtakHistorikk={vedtakHistorikk}/>
        </Card>
    );

}
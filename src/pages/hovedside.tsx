import React, { useContext } from 'react';
import { AppContext } from '../components/app-provider/app-provider';
import Card from '../components/card/card';
import { HistorikkPanel } from '../components/panel/historikk-panel';

export function Hovedside () {
    const {vedtakUtkast, gjeldeneVedtak, vedtakHistorikk} = useContext(AppContext);

    return (
        <Card className="skjema">
            <HistorikkPanel vedtakHistorikk={vedtakHistorikk}/>
        </Card>
    );

}